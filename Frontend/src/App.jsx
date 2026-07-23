import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [question, setQuestion] = useState("");
  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      alert("Upload successful!");
      setPreview(response.data.preview);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };
  const askQuestion = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/ask",
      {
        question: question,
      }
    );

    setSql(response.data.generated_sql);
    setResults(response.data.results);
  } catch (error) {
    console.error(error);
    alert("Failed to get results.");
  }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🚀 QueryMind AI</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

     <button onClick={uploadFile} style={{ marginLeft: "10px" }}>
  Upload
</button>

<h2>Preview</h2>

{preview.length > 0 && (
  <table border="1" cellPadding="8">
    <thead>
      <tr>
        <th>Product</th>
        <th>Region</th>
        <th>Sales</th>
      </tr>
    </thead>

    <tbody>
      {preview.map((row, index) => (
        <tr key={index}>
          <td>{row.product}</td>
          <td>{row.region}</td>
          <td>{row.sales}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
<h2>Ask a Question</h2>

<input
  type="text"
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  placeholder="e.g. Show all laptops"
  style={{
    width: "350px",
    padding: "10px",
    marginRight: "10px",
  }}
/>

<button onClick={askQuestion}>
  Ask
</button>

<h2>Generated SQL</h2>

<pre>{sql}</pre>

<h2>Results</h2>

{results.length > 0 && (
  <table border="1" cellPadding="8">
    <thead>
      <tr>
        {Object.keys(results[0]).map((key) => (
          <th key={key}>{key}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {results.map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((value, i) => (
            <td key={i}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)}
    </div>
  );
}

export default App;