import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentPopup from "./CommentPopup"; // Import the CommentPopup component
import AddEditPopup from "./AddEditPopup"; // Import the AddEditPopup component

const PostsContainer = styled.div`
  width: 100%;
  padding: 24px;
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

function PostComp({ url }) {
  const [posts, setPosts] = useState([]);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showAddEditPopup, setShowAddEditPopup] = useState(false);
  const [addEditType, setAddEditType] = useState("Edit");
  const [addEditDataId, setAddEditDataId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error("Error occurred while fetching posts:", error);
      }
    };

    fetchPosts();
  }, [url]);

  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const [followStatus, setFollowStatus] = useState({});

  useEffect(() => {
    const fetchPostsAndBookmarksAndFollows = async () => {
      try {
        // Fetch posts
        const responsePosts = await fetch(`http://localhost:3001/${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!responsePosts.ok) {
          throw new Error("Failed to fetch posts");
        }
        const postsData = await responsePosts.json();
        setPosts(postsData);

        // Fetch bookmarks
        const responseBookmarks = await fetch(`http://localhost:3001/bookmark`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!responseBookmarks.ok) {
          throw new Error("Failed to fetch bookmarks");
        }
        const bookmarksData = await responseBookmarks.json();

        // Fetch follows
        const responseFollows = await fetch(`http://localhost:3001/follows`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!responseFollows.ok) {
          throw new Error("Failed to fetch follows");
        }
        const followsData = await responseFollows.json();

        // Initialize bookmark status for each post
        const bookmarkStatusMap = {};
        postsData.forEach((post) => {
          bookmarkStatusMap[post.data_id] = bookmarksData.some((bookmark) => bookmark.data_id === post.data_id);
        });
        setBookmarkStatus(bookmarkStatusMap);

        // Initialize follow status for each writer
        const followStatusMap = {};
        postsData.forEach((post) => {
          followStatusMap[post.writer_id] = followsData.some((follow) => follow.writer_id === post.writer_id);
        });
        setFollowStatus(followStatusMap);
      } catch (error) {
        console.error("Error occurred while fetching posts, bookmarks, or follows:", error);
      }
    };

    fetchPostsAndBookmarksAndFollows();
  }, [url]);

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Remove the deleted post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post.data_id !== postId));
    } catch (error) {
      console.error("Error occurred while deleting post:", error);
    }
  };

  const handleBookmarkClick = async (dataId, boolVar) => {
    const method1 = boolVar ? "DELETE" : "POST";
    try {
      const response = await fetch(`http://localhost:3001/bookmark/${dataId}`, {
        method: method1,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to update bookmark");
      }

      // Update the bookmark status state
      setBookmarkStatus((prevStatus) => ({
        ...prevStatus,
        [dataId]: !boolVar,
      }));
    } catch (error) {
      console.error("Error occurred while updating bookmark:", error);
    }
  };

  const handleFollowClick = async (writerId, isFollowing) => {
    const method = isFollowing ? "DELETE" : "POST";
    console.log(method + "" + isFollowing + " " + writerId);
    try {
      const response = await fetch(`http://localhost:3001/follows/${writerId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to update follow status");
      }

      // Update the follow status state
      setFollowStatus((prevStatus) => ({
        ...prevStatus,
        [writerId]: !isFollowing,
      }));
    } catch (error) {
      console.error("Error occurred while updating follow status:", error);
    }
  };

  const handleShowComments = (postId) => {
    setSelectedPostId(postId);
    setShowCommentPopup(true);
  };

  const handleEditPost = (postId) => {
    setAddEditDataId(postId);
    setShowAddEditPopup(true);
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <PostsContainer>
          {posts.map((post) => (
            <Post key={post.data_id}>
              <PostHeader>
                <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "baseline" }}>
                  <WriterName>{post.username}</WriterName>
                  <ActionButton onClick={() => handleFollowClick(post.writer_id, followStatus[post.writer_id])}>{followStatus[post.writer_id] ? "Followed" : "Follow"}</ActionButton>
                </div>
                <div>
                  <ActionButton onClick={() => handleBookmarkClick(post.data_id, bookmarkStatus[post.data_id])}>{bookmarkStatus[post.data_id] ? "Bookmarked" : "Bookmark"}</ActionButton>
                  <ActionButton onClick={() => handleEditPost(post.data_id)}>Edit</ActionButton>
                  <ActionButton onClick={() => handleDeletePost(post.data_id)}>Delete</ActionButton>
                  <ActionButton onClick={() => handleShowComments(post.data_id)}>See Comments</ActionButton>
                </div>
              </PostHeader>
              <PostContent>{post.data_content}</PostContent>
            </Post>
          ))}
        </PostsContainer>
      </div>
      {showCommentPopup && <CommentPopup postId={selectedPostId} onClose={() => setShowCommentPopup(false)} />}
      {showAddEditPopup && <AddEditPopup type="Edit" dataType="post" dataId={addEditDataId} onClose={() => setShowAddEditPopup(false)} />}
    </div>
  );
}

export default PostComp;
