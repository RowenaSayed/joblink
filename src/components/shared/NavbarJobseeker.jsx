import "./../../assets/CSS/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavbarJobseeker() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white border-bottom">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <NavLink
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/jobseeker/dashboard"
        >
          <i
            className="fa-solid fa-link ms-md-5"
            style={{ color: "#284C99" }}
          ></i>
          <span>JobLink</span>
        </NavLink>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto gap-md-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobseeker/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobseeker/jobs">
                Jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobseeker/apps">
                Applications
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobseeker/saved-jobs">
                Saved-Jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobseeker/alerts">
                Job Alerts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobseeker/profile">
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
        {/* add notification icon and redirect to /notify when on click */}
        <div className="d-flex align-items-center gap-3 mx-auto me-md-3">
          <NavLink
            to="/jobseeker/notify"
            className="nav-link position-relative"
          >
            <i className="fa-solid fa-bell fs-5"></i>
          </NavLink>
        </div>
        <div className="dropdown d-flex align-items-center gap-3 mx-auto">
          <button
            className="btn btn-link dropdown-toggle d-flex align-items-center text-decoration-none"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
              className="rounded-circle"
              width="36"
              height="36"
              alt="avatar"
            />
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            style={{ maxWidth: "200px" }}
          >
            <li>
              <NavLink className="dropdown-item" to="/jobseeker/profile">
                <i className="fas fa-user me-2"></i>Profile
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
