import { Link } from "react-router-dom";
import "../styles/signup.css";
import { Brain } from "lucide-react";

function Signup() {
  return (
    <div className="signup-page">

      {/* =========================
          BRAND SIDE
      ========================= */}

      <section className="signup-brand">

        <div className="signup-brand-inner">

          <div className="signup-logo">
  <Brain />
</div>

          <div className="signup-brand-name">
            QUERYMIND <span>AI</span>
          </div>

          <div className="signup-brand-line"></div>

          <div className="signup-brand-content">

            <p className="signup-eyebrow">
              DATA, WITHOUT THE COMPLEXITY.
            </p>

            <h1>
              Your data has
              <br />
              <i>more to say.</i>
            </h1>

            <p className="signup-description">
              Ask questions naturally, discover patterns,
              and turn your data into meaningful insights.
            </p>

          </div>

          <p className="signup-tagline">
            Grace in Every Insight.
          </p>

        </div>

      </section>


      {/* =========================
          SIGNUP SIDE
      ========================= */}

      <section className="signup-form-section">

        <div className="signup-form-container">

          <div className="signup-form-header">

            <p className="signup-form-eyebrow">
              GET STARTED
            </p>

            <h2>
              Create your
              <br />
              <i>workspace.</i>
            </h2>

            <p>
              Start exploring your data with QueryMind AI.
            </p>

          </div>


          <form className="signup-form">

            <div className="signup-field">

              <label htmlFor="name">
                Full name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
              />

            </div>


            <div className="signup-field">

              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
              />

            </div>


            <div className="signup-field">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
              />

            </div>


            <button
              type="submit"
              className="signup-button"
            >
              Create account
              <span>→</span>
            </button>

          </form>


          <div className="signup-login">

            <span>
              Already have an account?
            </span>

            <Link to="/">
              Log in
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Signup;