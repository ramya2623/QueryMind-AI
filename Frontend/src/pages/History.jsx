import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/history.css";

import {
  Clock3,
  Search,
  ArrowRight,
  FileSpreadsheet,
} from "lucide-react";

import API from "../services/api";

function History() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadHistory = async () => {

      try {

        const response = await API.get("/history");

        if (response.data.error) {
          setError(response.data.error);
          return;
        }

        setHistory(response.data);

      } catch (err) {

        console.error(err);

        setError(
          err.response?.data?.detail ||
          "Could not load query history. Make sure the backend is running."
        );

      } finally {

        setLoading(false);

      }

    };

    loadHistory();

  }, []);


  const filtered = history.filter((item) =>
    item.question
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );


  const openQuery = (queryId) => {

    navigate(`/history/query/${queryId}`);

  };


  return (

    <div className="history-page">

      <Sidebar />

      <Navbar />


      <div className="history-content">

        <div className="history-header">

          <h1>History</h1>

          <p>
            View your previous AI queries.
          </p>

        </div>


        <div className="search-box">

          <Search size={18} />

          <input
            placeholder="Search history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {error && (

          <div className="query-error">

            {error}

          </div>

        )}


        {loading ? (

          <p>Loading history...</p>

        ) : filtered.length === 0 ? (

          <div className="history-card">

            <div className="left">

              <Clock3 size={18} />

              <div>

                <h3>No queries found</h3>

                <span>
                  Ask a question from Query AI to create history.
                </span>

              </div>

            </div>

          </div>

        ) : (

         filtered.map((item) => (
  <div
    className="history-card"
    key={item.id}
    onClick={() => navigate(`/history/query/${item.id}`)}
    style={{ cursor: "pointer" }}
  >

    <div className="left">

      <Clock3 size={18} />

      <div>

        <h3>{item.question}</h3>

        <span>
          {item.filename || "Dataset"} • Previous query
        </span>

      </div>

    </div>

    <ArrowRight size={18} />

  </div>
))

        )}

      </div>

    </div>

  );

}

export default History;