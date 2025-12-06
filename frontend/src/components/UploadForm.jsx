import { useState } from "react";
import { getFullURL } from "../utils/config";

function UploadForm({ setResult }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file) => {
    setImage(file);
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image first");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Call Node.js backend on port 5000
      const res = await fetch(getFullURL("/api/meals/predict"), {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Prediction failed");
      const data = await res.json();
      setResult({ ...data, preview });
    } catch (err) {
      console.error(err);
      alert("Prediction error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mx-auto max-w-xl">
      <div className="card-body">
        <h2 className="card-title">Upload Food Image</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          {preview && (
            <div className="w-full">
              <img src={preview} alt="preview" className="rounded-md mt-2 w-full object-cover" />
            </div>
          )}

          <div className="card-actions">
            <button className={`btn btn-primary ${loading ? 'loading' : ''}`} type="submit">
              {loading ? 'Predicting...' : 'Predict Food'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadForm;