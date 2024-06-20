import React, { useState } from "react";
import styled from "styled-components";

function MyUtil() {
  const BASE_URL = "http://localhost:3001/"; // Replace with your API base URL

  // Method to handle POST requests
  const postData = async (endpoint, inputData) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    if (!response.ok) alert("Error");
    const data = await response.json();
    console.log(data + " " + response);
    return data;
  };

  // Method to handle GET requests
  const getData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) alert("Error");
    const data = await response.json();
    return data;
  };

  // Method to handle PUT requests
  const putData = async (endpoint, inputData) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    if (!response.ok) alert("Error");
    const data = await response.json();
    return data;
  };

  // Method to handle DELETE requests
  const deleteData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) alert("Error");
    const data = await response.json();
    return data;
  };

  const isBookmarked = ({ data_id }) => {
    const data = getData("/bookmark/");
    for (let i in data) {
      if (i.data_id === data_id) return i.bookmark_id;
    }
    return -1;
  };

  const isFollowed = (writer) => {
    const data = getData("/follows/");
    for (let i in data) {
      if (i.writer_id === writer) return true;
    }
    return false;
  };

  /*-----------------------------------------*/
  const [currUser, setCurrUser] = useState("");
  const [isAuth, setAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const [menu, setMenu] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");
  const [postIdToUpdate, setPostIdToUpdate] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [expandedComments, setExpandedComments] = useState([]);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const [commentPostIdToUpdate, setCommentPostIdToUpdate] = useState(null);
  const [following, setFollowing] = useState(false);
  const [addpostPopup, setaddPostPopup] = useState(false);
  const [id, setId] = useState(0);

  const [categHome, setCategHome] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleUpdateComment = (event) => {
    event.preventDefault();
    // Handle comment update logic here
    closeCommentPopup();
  };

  const openCommentPopup = (postId, comment) => {
    setCommentPostIdToUpdate(postId);
    setUpdatedComment(comment);
    setShowCommentPopup(true);
  };

  const closeCommentPopup = () => {
    setShowCommentPopup(false);
    setCommentPostIdToUpdate(null);
    setUpdatedComment("");
  };

  const handleLogin = async (username, password) => {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000);
      document.cookie = `Mycookie=100;expires=${expires.toUTCString()};path=/`;
      const inp = { username: username, password: password };
      const data = await postData("/login", inp);
      console.log(inp);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignup = async (username, password, email) => {
    try {
      const inp = { username: username, password: password, email: email };
      const data = await postData("/signup", inp);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  `;

  const Title = styled.h2`
    font-size: 36px;
    margin-bottom: 20px;
  `;

  const Card = styled.div`
    background-color: #f0f0f0;
    padding: 40px;
    border-radius: 20px;
    margin-top: 20px;
  `;

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `;

  const Input = styled.input`
    width: 300px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  `;

  const Button = styled.button`
    width: 150px;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  `;

  const Signin = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleFormToggle = () => {
      setIsSignIn(!isSignIn);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (isSignIn) {
        handleLogin(username, password);
      } else {
        handleSignup(username, password, email);
      }
    };

    return (
      <Container>
        <Title>Welcome to MyCMS</Title>
        <Card>
          <h3>{isSignIn ? "Sign In" : "Sign Up"}</h3>
          <Form onSubmit={handleSubmit}>
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {!isSignIn && <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />}
            <Button type="submit">{isSignIn ? "Sign In" : "Sign Up"}</Button>
          </Form>
          <p onClick={handleFormToggle} style={{ cursor: "pointer" }}>
            {isSignIn ? "Don't have an account? Sign up!" : "Already have an account? Sign in!"}
          </p>
        </Card>
      </Container>
    );
  };

  const HeaderSide = () => {
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

    return (
      <HeaderContainer>
        <h2>My CMS</h2>
        <AddButton onClick={() => setaddPostPopup(!addpostPopup)}>Add Post</AddButton>
        <Button style={menu == 0 ? selectedMenu : null} onClick={() => setMenu(0)}>
          All Posts
        </Button>
        <Button style={menu == 1 ? selectedMenu : null} onClick={() => setMenu(1)}>
          My Posts
        </Button>
        <Button style={menu == 2 ? selectedMenu : null} onClick={() => setMenu(2)}>
          Bookmarks
        </Button>
        <Button style={menu == 3 ? selectedMenu : null} onClick={() => setMenu(3)}>
          Followers
        </Button>
        <Button
          style={menu === 4 ? selectedMenu : null}
          onClick={() => {
            setMenu(4);
            setCategHome(true);
          }}
        >
          Categories
        </Button>
        <LogoutButton
          onClick={() => {
            setAuth(false);
            setCurrUser(null);
            postData("/logout", null);
          }}
        >
          Logout
        </LogoutButton>
      </HeaderContainer>
    );
  };

  const PostsContainer = styled.div`
    width: 100%;
    padding: 24px;
  `;

  const Post = styled.div`
    background-color: #f3f3f3;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #c7c7c7;
  `;

  const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const WriterName = styled.h3`
    margin: 0;
  `;

  const PostDate = styled.span`
    color: #999;
    font-size: 14px;
    font-weight: 600;
    margin-top: 5px;
  `;

  const ActionButton = styled.button`
    background-color: transparent;
    color: #007bff;
    border: 1px solid #007bff;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    margin-left: 10px;
  `;

  const PostContent = styled.p`
    margin-top: 10px;
  `;

  const PostCommentsButton = styled.button`
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    color: #333;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
  `;

  const CommentsContainer = styled.div`
    margin-top: 20px;
  `;

  const Comment = styled.div`
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin-top: 10px;
  `;

  const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const CommentContent = styled.p`
    margin-top: 10px;
  `;

  const CloseCommentsButton = styled.button`
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    color: #333;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
  `;

  const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const PopupContent = styled.div`
    background-color: #fff;
    padding: 20px 40px;
    border-radius: 8px;
  `;

  const PopupHeader = styled.h2`
    margin-bottom: 20px;
  `;

  const PopupForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;

  const ButtonOutline = styled(Button)`
    background-color: transparent;
    color: #007bff;
    border-color: #007bff;
  `;

  const handleUpdatePost = (event) => {
    event.preventDefault();
    // Handle post update logic here
    closePopup();
  };

  const openPopup = (postId, content) => {
    setPostIdToUpdate(postId);
    setUpdatedContent(content);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPostIdToUpdate(null);
    setUpdatedContent("");
  };

  const toggleBookmark = (postId, bm) => {
    if (bookmarks.includes(postId)) {
      setBookmarks(bookmarks.filter((id) => id !== postId));
    } else {
      setBookmarks([...bookmarks, postId]);
    }
    if (bm === -1) postData("/bookmark/" + postId);
    else deleteData("/bookmark/" + bm);
  };

  const toggleComments = (postId) => {
    if (expandedComments.includes(postId)) {
      setExpandedComments(expandedComments.filter((id) => id !== postId));
    } else {
      setExpandedComments([...expandedComments, postId]);
    }
  };
  const PostRender = ({ url }) => {
    console.log(url);
    const posts = getData(url);

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <HeaderSide userData={userData} />
        <PostsContainer>
          {posts.map(async (post) => {
            const comments = await getData("/comments/" + post.data_id);
            const bm = isBookmarked(post.data_id);
            const _followed = isFollowed(post.writer_id);
            return (
              <Post key={post.data_id}>
                <EditPopup updateType={"post"} data_id={post.data_id} />
                <PostHeader>
                  <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "baseline" }}>
                    <WriterName>{post.username}</WriterName>
                    <ActionButton
                      onClick={() => {
                        deleteData("/follows/" + post.writer_id);
                        _followed = isFollowed(post.writer_id);
                      }}
                      style={{ borderRadius: "32px", padding: "4px 12px", background: _followed ? "#007bff" : "transparent", color: _followed ? "#fff" : "#007bff" }}
                    >
                      {_followed ? "Following" : "Follow"}
                    </ActionButton>
                  </div>
                  <div>
                    <ActionButton onClick={() => toggleBookmark(post.data_id, bm)} style={{ background: bm != -1 ? "#007bff" : "transparent", color: bm != -1 ? "#fff" : "#007bff" }}>
                      {bm != -1 ? "Bookmarked" : "Bookmark"}
                    </ActionButton>
                    <ActionButton onClick={() => openPopup(post.data_content)}>Edit</ActionButton>
                    <ActionButton>Delete</ActionButton>]<ActionButton>Add Comment</ActionButton>
                  </div>
                </PostHeader>
                <PostContent>{post.data_content}</PostContent>
                <PostCommentsButton onClick={() => toggleComments(post.data_id)}>{expandedComments.includes(post.data_id) ? "Close Comments" : "See Comments"}</PostCommentsButton>
                {expandedComments.includes(post.data_id) && (
                  <CommentsContainer>
                    {comments.map((comment, index) => (
                      <Comment key={index}>
                        <CommentHeader>
                          <WriterName>{comment.user_id}</WriterName>
                          <div>
                            <ActionButton onClick={openCommentPopup}>Edit</ActionButton>
                            <ActionButton>Delete</ActionButton>
                          </div>
                        </CommentHeader>
                        <CommentContent>{comment.comment_content}</CommentContent>
                      </Comment>
                    ))}
                  </CommentsContainer>
                )}
              </Post>
            );
          })}
        </PostsContainer>
      </div>
    );
  };

  const Popup = () => {
    const [dataContent, setDataContent] = useState("");
    const [category, setCategory] = useState("");

    const handleAddPost = async () => {
      const jsonData = {
        dataContent: dataContent,
        category: category,
      };

      try {
        // Call postData function with the gathered data
        const data = postData("/post/", jsonData);

        setCategory("");
      } catch (error) {
        console.error("Error adding post:", error);
        // Handle error appropriately (e.g., show error message to user)
      }
    };

    return (
      <PopupOverlay>
        <PopupContent>
          <PopupHeader>Add post</PopupHeader>
          <ContentPlaceholder>
            {/* Input field for data content */}
            <input type="text" placeholder="Enter post content" value={dataContent} onChange={(e) => setDataContent(e.target.value)} />
            {/* Input field for category */}
            <input type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </ContentPlaceholder>
          <ButtonRow>
            <CancelButton onClick={() => setaddPostPopup(!addpostPopup)}>Cancel</CancelButton>
            <AddButton onClick={handleAddPost}>Add</AddButton>
          </ButtonRow>
        </PopupContent>
      </PopupOverlay>
    );
  };

  const EditPopup = ({ updateType, data_id }) => {
    const [editContent, setEditContent] = useState("");

    const toggle = () => {
      setShowPopup(!showPopup);
      setShowCommentPopup(!showCommentPopup);
    };

    const handleUpdate = () => {
      const inp = updateType == "post" ? { dataContent: editContent } : { commentData: editContent };
      putData("/" + updateType + "/" + data_id, inp);
      toggle();
    };

    return (
      <PopupOverlay>
        <PopupContent>
          <PopupHeader>Edit</PopupHeader>
          <ContentPlaceholder>
            {/* Input field for edit content */}
            <input type="text" placeholder="Enter edit content" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          </ContentPlaceholder>
          <ButtonRow>
            <CancelButton onClick={toggle}>Cancel</CancelButton>
            <AddButton onClick={handleUpdate}>Update</AddButton>
          </ButtonRow>
        </PopupContent>
      </PopupOverlay>
    );
  };

  const ContentPlaceholder = styled.textarea`
    width: 92%;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 20px;
  `;

  const ButtonRow = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 24px;
  `;

  const CancelButton = styled(Button)`
    background-color: #ccc;
    color: #333;
  `;

  const AddButton = styled(Button)`
    background-color: #007bff;
    color: #fff;
  `;

  const Categ = () => {
    const categoriesData = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
      { id: 3, name: "Category 3" },
      { id: 4, name: "Category 4" },
      { id: 5, name: "Category 5" },
      // Add more categories as needed
    ];

    const handleCategoryClick = (categoryId) => {
      setSelectedCategoryId(categoryId);
      setCategHome(false);
    };

    const handleBackClick = () => {
      setCategHome(true);
      setSelectedCategoryId(null);
    };

    return (
      <div>
        {categHome ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <HeaderSide userData={userData} />
            <ul style={{ padding: "12px", width: "100%", padding: "24px" }}>
              {categoriesData.map((category) => (
                <li style={{ cursor: "pointer", padding: "12px", "list-style": "none" }} key={category.id} onClick={() => handleCategoryClick(category.id)}>
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <PostRender url={`/post/${selectedCategoryId}`} />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <button onClick={() => setAuth(true)}>{isAuth ? "hii" : "noo"}</button>
      {!isAuth && <Signin />}
      {isAuth && addpostPopup && <Popup />}

      {isAuth && menu == 0 && <PostRender url={"/post/"} />}

      {isAuth && menu == 1 && <PostRender url={"/post/published"} />}

      {isAuth && menu == 2 && <PostRender url={"/bookmark/"} />}

      {isAuth && menu == 3 && <PostRender url={"/follows/"} />}
      {isAuth && menu == 4 && <Categ />}
    </div>
  );
}

export default MyUtil;
