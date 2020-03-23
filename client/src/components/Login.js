import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  const history = useHistory();

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/login", user)
      .then(res => {
        console.log(res.data.payload);
        localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form className="ui form" onSubmit={login}>
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
