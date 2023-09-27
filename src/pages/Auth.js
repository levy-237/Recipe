import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
export default function Auth() {
  const [registered, setRegistered] = useState(true);
  return (
    <div className="auth">
      {registered ? (
        <div>
          <Login registered={registered} setRegistered={setRegistered} />
        </div>
      ) : (
        <div>
          <Register registered={registered} setRegistered={setRegistered} />
        </div>
      )}
    </div>
  );
}
