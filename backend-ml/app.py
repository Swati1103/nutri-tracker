from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import json
import os
import time

app = Flask(__name__)
CORS(app)

print("📚 Loading YOLO model...")
try:
    from ultralytics import YOLO
    model = YOLO("model/best_food_model2.pt")
    print("✅ YOLO model loaded successfully")
except Exception as e:
    print(f"⚠️  YOLO model load failed: {e}")
    model = None

print("📚 Loading nutrition data...")
try:
    with open("macronutrients.json") as f:
        macro_data = json.load(f)
    print(f"✅ Nutrition database loaded: {len(macro_data)} foods")
except Exception as e:
    print(f"⚠️  Nutrition data load failed: {e}")
    macro_data = {}

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "Flask ML service running"})

@app.route("/api/predict", methods=["POST"])
def predict():
    """
    Receive image and predict food with nutrition info
    """
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        file = request.files["image"]
        os.makedirs("uploads", exist_ok=True)
        
        # Save image
        filename = f"temp_{int(time.time())}.jpg"
        path = os.path.join("uploads", filename)
        file.save(path)
        print(f"✅ Image saved: {path}")

        # Convert image with PIL
        try:
            img = Image.open(path)
            if img.mode != 'RGB':
                if img.mode == 'RGBA':
                    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                    rgb_img.paste(img, mask=img.split()[3])
                    img = rgb_img
                else:
                    img = img.convert('RGB')
            img.save(path, 'JPEG', quality=95)
            print(f"✅ Image converted to RGB JPEG")
        except Exception as e:
            print(f"⚠️  Image conversion: {e}")

        # Predict with YOLO if available
        detected_foods = []
        if model:
            try:
                abs_path = os.path.abspath(path)
                results = model(abs_path, conf=0.3, verbose=False)
                if results and len(results) > 0:
                    result = results[0]
                    if len(result.boxes) > 0:
                        detected_foods = list({result.names[int(box.cls)] for box in result.boxes})
                        print(f"✅ Detected: {detected_foods}")
            except Exception as e:
                print(f"⚠️  YOLO error: {e}")

        # Get nutrition only for detected foods
        nutrition_list = []
        if detected_foods:
            for food in detected_foods:
                if food in macro_data:
                    nutrition_list.append({
                        "food": food,
                        "calories": macro_data[food].get("calories", 100),
                        "protein": macro_data[food].get("protein", 5),
                        "carbohydrates": macro_data[food].get("carbohydrates", 15),
                        "fat": macro_data[food].get("fat", 2)
                    })
                else:
                    nutrition_list.append({
                        "food": food,
                        "calories": 100,
                        "protein": 5,
                        "carbohydrates": 15,
                        "fat": 2
                    })

        print(f"✅ Prediction complete: {detected_foods}")
        return jsonify({
            "success": True,
            "detected": detected_foods,
            "nutrition": nutrition_list,
            "foodDetected": len(detected_foods) > 0
        })

    except Exception as e:
        print(f"❌ Prediction error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
