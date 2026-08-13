import "./../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    // Temporary login
    navigate("/home");
  };

  return (
    <div className="login-page">
      {/* Left Side */}
      <div className="login-left">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>

        <div className="brand">
          <h1>QueryMind AI</h1>

          <p className="tagline">
            GRACE IN EVERY INSIGHT
          </p>

          <p className="description">
            AI-powered business intelligence that transforms
            your data into meaningful insights through natural
            language, smart visualizations, and intelligent
            analytics.
          </p>

          <div className="hero-card">
            <div className="hero-icon">◎</div>

            <h3>AI-Powered Analytics</h3>

            <p>
              Transform CSV files into SQL, charts and
              meaningful business insights in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>

          <p className="subtitle">
            Sign in to continue your AI analytics journey.
          </p>

          <form onSubmit={login}>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
            />

            <div className="password-header">
              <label>Password</label>

              <a href="#">Forgot Password?</a>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
            />

            <button
              type="submit"
              className="login-btn"
            >
              Sign In
            </button>
          </form>

          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;