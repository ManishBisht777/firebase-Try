import { doc, setDoc } from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { db, storage } from "./firebase";
const Home = () => {
  const [data, setData] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [imgList, setImgList] = useState([]);
  const [load, setLoad] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      const stogrageRef = ref(storage, "userID");

      listAll(stogrageRef).then((res) => {
        res.prefixes.forEach((folderRef) => {
          listAll(folderRef).then((img) => {
            img.items.forEach((imgRef) => {
              getDownloadURL(imgRef).then((url) =>
                setImgList((old) => {
                  const newState = [...old];
                  newState.push(url);
                  return newState;
                })
              );
            });
          });
          setTimeout(() => {
            setLoad(true);
          }, 1000);
        });
        res.items.forEach((image) => {
          console.log(image.name);
        });
      });
    };

    fetchData();
  }, []);

  console.log(imgList);

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

      {load &&
        imgList.map((image, index) => {
          console.log(image);

          return <img src={image} key={index} alt="" />;
        })}
    </div>
  );
};

export default Home;
