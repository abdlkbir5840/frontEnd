import React, { useState } from "react";
import "../auth.css";
import axios from "axios";
import Cookie from 'cookie-universal'
import { useNavigate } from "react-router-dom";


export default function Login() {
  const cookies = Cookie()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const user = { email, password };
    const response = await axios.post("http://localhost:8000/api/login", user);
    cookies.set('login_token', response.data.token)
    console.log(user)
    console.log(cookies.get('login_token'))
    // cookies.set("login_token", response.data.token, {
    //   path: "/",
    //   maxAge: 7 * 24 * 60 * 60,
    // });
    navigate("/dashboard/fournisseur");
  };
  return (
    <div className="l">
      <div className="a">
        <form>
          <div className="form-outline mb-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="form2Example1"
              className="form-control"
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="form2Example2"
              className="form-control"
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          <div className="row mb-4"></div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={login}
              className="btn btn-primary btn-block mb-4"
            >
              Sign in
            </button>
          </div>
          <div className="text-center">
            <p>
              Not a member? <a href="#!">Register</a>
            </p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
