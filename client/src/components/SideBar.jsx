import React, { useState } from "react";
import styled from "styled-components";
import AddEditPopup from "./AddEditPopup";

function SideBar({ menu, toggleMenu, toggleSignUp }) {
  const HeaderContainer = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    width: 20%;
    align-content: space-around;
    height: 720px;
    background: black;
    color: white;
    gap: 24px;
  `;

  const Button = styled.button`
    padding: 12px 32px;
    background: #2c2c2c;
    color: white;
    font-size: 14px;
    border: 1px solid transparent;
    text-align: start;
    cursor: pointer;
  `;

  const AddButton = styled(Button)`
    text-align: center;
    background: black;
    border-color: blue;
  `;

  const LogoutButton = styled(Button)`
    text-align: center;
    background: black;
    border-color: red;
  `;

  const selectedMenu = {
    background: "white",
    color: "black",
  };

  const [addPost, setaddPostPopup] = useState(false);
  const [addEditDataId, setAddId] = useState();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Logout successful:", data);
      toggleSignUp();
    } catch (error) {
      alert("Error  occured. check input", error);
    }
  };
  return (
    <HeaderContainer>
      <h2>My CMS</h2>
      <AddButton
        onClick={() => {
          setaddPostPopup(true);
        }}
      >
        Add Post
      </AddButton>
      <Button style={menu == 0 ? selectedMenu : null} onClick={() => toggleMenu(0)}>
        All Posts
      </Button>
      <Button style={menu == 1 ? selectedMenu : null} onClick={() => toggleMenu(1)}>
        My Posts
      </Button>
      <Button style={menu == 2 ? selectedMenu : null} onClick={() => toggleMenu(2)}>
        Bookmarks
      </Button>
      <Button style={menu == 3 ? selectedMenu : null} onClick={() => toggleMenu(3)}>
        Following
      </Button>
      <Button style={menu == 4 ? selectedMenu : null} onClick={() => toggleMenu(4)}>
        Categories
      </Button>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      {addPost && <AddEditPopup type="Add" dataType="post" dataId={addEditDataId} onClose={() => setaddPostPopup(false)} />}
    </HeaderContainer>
  );
}

export default SideBar;
