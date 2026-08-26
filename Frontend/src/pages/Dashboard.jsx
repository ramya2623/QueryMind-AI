import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">

          {/* =========================
              WELCOME
          ========================= */}

          <section className="dashboard-welcome">

            <div className="dashboard-eyebrow">
              <span></span>
              QUERYMIND AI
            </div>

            <h1>
              Welcome to your
              <br />
              <i>data workspace.</i>
            </h1>

            <p>
              Explore your data, ask questions naturally,
              and turn information into meaningful answers.
            </p>

          </section>


          {/* =========================
              QUICK ACTIONS
          ========================= */}

          <section className="dashboard-actions">

            {/* Upload */}

            <div
              className="dashboard-action-card"
              onClick={() => navigate("/datasets")}
            >

              <div className="action-top">
                <div className="action-icon">
                  +
                </div>

                <span className="action-number">
                  01
                </span>
              </div>

              <div className="action-content">

                <h2>
                  Upload Dataset
                </h2>

                <p>
                  Bring your CSV data into QueryMind
                  and start exploring it.
                </p>

                <button>
                  Upload dataset
                  <span>↗</span>
                </button>

              </div>

            </div>


            {/* Query */}

            <div
              className="dashboard-action-card featured"
              onClick={() => navigate("/query")}
            >

              <div className="action-top">
                <div className="action-icon">
                  ✦
                </div>

                <span className="action-number">
                  02
                </span>
              </div>

              <div className="action-content">

                <h2>
                  Ask QueryMind
                </h2>

                <p>
                  Ask questions about your data in
                  natural language. No SQL required.
                </p>

                <button>
                  Ask a question
                  <span>↗</span>
                </button>

              </div>

            </div>

          </section>


          {/* =========================
              HOW IT WORKS
          ========================= */}

          <section className="workflow-section">

            <div className="workflow-heading">

              <div className="dashboard-eyebrow">
                <span></span>
                SIMPLE BY DESIGN
              </div>

              <h2>
                From data
                <br />
                to <i>clarity.</i>
              </h2>

            </div>


            <div className="workflow-steps">

              <div className="workflow-step">

                <div className="step-number">
                  01
                </div>

                <div className="step-line"></div>

                <h3>
                  Upload
                </h3>

                <p>
                  Add your dataset and let
                  QueryMind understand its structure.
                </p>

              </div>


              <div className="workflow-step">

                <div className="step-number">
                  02
                </div>

                <div className="step-line"></div>

                <h3>
                  Ask
                </h3>

                <p>
                  Ask questions about your data
                  using everyday language.
                </p>

              </div>


              <div className="workflow-step">

                <div className="step-number">
                  03
                </div>

                <div className="step-line"></div>

                <h3>
                  Understand
                </h3>

                <p>
                  Get clear answers and meaningful
                  insights from your data.
                </p>

              </div>

            </div>

          </section>


          {/* =========================
              BRAND MESSAGE
          ========================= */}

          <section className="dashboard-message">

            <div className="message-mark">
              Q
            </div>

            <div className="message-content">

              <small>
                QUERYMIND AI
              </small>

              <h2>
                Your data already
                <br />
                has the <i>answers.</i>
              </h2>

              <p>
                QueryMind turns the complexity of data
                into something you can simply ask,
                understand and act on.
              </p>

            </div>

            <button
              onClick={() => navigate("/query")}
            >
              Start exploring
              <span>→</span>
            </button>

          </section>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;