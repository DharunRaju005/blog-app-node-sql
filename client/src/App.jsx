import React, { useState, useEffect } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState("login"); // 'login', 'signup', 'posts', 'postDetail', 'userPosts', 'categoryPosts', 'follows', 'bookmarks'
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [username, setUsername] = useState("shiva");
  const [password, setPassword] = useState("shiva");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [category, setCategory] = useState("");
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [d, s] = useState("");

  const fetchPosts = async () => {
    const response = await fetch("/post/");
    const data = await response.json();
    setPosts(data);
  };

  const fetchPost = async (postId) => {
    const response = await fetch(`/post/${postId}`);
    const data = await response.json();
    setPost(data);
  };

  const fetchComments = async (postId) => {
    const response = await fetch(`/comment/${postId}`);
    const data = await response.json();
    setComments(data);
  };

  const fetchUserPosts = async (username) => {
    const response = await fetch(`/post/user/${username}`);
    const data = await response.json();
    setPosts(data);
  };

  const fetchCategoryPosts = async (category) => {
    const response = await fetch(`/post/${category}`);
    const data = await response.json();
    setPosts(data);
  };

  const fetchFollowing = async () => {
    const response = await fetch("/follows/");
    const data = await response.json();
    setFollowing(data);
  };

  const fetchFollowers = async () => {
    const response = await fetch("/follows/followers");
    const data = await response.json();
    setFollowers(data);
  };

  const fetchBookmarks = async () => {
    const response = await fetch("/bookmark/");
    const data = await response.json();
    setBookmarks(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setView("posts");
    } else {
      console.log(response);
      console.log(JSON.stringify({ username, password }));
      alert("Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5173/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setView("posts");
    } else {
      console.log(response);
      alert("Signup failed");
    }
  };

  const handleLogout = async () => {
    const response = await fetch("/logout", {
      method: "POST",
    });

    if (response.ok) {
      setIsAuthenticated(false);
      setView("login");
    } else {
      alert("Logout failed");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const response = await fetch(`/comment/${selectedPostId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentData: newComment }),
    });

    if (response.ok) {
      fetchComments(selectedPostId);
      setNewComment("");
    } else {
      alert("Failed to add comment");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <header style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
            <div>CMS</div>
            <button onClick={handleLogout}>Logout</button>
          </header>
          <nav>
            <button onClick={() => setView("posts")}>All Posts</button>
            <button onClick={() => setView("userPosts")}>My Posts</button>
            <button onClick={() => setView("categoryPosts")}>Category Posts</button>
            <button onClick={() => setView("follows")}>Follows</button>
            <button onClick={() => setView("bookmarks")}>Bookmarks</button>
          </nav>
          {view === "posts" && (
            <ul>
              {posts.map((post) => (
                <li
                  key={post.post_id}
                  onClick={() => {
                    setSelectedPostId(post.post_id);
                    setView("postDetail");
                  }}
                >
                  {post.post_content}
                </li>
              ))}
            </ul>
          )}
          {/* Implement other views similarly */}
        </>
      ) : view === "login" ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <button onClick={() => setView("signup")}>Sign up</button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Sign up</button>
          <p>
            Already have an account? <button onClick={() => setView("login")}>Login</button>
          </p>
        </form>
      )}
    </div>
  );
};

export default App;
