import { useState } from "react";
import './index.css'

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <h1>Upload Image for Prediction</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Predict</button>

      {result && (
        <div>
          <p>Filename: {result.filename}</p>
          <p>Prediction: {result.prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;