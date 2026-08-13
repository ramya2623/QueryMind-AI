import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Database } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

import "../styles/datasetpreview.css";

function DatasetPreview() {
  const { tableName } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          `/data/${encodeURIComponent(tableName)}`
        );

        setData(response.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.detail || "Failed to load dataset."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="dataset-preview-page">
      <Sidebar />
      <Navbar />

      <div className="dataset-preview-content">
        <button className="back-btn" onClick={() => navigate("/datasets")}>
          <ArrowLeft size={18} />
          Back to Datasets
        </button>

        <div className="preview-header">
          <div>
            <div className="preview-title">
              <Database size={24} />
              <h1>Dataset Preview</h1>
            </div>
            <p>Showing the first 10 rows of your dataset.</p>
          </div>
        </div>

        {loading && <p className="loading">Loading dataset...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && data.length === 0 && (
          <div className="empty-preview">
            <Database size={40} />
            <h3>No data available</h3>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="table-container">
            <table className="preview-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td key={column}>
                        {String(row[column] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DatasetPreview;
