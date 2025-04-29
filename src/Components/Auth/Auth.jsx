import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { checkUser } from "./AuthService";

const AuthModule = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = checkUser();
    setIsAuthenticated(user);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Hero Section */}
      <div className="position-relative" style={{ height: '400px' }}>
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ 
            background: 'linear-gradient(90deg, rgba(12,35,64,0.9) 0%, rgba(0,132,61,0.9) 100%)',
            zIndex: 1
          }}
        ></div>
        <div className="container position-relative h-100" style={{ zIndex: 2 }}>
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold text-white mb-4">
                ND Link
              </h1>
              <p className="lead text-white">
                Connect with your fellow Notre Dame students.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <div className="card-body text-center">
                <div className="display-4 mb-3" style={{ color: '#0C2340' }}>📱</div>
                <h3 className="card-title h5">Stay Connected</h3>
                <p className="card-text text-muted">Keep in touch with friends across campus.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <div className="card-body text-center">
                <div className="display-4 mb-3" style={{ color: '#0C2340' }}>🏈</div>
                <h3 className="card-title h5">Discover Events</h3>
                <p className="card-text text-muted">Learn about events and activities on campus.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <div className="card-body text-center">
                <div className="display-4 mb-3" style={{ color: '#0C2340' }}>💬</div>
                <h3 className="card-title h5">Join Conversations</h3>
                <p className="card-text text-muted">Engage with posts from your peers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h2 className="display-5 fw-bold mb-4">
                Ready to get started?
              </h2>
              <div className="d-flex justify-content-center gap-3">
                <Link
                  to="/auth/register"
                  className="btn btn-lg text-white"
                  style={{ backgroundColor: '#0C2340' }}
                >
                  Register
                </Link>
                <Link
                  to="/auth/login"
                  className="btn btn-lg text-white"
                  style={{ backgroundColor: '#00843D' }}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4" style={{ backgroundColor: '#0C2340' }}>
      </footer>
    </div>
  );
};

export default AuthModule;
