import React, { useEffect, useState } from "react";
import { checkUser, createUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  // flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  // redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    // checkUser() ? history.push("/home"): null;
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("firstName")}, you successfully registered!`
          );
          navigate("/");
        }
        // TODO: redirect user to main app
        setAdd(false);
      });
    }
  }, [navigate, newUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setNewUser({
      ...newUser,
      [name]: newValue
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
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
                Register
              </h1>
              <p className="lead text-white">
                Join the Notre Dame community
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
              user={newUser}
              onChange={onChangeHandler}
              onSubmit={onSubmitHandler}
              isLogin={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRegister;
