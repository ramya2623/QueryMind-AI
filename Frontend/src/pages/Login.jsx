import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Brain } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Existing authentication logic can stay here
    navigate("/dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* LOGO */}
        <div className="login-logo">
          <div className="login-logo-mark">
             <Brain />
          </div>

          <div className="login-logo-name">
            QueryMind<span>AI</span>
          </div>
        </div>


        {/* HEADING */}
        <div className="login-heading">
          <h1>Welcome back</h1>

          <p>
            Sign in to continue to your workspace.
          </p>
        </div>


        {/* FORM */}
        <form onSubmit={handleLogin}>

          <div className="login-field">
            <label>Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


          <div className="login-field">

            <div className="login-label-row">
              <label>Password</label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          <button
            type="submit"
            className="login-submit"
          >
            Sign in
            <span>→</span>
          </button>

        </form>


        {/* SIGN UP */}
        <p className="signup-prompt">
          Don't have a QueryMind account?

          <button onClick={() => navigate("/signup")}>
            Create one
          </button>
        </p>


        {/* BACK */}
        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          ← Back to home
        </button>

      </div>

    </div>
  );
}

export default Login;