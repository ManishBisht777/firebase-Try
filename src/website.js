import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "./firebase";

const Website = () => {
  const [navbar, setNavbar] = useState({
    path: "profile.jpg",
    url: "",
  });
  const [sidebar, setSidebar] = useState("");
  const [footer, setFooter] = useState("");
  const [landing, setLanding] = useState({
    path: "",
    url: "",
  });

  const [image, setImage] = useState([]);

  useEffect(() => {
    if (!navbar.path) return;

    const navbarRef = ref(storage, navbar.path);
    getDownloadURL(navbarRef).then((url) => {
      setNavbar({ ...navbar, url: url });
    });
  }, [navbar.path]);

  useEffect(() => {
    if (!landing.path) return;

    const landingRef = ref(storage, landing.path);
    getDownloadURL(landingRef).then((url) => {
      setLanding({ ...landing, url: url });
    });
  }, [landing.path]);

  useEffect(() => {
    const getimages = async () => {
      const imageRef = ref(storage);
      const imageList = await listAll(imageRef);
      const images = imageList.items.map(async (image) => {
        return {
          name: image.name,
          url: await getDownloadURL(image),
        };
      });

      setImage(await Promise.all(images));
    };

    getimages();
  }, []);

  return (
    <section>
      {!navbar.path ? (
        <div className="container">navbar</div>
      ) : (
        <img src={navbar.url} alt="" />
      )}
      <div className="container">
        <div className="container">sidebar</div>
        <div className="container">
          <button>insert Image</button>
          <input
            type="text"
            placeholder="Enter name"
            onChange={(e) => {
              setLanding({ ...React, path: e.target.value });
            }}
          />
          landing page
        </div>
      </div>

      {!landing.path ? (
        <div className="container">Other section</div>
      ) : (
        <img src={landing.url} alt="" />
      )}

      <div className="container">footer</div>

      {image &&
        image.map((imgi, index) => {
          return (
            <div key={index}>
              <img src={imgi.url} />
              <p>{imgi.name}</p>
            </div>
          );
        })}
    </section>
  );
};

export default Website;
