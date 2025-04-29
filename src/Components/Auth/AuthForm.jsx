import React from "react";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <div className="card shadow">
      <div className="card-body">
        <form onSubmit={onSubmit} autoComplete="off">
          {!isLogin ? (
            <div className="mb-4">
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="first-name-input"
                  value={user.firstName}
                  onChange={onChange}
                  name="firstName"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="last-name-input"
                  value={user.lastName}
                  onChange={onChange}
                  name="lastName"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
          ) : null}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email-input"
              value={user.email}
              onChange={onChange}
              name="email"
              placeholder="email@nd.edu"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password-input"
              value={user.password}
              onChange={onChange}
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-grid">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              style={{ backgroundColor: '#0C2340', borderColor: '#0C2340' }}
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;