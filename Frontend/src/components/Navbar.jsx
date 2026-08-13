import "./../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">

     <div className="navbar-left"></div>

      <div className="navbar-right">

        <button className="notification-btn">
          🔔
        </button>

        <div className="profile">

          <div className="profile-image">
            R
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;