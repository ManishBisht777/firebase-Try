import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase";
const Home = () => {
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const res = await setDoc(doc(db, "cities", "LA"), {
      name: data,
      state: "CA",
      country: "USA",
    });
    console.log(res);
  };

  return (
    <div>
      <Link to="/login">Login plx</Link>

      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="enter a text"
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit">submit plx</button>
      </form>
    </div>
  );
};

export default Home;
