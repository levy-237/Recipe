import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register({ registered, setRegistered }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/auth/register", {
        username,
        password,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={submit} className="signingForm">
      <h2>Create an account</h2>
      <div>
        <label htmlFor="username">username:</label>
        <br></br>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <br />
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
      <h5>
        Already have an account?{" "}
        <span onClick={() => setRegistered(true)}>Log in</span>
      </h5>
    </form>
  );
}
