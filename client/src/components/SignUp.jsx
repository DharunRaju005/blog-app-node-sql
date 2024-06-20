import React, { useState } from "react";
import styled from "styled-components";

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

function SignUp({ showSignUp, toggleSignUp, tokenizer }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (username, password) => {
    const inp = { username: username, password: password };

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inp),
      });

      if (!response.ok) {
        const data = await response.json();
        alert("Login unsuccessful: " + data);
      } else {
        const data = await response.json();
        console.log("Login successful:", data.token + "  " + data.user_id);
        tokenizer(data.user_id, data.token);
        toggleSignUp();
        // document.cookie = `cms_token=${data.token}; path=/;`;
        // document.cookie = `userId=${data.user_id}; path=/;`;
      }
    } catch (error) {
      alert("Error  occured. check input", error);
    }
  };

  const handleSignup = async (username, password, email) => {
    const inp = { username: username, password: password, email: email };

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inp),
      });

      if (!response.ok) {
        const data = await response.json();
        alert("Signup unsuccessful: " + data);
      } else {
        const data = await response.json();
        console.log("Signup successful:", data);
        tokenizer(data.user_id, data.token);
        toggleSignUp();
        //document.cookie = `cms_token=${data.token}; userId=${data.user_id}; path=/;`;
      }
    } catch (error) {
      alert("Error  occured. check input", error);
    }
  };

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
    showSignUp && (
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
    )
  );
}

export default SignUp;
