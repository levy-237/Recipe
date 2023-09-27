import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const Navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    Navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/" className="home">
        Home
      </Link>
      <Link to="/createRec">Create Recipe</Link>
      <Link to="/savedRec">Saved Recipes</Link>
      {!cookies.access_token ? (
        <Link to="/Auth">Login</Link>
      ) : (
        <a onClick={logout}>Log out</a>
      )}
    </div>
  );
}
