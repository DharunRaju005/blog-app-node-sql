import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddEditPopup from "./AddEditPopup"; // Import the AddEditPopup component

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
  margin: 10px 0;
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

const AddCommentButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff0000;
  cursor: pointer;
`;

function CommentPopup({ postId, onClose }) {
  const [comments, setComments] = useState([]);
  const [showAddEditPopup, setShowAddEditPopup] = useState(false);
  const [addEditType, setAddEditType] = useState("Add");
  const [addEditDataId, setAddEditDataId] = useState(null);

  useEffect(() => {
    const fetchCommentsForPost = async (postId) => {
      try {
        const response = await fetch(`http://localhost:3001/comment/${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        console.log(response);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch comments for post ${postId}: ${errorText}`);
        }
        const data = await response.json();
        setComments(data);
        console.log(data);
      } catch (error) {
        console.error("Error occurred while fetching comments:", error);
        console.log("An error occurred while fetching comments.");
      }
    };

    fetchCommentsForPost(postId);
  }, [postId]);

  const handleAddEditComment = (type, commentId) => {
    setAddEditType(type);
    setAddEditDataId(postId);
    setShowAddEditPopup(true);
    console.log(type);
    console.log(commentId);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3001/comment/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      console.log(response);
      if (!response.ok) {
        const errorText = await response.text();
        console.log(response.text);
        throw new Error(`Failed to delete comment: ${errorText}`);
      }
      setComments(comments.filter((comment) => comment.comment_id !== commentId));
    } catch (error) {
      console.error("Error occurred while deleting comment:", error);
      alert("An error occurred while deleting the comment.", error);
    }
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <PopupHeader>Comments</PopupHeader>
        <AddCommentButton onClick={() => handleAddEditComment("Add")}>Add Comment</AddCommentButton>
        <CommentsContainer>
          {comments.map((comment) => (
            <Comment key={comment.comment_id}>
              <CommentHeader>
                <CommentContent>{comment.comment_data}</CommentContent>
                <div>
                  <EditButton onClick={() => handleAddEditComment("Edit", postId)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDeleteComment(comment.comment_id)}>Delete</DeleteButton>
                </div>
              </CommentHeader>
            </Comment>
          ))}
        </CommentsContainer>
        <CloseCommentsButton onClick={onClose}>Close</CloseCommentsButton>
        {showAddEditPopup && <AddEditPopup type={addEditType} dataType="comment" dataId={postId} onClose={() => setShowAddEditPopup(false)} />}
      </PopupContent>
    </PopupOverlay>
  );
}

export default CommentPopup;
