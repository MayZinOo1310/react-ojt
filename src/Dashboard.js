import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import List from './components/List';
import ImageUpload from './components/ImageUpload';
import { auth } from "./firebase";

function Dashboard() {
  const [user] = useAuthState(auth);
  //const [name, setName] = useState("");
  const history = useHistory();

  //const fetchUserName = async () => {
  //  try {
  //    const query = await db
  //      .collection("users")
  //      .where("uid", "==", user?.uid)
  //      .get();
  //    //const data = await query.docs[0].data();
  //    //setName(data.name);
  //  } catch (err) {
  //    console.error(err);
  //    alert("An error occured while fetching user data");
  //  }
  //};

  useEffect(() => {
    if (!user) return history.replace("/");
    //fetchUserName();
  }, [user]);
  

  //image upload
  //const [image, setImage] = useState('');
  //const upload = () => {
  //  if (image == null)
  //    return;
  //  storage.ref(`/images/${image.name}`).put(image)
  //    .on("state_changed", alert("success"), alert);
  //}
  return (
    <div>
      {/*<center>
        <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
        <button onClick={upload}>Upload</button>
      </center>*/}
      <List />
      <ImageUpload />
      {/*<div className="dashboard">
        <div className="dashboard__container">
          Logged in as
          <div>{name}</div>
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>*/}
    </div>
  );
}

export default Dashboard;