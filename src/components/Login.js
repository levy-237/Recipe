import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login({ registered, setRegistered }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://recipe-server-apguzhdor-levy-237.vercel.app/auth/login",
        {
          username,
          password,
        }
      );
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={submit} className="signingForm">
      <h2>Sign in or create an account</h2>
      <div>
        <label htmlFor="username">username:</label>
        <br />
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
      <button type="submit">Log in</button>
      <h5>
        Don't have an account?{" "}
        <span onClick={() => setRegistered(false)}>Register here</span>
      </h5>
    </form>
  );
}
