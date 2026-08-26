import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { Brain } from "lucide-react";

function BrandLogo() {
  return (
    <div className="qm-logo">
      <div className="qm-logo-mark"><Brain /></div>

      <div className="qm-logo-text">
        QueryMind <span>AI</span>
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="qm-home">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="qm-navbar">

        <BrandLogo />

        <nav className="qm-nav-links">
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => navigate("/query")}>
            Query AI
          </button>

          <button onClick={() => navigate("/analytics")}>
            Analytics
          </button>

          <button onClick={() => navigate("/datasets")}>
            Datasets
          </button>
        </nav>

        <button
          className="qm-nav-button"
          onClick={() => navigate("/login")}
        >
          Start exploring
          <span>→</span>
        </button>

      </header>


      {/* =========================
          HERO
      ========================= */}

      <section className="qm-hero">

        <div className="qm-hero-content">

          <div className="qm-eyebrow">
            <span></span>
            AI-POWERED BUSINESS INTELLIGENCE
          </div>

          <h1>
            Turn your data
            <br />
            into <i>clarity.</i>
          </h1>

          <p>
            QueryMind AI transforms your datasets into
            meaningful insights through natural language,
            intelligent analytics and powerful visualizations.
          </p>

          <div className="qm-actions">

            <button
              className="qm-primary"
              onClick={() => navigate("/login")}
            >
              Ask your data
              <span>↗</span>
            </button>

            <button
              className="qm-secondary"
              onClick={() => navigate("/login")}
            >
              Explore datasets
            </button>

          </div>


          {/* PROCESS */}

          <div className="qm-process">

            <div className="qm-process-item">
              <strong>01</strong>
              <span>Upload</span>
            </div>

            <div className="qm-process-line"></div>

            <div className="qm-process-item">
              <strong>02</strong>
              <span>Ask</span>
            </div>

            <div className="qm-process-line"></div>

            <div className="qm-process-item">
              <strong>03</strong>
              <span>Understand</span>
            </div>

          </div>

        </div>


        {/* =========================
            PRODUCT PREVIEW
        ========================= */}

        <div className="qm-preview-wrapper">

          <div className="qm-preview-label">
            <span></span>
            LIVE ANALYTICS
          </div>

          <div className="qm-preview">

            <div className="qm-preview-header">

              <div>
                <small>QUERYMIND / OVERVIEW</small>

                <h3>
                  Revenue performance
                </h3>
              </div>

              <span className="qm-dots">•••</span>

            </div>


            {/* CHART */}

            <div className="qm-chart">

              <div className="qm-chart-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <svg
                viewBox="0 0 500 180"
                preserveAspectRatio="none"
              >

                <path
                  className="qm-chart-area"
                  d="
                    M0 150
                    C45 142 55 120 90 126
                    C125 132 145 95 180 105
                    C215 115 235 76 270 88
                    C305 100 325 52 355 65
                    C385 78 410 38 435 50
                    C460 62 480 25 500 32
                    L500 180
                    L0 180
                    Z
                  "
                />

                <path
                  className="qm-chart-line"
                  d="
                    M0 150
                    C45 142 55 120 90 126
                    C125 132 145 95 180 105
                    C215 115 235 76 270 88
                    C305 100 325 52 355 65
                    C385 78 410 38 435 50
                    C460 62 480 25 500 32
                  "
                />

              </svg>


              <div className="qm-chart-tooltip">

                <small>REVENUE</small>

                <strong>₹84.2L</strong>

                <span>+18.6%</span>

              </div>

            </div>


            {/* STATS */}

            <div className="qm-stats">

              <div>
                <small>Revenue</small>
                <strong>₹84.2L</strong>
              </div>

              <div>
                <small>Growth</small>
                <strong>18.6%</strong>
              </div>

              <div>
                <small>Queries</small>
                <strong>1,284</strong>
              </div>

            </div>

          </div>


          {/* AI INSIGHT */}

          <div className="qm-insight">

            <div className="qm-insight-icon">
              ✦
            </div>

            <div>
              <small>AI INSIGHT</small>

              <p>
                Revenue increased by
                <b> 18.6%</b> this quarter.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          METRICS
      ========================= */}

      <section className="qm-metrics">

        <div className="qm-metric-intro">

          <small>WHY QUERYMIND</small>

          <p>
            From raw information
            <br />
            to better decisions.
          </p>

        </div>

        <div>
          <strong>10×</strong>
          <span>Faster analysis</span>
        </div>

        <div>
          <strong>AI</strong>
          <span>Natural language queries</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Intelligent insights</span>
        </div>

      </section>


      {/* =========================
          FEATURES
      ========================= */}

      <section className="qm-features">

        <div className="qm-section-title">

          <div className="qm-eyebrow">
            <span></span>
            EVERYTHING IN ONE PLACE
          </div>

          <h2>
            Data shouldn't feel
            <br />
            <i>complicated.</i>
          </h2>

        </div>


        <div className="qm-feature-grid">


          {/* FEATURE 1 */}

          <div className="qm-feature">

            <small>01</small>

            <h3>Ask naturally</h3>

            <p>
              Ask questions about your data in plain
              language and let QueryMind handle the
              complexity behind the scenes.
            </p>

            <div className="qm-query-demo">

              <span>
                What were our top products?
              </span>

              <strong>↗</strong>

            </div>

          </div>


          {/* FEATURE 2 */}

          <div className="qm-feature">

            <small>02</small>

            <h3>See the story</h3>

            <p>
              Turn query results into clean,
              meaningful visualizations.
            </p>

            <div className="qm-bars">

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>


          {/* FEATURE 3 */}

          <div className="qm-feature">

            <small>03</small>

            <h3>Discover insights</h3>

            <p>
              Find patterns and trends hidden inside
              your datasets with AI-powered analysis.
            </p>

            <div className="qm-insight-lines">

              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}

      <section className="qm-cta">

        <div className="qm-cta-mark">
          <Brain />
        </div>

        <div>

          <small>READY WHEN YOU ARE</small>

          <h2>
            Your data already
            <br />
            has the <i>answers.</i>
          </h2>

        </div>

        <button
          className="qm-primary"
          onClick={() => navigate("/login")}
        >
          Start exploring
          <span>→</span>
        </button>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="qm-footer">

        <BrandLogo />

        <p>
          Grace in Every Insight.
        </p>

        <span>
          © 2026 QueryMind AI
        </span>

      </footer>

    </div>
  );
}

export default Home;