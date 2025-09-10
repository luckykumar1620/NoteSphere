import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/notes/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  let navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("user"))
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('login');
  }
  let location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NoteSphere</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">About</Link>
              </li >

              <li className="nav-item  d-flex align-items-center ms-3">
              <div className="form-check form-switch text-white">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="themeSwitch"
                  onChange={toggleTheme}
                  checked={theme === "dark"}  // agar dark mode on hai to switch checked rahe
                />
                <label className="form-check-label" htmlFor="themeSwitch">
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </label>
              </div>
             </li>

            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="submit">Login</Link>
              <Link className="btn btn-primary mx-1" to="signup" role="submit">SignUp</Link>
            </form> :
              <div className="d-flex align-items-center">
                <span className="text-white me-3">
                  👤 {username.name}
                </span>

                <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
