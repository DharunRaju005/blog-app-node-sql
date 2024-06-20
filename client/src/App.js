import React, { useState } from "react";
import styled from "styled-components";
import SignUp from "./components/SignUp";
import SideBar from "./components/SideBar";
import PostComp from "./components/PostComp";
import { Route, Routes } from "react-router-dom";
import AddEditPopup from "./components/AddEditPopup";
import Categ from "./components/Categ";

function App() {
  const [currUser, setUser] = useState();
  const [currToken, setToken] = useState();
  const [showSignUp, setShowSignUp] = useState(true);
  const [menuState, setMenuState] = useState(0);
  const [addPost, setaddPostPopup] = useState(false);
  const [addEditDataId, setAddId] = useState();
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };
  const toggleMenu = (i) => {
    setMenuState(i);
  };

  const tokenizer = (userid, token) => {
    setUser(userid);
    setToken(token);
  };

  const tokenjsonizer = () => {
    return;
  };

  return (
    <div className="App">
      {showSignUp ? (
        <SignUp showSignUp={showSignUp} toggleSignUp={toggleSignUp} tokenizer={tokenizer} />
      ) : (
        <div style={{ display: "flex", "flex-direction": "row" }}>
          <SideBar menu={menuState} toggleMenu={toggleMenu} toggleSignUp={toggleSignUp} />
          {menuState == 0 && <PostComp url={"post"} />}
          {menuState == 1 && <PostComp url={"post/published"} />}
          {menuState == 2 && <PostComp url={"bookmark"} />}
          {menuState == 3 && <PostComp url={"follows/"} />}
          {menuState == 4 && <Categ />}
        </div>
      )}
    </div>
  );
}

export default App;
