import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/datasets.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import {
  Upload,
  Search,
  FileSpreadsheet,
  Eye,
  Trash2,
} from "lucide-react";

function getColumnCount(columns) {
  if (Array.isArray(columns)) return columns.length;
  if (!columns) return 0;

  try {
    const parsed = JSON.parse(columns);
    if (Array.isArray(parsed)) return parsed.length;
  } catch {}

  return String(columns)
    .replace(/[\[\]']/g, "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean).length;
}

function Datasets() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [datasets, setDatasets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const fetchDatasets = async () => {
    try {
      setError("");
      const response = await API.get("/datasets");
      setDatasets(response.data);
    } catch (err) {
      console.error(err);
      setError("Could not load datasets. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a CSV file.");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setError("");
      setUploading(true);

      const response = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchDatasets();
      setToast(response.data?.message || "Dataset uploaded successfully!");
      window.setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (datasetId) => {
    const confirmed = window.confirm(
      "Delete this dataset and its stored table?"
    );
    if (!confirmed) return;

    try {
      const response = await API.delete(`/datasets/${datasetId}`);
      await fetchDatasets();
      setToast(response.data?.message || "Dataset deleted successfully!");
      window.setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Delete failed.");
    }
  };

  const filteredDatasets = datasets.filter((dataset) =>
    dataset.filename?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="datasets">
      <Sidebar />
      <Navbar />

      <div className="datasets-content">
        {toast && <div className="success-toast">✓ {toast}</div>}

        <div className="datasets-header">
          <div>
            <h1>Datasets</h1>
            <p>Manage all your uploaded datasets.</p>
          </div>

          <button
            className="upload-btn"
            onClick={handleUploadClick}
            disabled={uploading}
          >
            <Upload size={18} />
            {uploading ? "Uploading..." : "Upload Dataset"}
          </button>

          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {error && <div className="query-error">{error}</div>}

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search datasets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="dataset-list">
          {loading ? (
            <p>Loading datasets...</p>
          ) : filteredDatasets.length === 0 ? (
            <div className="empty-datasets">
              <FileSpreadsheet size={40} />
              <h3>No datasets found</h3>
              <p>Upload a CSV file to get started.</p>
            </div>
          ) : (
            filteredDatasets.map((dataset) => (
              <div className="dataset-card" key={dataset.id}>
                <div className="dataset-info">
                  <FileSpreadsheet className="file-icon" />

                  <div>
                    <h3>{dataset.filename}</h3>
                    <p>
                      {Number(dataset.rows || 0).toLocaleString()} Rows
                      {" • "}
                      {getColumnCount(dataset.columns)} Columns
                      {" • "}
                      {dataset.questions_asked || 0} Questions
                    </p>
                  </div>
                </div>

                <div className="dataset-actions">
                  <button
                    onClick={() =>
                      navigate(`/data/${dataset.table_name}`)
                    }
                  >
                    <Eye size={18} />
                    Preview
                  </button>

                  <button
                    className="delete"
                    onClick={() => handleDelete(dataset.id)}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Datasets;
