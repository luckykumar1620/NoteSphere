import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/"); 
  };

  return (
    <div className="container mt-5 page-background">
      <div className="card shadow-lg border-0 rounded-3 card-container">
        <div className="card-body p-5 text-center">
          <img 
            src="/favicon.ico" 
            alt="NoteSphere Logo" 
            className="mb-4" 
            width="80" 
            height="80"
          />
          
          <h1 className="card-title text-primary mb-3">About NoteSphere</h1>

          <p className="card-text fs-5 text-muted">
            <strong>NoteSphere</strong> is your personal digital notebook 📝.  
            It helps you <span className="text-primary">organize, manage, and track</span> 
            your important notes securely and efficiently.
          </p>

          <ul className="list-group list-group-flush my-4 text-start">
            <li className="list-group-item">✏️ Create, edit, and delete notes anytime</li>
            <li className="list-group-item">🔒 Secure login & JWT Authentication</li>
            <li className="list-group-item">⚡ Built with React, Node.js, Express, MongoDB</li>
            <li className="list-group-item">📱 Fully responsive design with Bootstrap</li>
            <li className="list-group-item">🎨 Add colors to notes and pin important ones</li>
          </ul>

          <div className="alert alert-info mt-4" role="alert">
            Stay productive and never lose your ideas with <strong>NoteSphere</strong> 🚀
          </div>

          <button 
            className="btn btn-primary btn-lg mt-3 px-4" 
            onClick={handleGetStarted}
          >
            Get Started →
          </button>

          <p className="text-secondary mt-4">
            Developed by <strong>Lucky Kumar</strong> 💻
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
