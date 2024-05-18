import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #c0d7f3;
    font-family: 'Arial', sans-serif;
  }
`;


const Register = () => {
  return( 
  <>
    <GlobalStyle/>
    <Container>
    <Form action="">
      <label htmlFor="">Email <span>*</span></label>
      <input type="email" name="email" placeholder="john@gmail.com" required/>
      <label htmlFor="">Phone No <span>*</span></label>
      <input type="tel" name="number" placeholder="1234567890"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"required/>
      <label htmlFor="">First Name <span>*</span></label>
      <input type="text" name="firstName" placeholder="John" required />
      <label htmlFor="">Last Name  <span style={{opacity:"0.7", color:"black"}}>(optional)</span></label>
      <input type="text"name="lastName" placeholder="Durairaj" />
      <label htmlFor="">Gender</label>
      <div style={{display:"flex",flexDirection:"row",gap:"10%"}}>
        <div style={{display:"flex",flexDirection:"row"}}>
        <input type="radio" name="male"  />
          <label htmlFor="" style={{marginLeft:"0.5rem"}}>Male</label>       
        </div>
        <div style={{display:"flex",flexDirection:"row"}}>
        <input type="radio" name="male"  />
          <label htmlFor="" style={{marginLeft:"0.5rem"}}>Female</label>       
        </div>
        <div style={{display:"flex",flexDirection:"row"}}>
        <div style={{display:"flex",flexDirection:"row"}}>
        <input type="radio" name="male"  />
          <label htmlFor="" style={{marginLeft:"0.5rem"}}>Transgender</label>       
        </div>

        </div>
        <div style={{display:"flex",flexDirection:"row"}}>
        <div style={{display:"flex",flexDirection:"row"}}>
        <input type="radio" name="male"  />
          <label htmlFor="" style={{marginLeft:"0.5rem"}}>Others</label>       
        </div>

        </div>
      </div>
      <label htmlFor="">Institution/Organisation Name</label>
      <input type="text"name="institution" placeholder="PSG College of Technology" />
    </Form>
    <div style={{paddingBottom:"1rem"}}><Button>Submit</Button></div>
    </Container>
  </>
);
}

const Container=styled.div`
position:relative;
display: flex;
align-items:center;
flex-direction:column;
justify-content:center;
width:65%;
margin-left:15%;
height:auto;
padding:3rem;
background-color:white;
margin-top:5%;
margin-bottom:5%;
border-radius:8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 2rem;
  padding: 6rem;

  & input {
    border-radius: 8px;
    border: 0.2px solid rgba(0, 0, 0, 0.7);
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

const Button=styled.button`
  position:absolute;
  bottom:0;
  right:0;
  width:auto;
  height:auto;
  padding:0.7rem;
  border-radius:8px;
  margin-bottom:5%;
  margin-right:5%;
  background-color:#0073e6;
  border:none;
  color:white;
  font-weight:600;


`;


export default Register;
