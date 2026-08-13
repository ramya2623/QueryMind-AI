import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/historyquery.css";

import {
  ArrowLeft,
  Database,
  Table,
  Brain,
  MessageSquare,
} from "lucide-react";

import API from "../services/api";

function HistoryQuery() {
  const { queryId } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuery = async () => {
      try {
        const response = await API.get(`/history/query/${queryId}`);

        if (response.data.error) {
          setError(response.data.error);
          return;
        }

        setQuery(response.data);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.detail ||
            err.response?.data?.error ||
            "Could not load this query."
        );
      } finally {
        setLoading(false);
      }
    };

    loadQuery();
  }, [queryId]);

  if (loading) {
    return (
      <div className="history-query-page">
        <Sidebar />
        <Navbar />

        <div className="history-query-content">
          <p>Loading query...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-query-page">
        <Sidebar />
        <Navbar />

        <div className="history-query-content">
          <button
            className="back-button"
            onClick={() => navigate("/history")}
          >
            <ArrowLeft size={18} />
            Back to History
          </button>

          <div className="query-error">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const results = query?.results || [];

  const resultColumns =
    results.length > 0
      ? Object.keys(results[0])
      : [];

  return (
    <div className="history-query-page">

      <Sidebar />

      <Navbar />

      <div className="history-query-content">

        {/* BACK BUTTON */}

        <button
          className="back-button"
          onClick={() => navigate("/history")}
        >
          <ArrowLeft size={18} />
          Back to History
        </button>


        {/* HEADER */}

        <div className="history-query-header">

          <h1>Query Details</h1>

          <p>
            View the complete result of your previous AI query.
          </p>

        </div>


        {/* DATASET */}

        <div className="history-query-dataset">

          <Database size={20} />

          <div>

            <span>Dataset</span>

            <h3>
              {query?.filename || "Unknown Dataset"}
            </h3>

          </div>

        </div>


        {/* QUESTION */}

        <div className="history-query-card">

          <div className="card-title">

            <MessageSquare size={20} />

            <h3>Question</h3>

          </div>

          <p className="question-text">
            {query?.question}
          </p>

        </div>


        {/* GENERATED SQL */}

        <div className="history-query-card">

          <div className="card-title">

            <Database size={20} />

            <h3>Generated SQL</h3>

          </div>

          <pre className="sql-result">
            {query?.generated_sql || "No SQL available."}
          </pre>

        </div>


        {/* RESULTS */}

        <div className="history-query-card">

          <div className="card-title">

            <Table size={20} />

            <h3>Results</h3>

          </div>

          {results.length === 0 ? (

            <p className="no-results">
              No results were saved for this query.
            </p>

          ) : (

            <div className="results-table-wrapper">

              <table>

                <thead>

                  <tr>

                    {resultColumns.map((column) => (
                      <th key={column}>
                        {column}
                      </th>
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

          )}

        </div>


        {/* AI INSIGHT */}

        <div className="history-insight-card">

          <div className="card-title">

            <Brain size={20} />

            <h3>AI Insight</h3>

          </div>

          <p>

            {query?.insight ||
              "No AI insight was saved for this query."}

          </p>

        </div>

      </div>

    </div>
  );
}

export default HistoryQuery;