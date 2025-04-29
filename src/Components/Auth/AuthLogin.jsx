import React, { useEffect, useState } from "react";
import { checkUser, loginUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      navigate("/");
    }
  }, [navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const user = await loginUser(currentUser);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Hero Section */}
      <div className="position-relative vh-25 bg-primary">
        <div className="position-absolute top-0 start-0 w-100 h-100" 
             style={{ 
               background: 'linear-gradient(90deg, rgba(12,35,64,0.9) 0%, rgba(0,132,61,0.9) 100%)'
             }}>
        </div>
        <div className="container position-relative h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold text-white mb-4">
                Welcome Back
              </h1>
              <p className="lead text-white">
                Login to your account
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <AuthForm
              user={currentUser}
              isLogin={true}
              onChange={onChangeHandler}
              onSubmit={onSubmitHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
