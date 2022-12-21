import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");

  const navigate = useNavigate();

  const { dispatch, currentUser } = useContext(AuthContext);

  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      dispatch({ type: "LOGIN", payload: res.user });

      await setDoc(doc(db, "users", res.user.uid), {
        email: email,
        password: password,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(currentUser.uid);
  useEffect(() => {
    const uploadFile = () => {
      const name = `userID/${currentUser.uid}/${img.name}`;
      console.log(name);

      const stogrageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(stogrageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
      );
    };

    img && uploadFile();
  }, [img]);

  return (
    <div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <img src={img} alt="" />
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
        <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        <button type="submit">submit plx</button>
      </form>
      <button>login plx</button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default Login;
