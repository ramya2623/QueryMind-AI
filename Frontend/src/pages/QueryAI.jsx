import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/queryai.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import {
  Sparkles,
  Database,
  Table,
  Brain,
} from "lucide-react";

function QueryAI() {
  const navigate = useNavigate();

  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [question, setQuestion] = useState("");

  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]);
  const [insight, setInsight] = useState("");

  const [error, setError] = useState("");
  const [loadingDatasets, setLoadingDatasets] = useState(true);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await API.get("/datasets");
        setDatasets(response.data);

        if (response.data.length === 1) {
          setSelectedDataset(String(response.data[0].id));
        }
      } catch (err) {
        console.error(err);
        setError("Could not load datasets.");
      } finally {
        setLoadingDatasets(false);
      }
    };

    fetchDatasets();
  }, []);

  const handleAsk = async () => {
    if (!selectedDataset) {
      setError("Please select a dataset.");
      return;
    }

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setError("");
    setSql("");
setResults([]);
setInsight("");
setAsking(true);

    try {
      const response = await API.post("/ask", {
        dataset_id: Number(selectedDataset),
        question: question.trim(),
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      setSql(response.data.generated_sql || "");
      setResults(response.data.results || []);
      setInsight(response.data.insight || "");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Something went wrong while processing your question."
      );
    } finally {
      setAsking(false);
    }
  };

  const resultColumns =
    results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <div className="query-page">
      <Sidebar />
      <Navbar />

      <div className="query-content">
        <div className="query-header">
          <h1>Query</h1>
          <p>
            Ask questions about your datasets using natural language.
          </p>
        </div>

        <div className="dataset-selector">
          <div className="card-title">
            <Database size={20} />
            <h3>Select Dataset</h3>
          </div>

          <select
            value={selectedDataset}
            onChange={(e) => {
              setSelectedDataset(e.target.value);
              setSql("");
              setResults([]);
              setError("");
            }}
            disabled={loadingDatasets}
          >
            <option value="">
              {loadingDatasets
                ? "Loading datasets..."
                : "Choose a dataset"}
            </option>

            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.filename}
              </option>
            ))}
          </select>

          {selectedDataset && (
            <button
              className="query-preview-link"
              onClick={() => {
                const dataset = datasets.find(
                  (item) => String(item.id) === selectedDataset
                );
                if (dataset) {
                  navigate(`/data/${dataset.table_name}`);
                }
              }}
            >
              Preview selected dataset
            </button>
          )}
        </div>

        <div className="query-box">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                handleAsk();
              }
            }}
            placeholder="Example: Show me the top 10 products by revenue..."
          />

          <button onClick={handleAsk} disabled={asking}>
            <Sparkles size={18} />
            {asking ? "Thinking..." : "Ask AI"}
          </button>
        </div>

        {error && <div className="query-error">{error}</div>}

        {sql && (
          <div className="result-card">
            <div className="card-title">
              <Database size={20} />
              <h3>Generated SQL</h3>
            </div>

            <pre className="sql-result">{sql}</pre>
          </div>
        )}

        {results.length > 0 && (
          <div className="result-card">
            <div className="card-title">
              <Table size={20} />
              <h3>Results</h3>
            </div>

            <div className="results-table-wrapper">
              <table>
                <thead>
                  <tr>
                    {resultColumns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {results.map((row, index) => (
                    <tr key={index}>
                      {resultColumns.map((column) => (
                        <td key={column}>
                          {String(row[column] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {insight && (
  <div className="insight-card">

    <div className="card-title">
      <Brain size={20} />
      <h3>AI Insight</h3>
    </div>

    <p>
      {insight}
    </p>

  </div>
)}

        {!sql && !asking && !error && (
          <div className="query-empty">
            <h3>Ask your data anything</h3>
            <p>
              Select a dataset and ask a question in natural language.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QueryAI;
