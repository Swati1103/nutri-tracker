function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="card mx-auto max-w-xl">
      <div className="card-body">
        <h2 className="card-title">Prediction Result</h2>

        {result.preview && (
          <div className="mb-4">
            <img src={result.preview} alt="uploaded" className="rounded-md w-full object-cover" />
          </div>
        )}

        {result.nutrition && result.nutrition.length > 0 ? (
          result.nutrition.map((item, index) => (
            <div key={index} className="border rounded p-3 mb-3">
              <p><strong>Food:</strong> {item.food}</p>
              <p><strong>Calories:</strong> {item.calories}</p>
              <p><strong>Protein:</strong> {item.protein}</p>
              <p><strong>Fat:</strong> {item.fat}</p>
              <p><strong>Carbs:</strong> {item.carbohydrates}</p>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No foods detected.</div>
        )}
      </div>
    </div>
  );
}

export default ResultCard;