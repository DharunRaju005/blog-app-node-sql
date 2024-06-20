import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostComp from "./PostComp";

const CategoriesContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const CategoryButton = styled.button`
  padding: 12px;
  margin: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function Categ() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/post/category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Error occurred while fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {!selectedCategory ? (
        <CategoriesContainer>
          {categories.map((cat) => (
            <CategoryButton key={cat.category} onClick={() => handleCategoryClick(cat.category)}>
              {cat.category}
            </CategoryButton>
          ))}
        </CategoriesContainer>
      ) : (
        <PostComp url={`post/category/${selectedCategory}`} />
      )}
    </div>
  );
}

export default Categ;
