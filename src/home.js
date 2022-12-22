import { doc, setDoc } from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { db, storage } from "./firebase";

import { toPng } from "html-to-image";

const Home = () => {
  const [data, setData] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [imgList, setImgList] = useState([]);
  const [load, setLoad] = useState(false);

  const downloadRef = useRef();

  const downloadImage = useCallback(() => {
    if (downloadRef.current === null) {
      return;
    }
    toPng(downloadRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [downloadRef]);

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
    <div id="downloadImg">
      <Link to="/login">Login plx</Link>

      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="enter a text"
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit">submit plx</button>
      </form>

      <div ref={downloadRef}>
        {load &&
          imgList.map((image, index) => {
            console.log(image);

            return <img src={image} key={index} alt="" />;
          })}
      </div>
      <button onClick={() => downloadImage()}>Download Image</button>
    </div>
  );
};

export default Home;
