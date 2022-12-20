import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        setError("");
        navigate("/");
        // ...
      })
      .catch((error) => {
        // ..
        setError(error.message);
      });
  };

  return (
    <div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="email plx"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password plx"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">submit plx</button>
      </form>
      <button>login plx</button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default Login;
