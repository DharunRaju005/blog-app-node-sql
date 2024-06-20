import React, { useState } from "react";
import styled from "styled-components";

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
  padding: 20px;
  border-radius: 8px;
`;

const PopupHeader = styled.h2`
  margin-bottom: 20px;
  color: black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: black;
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: black;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  margin-right: 10px;
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
`;

function AddEditPopup({ type, dataType, dataId, onClose }) {
  console.log(type + " " + dataType + " " + dataId);
  const [formData, setFormData] = useState({
    category: "",
    dataContent: "",
  });
  const [commData, setCommData] = useState({
    commentData: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (dataType === "post") setFormData({ ...formData, [name]: value });
    else setCommData({ ...commData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(commData);
    console.log(formData);
    console.log("hiii");

    try {
      const url = dataType === "post" ? (type === "Add" ? "post/" : `post/${dataId}`) : `comment/${dataId}`;
      console.log(url);
      const fullUrl = `http://localhost:3001/${url}`;
      const method1 = type === "Edit" ? "PUT" : "POST";
      const inp = dataType == "post" ? formData : commData;

      console.log("Full URL: ", fullUrl); // Log the full URL
      console.log("Method: ", method1);
      console.log(inp); // Log the method

      const response = await fetch(fullUrl, {
        method: method1,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inp),
      });

      console.log(commData);
      console.log(url);
      console.log(response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("F");
      }
      console.log(response);
      const data = await response.json();
      console.log("data gotS");

      onClose();
      console.log(url);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  console.log(dataId + " " + dataType + " " + type);

  return (
    <PopupOverlay>
      <PopupContent>
        <PopupHeader>{`${type} ${dataType}`}</PopupHeader>
        <Form onSubmit={handleSubmit}>
          {dataType === "post" ? (
            <>
              <Label>
                Content
                <Input type="text" name="dataContent" value={formData.dataContent} onChange={handleChange} />
              </Label>
              {type === "Add" && (
                <Label>
                  Category
                  <Input type="text" name="category" value={formData.category} onChange={handleChange} />
                </Label>
              )}
            </>
          ) : (
            <Label>
              Comment
              <Input type="text" name="commentData" value={commData.commentData} onChange={handleChange} />
            </Label>
          )}
          <Button onClick={handleSubmit}>{type}</Button>
          <CancelButton type="button" onClick={handleCancel}>
            Cancel
          </CancelButton>
        </Form>
      </PopupContent>
    </PopupOverlay>
  );
}

export default AddEditPopup;
