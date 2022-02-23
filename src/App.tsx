import React, { Suspense } from "react";
import styled from "styled-components";

import { Route, Routes } from "react-router";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Home from "./Home";
import Header from "./Header";
import MakePost from "./MakePost";

import Detail from "./Detail";
import ModiPost from "./ModiPost";


function App() {
// "proxy": "https://4c620725-80ad-481e-a695-fe10fcdf3781.mock.pstmn.io"

  return (
    <div className="App">
      <Header />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/makepost" element={<MakePost />} />
          <Route path="/detail/:idx" element={<Detail />} />
          <Route path="/modipost/:idx" element={<ModiPost />} />
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

export default App;
