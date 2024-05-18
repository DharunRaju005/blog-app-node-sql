import React from "react";
import styled from "styled-components";
import { useState,useEffect } from "react";
import axios from "axios";

import { useCookies } from "react-cookie";


const Login = () => {
  const Navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (cookies.jwt) {
      Navigate("/home");
    }
  }, [cookies, Navigate]);

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );

      if (data) {
        //to check the error
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) {
            generateError(email);
          } else if (password) {
            generateError(password);
          }
        }
        //if no error
        else {
          Navigate("/home");
        }
      }
    } catch (e) {
      console.log("HELLO");
      console.log(e);
    }
  };




  return (
    <>
      <Container>
        <h1 style={{marginLeft:"5rem",marginBottom:"-2rem"}}>Welcome Back Geek👋🏻</h1>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:<span>*</span>
          </label>
          <input type="email" name="email" value={values.email} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} placeholder="John@gmail.com" required />
          <label htmlFor="password">
            Password:<span>*</span>
          </label>
          <input type="password" name="password" value={values.password} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} placeholder="*****" required />
          <button type="submit">Login</button>
          <AccountExsist>
          Create an account? <Link to={"/signup"} style={{textDecoration:"none" ,color:"blue", fontWeight:"600"}}> SignUp</Link>
        </AccountExsist>
        </Form>
      <div ><img src={login} alt="" style={{position:"absolute",top:"3rem",right:"15rem",bottom:"2rem"}} /></div>
      </Container>
      <ToastContainer />
    </>
    
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.51rem;
  padding-left: 10rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 2rem;
  padding: 6rem;

  & input {
    border-radius: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.7);
    height: 2.5rem;
    align-items: center;
    margin-left: 4px;
  }

  & input::placeholder {
    padding: 0.5rem; /* Add padding to the placeholder */
  }

  & button {
    border-radius: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.7);
    margin-left: 4px;
    background-color: black;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    height: 3rem;
    width: 30%;
  }

  & button:hover {
    color: black;
    background-color: white;
  }

  & label {
    display: flex;
    align-items: center;
    font-weight: 600;
  }

  & span {
    color: red;
  }
`;

const AccountExsist = styled.div`
  margin-top: 1rem;
  
  
`;

export default Login;
