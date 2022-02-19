import React from "react";
import styled from "styled-components";

import { Route, Routes } from "react-router";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <MainTitle>Fivegram</MainTitle>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
`;
const MainTitle = styled.h1`
  margin-left: 17px;
`;

export default App;
