import React, { Suspense, useEffect } from "react";
import styled from "styled-components";

import { Route, Routes } from "react-router";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Home from "./Home";
import Header from "./Header";
import MakePost from "./MakePost";

import Detail from "./Detail";
import ModiPost from "./ModiPost";
import "./index.css";
import tw from "tailwind-styled-components";



function App() {

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

const Container = tw.div`
  flex items-center flex-col w-100
`;

export default App;

// 윤민님 http://3.34.144.203/
