import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useParams } from "react-router";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Detail = () => {
  const p:any = useLocation().state;
  const Navigate = useNavigate()

  return (
    <div>
      <h1>상세페이지입니다</h1>
      <PostDiv>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>작성자 : {p.nickName}</h4>
          
        </div>
        {p.type === "full" && (
          <div>
            <img
              
              width="380px"
              src={p.image}
            ></img>
            <div style={{ width: "30px", height: "25px" }}>
              
            </div>

            <TextView>{p.contents}</TextView>
          </div>
        )}
        {p.type === "right" && (
          <div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "290px",
                  height: "350px",
                  overflow: "hidden",
                  marginRight: "5px",
                }}
              >
                <img
                  
                  style={{ marginLeft: "-85px" }}
                  width="auto"
                  height="340px"
                  src={p.image}
                ></img>
              </div>
              <TextView style={{ height: "310px" }}>{p.contents}</TextView>
            </div>
            <div style={{ width: "30px", height: "25px" }}>
              
            </div>
          </div>
        )}
        {p.type === "left" && (
          <div>
            <div style={{ display: "flex" }}>
              <TextView style={{ height: "310px" }}>{p.contents}</TextView>
              <div
                style={{
                  width: "320px",
                  height: "350px",
                  overflow: "hidden",
                  marginLeft: "5px",
                }}
              >
                <img
                  
                  style={{ marginLeft: "-85px" }}
                  width="auto"
                  height="340px"
                  src={p.image}
                ></img>
              </div>
            </div>
            
          </div>
        )}
      </PostDiv>
      <button onClick={()=> Navigate("/")}>홈으로</button>
    </div>
  );
};


const HomeDiv = styled.div`
  display: flex;
  /* width: 800px; */
`;

const Div = styled.h1``;

const Likes = styled.div`
  display: flex;
  width: 380px;
  height: 20px;
  font-size: 20px;
  margin: 3px;
  flex-direction: row-reverse;
`;
const TextView = styled.div`
  word-wrap: break-word;
  white-space: normal;
  width: 380px;
  height: 97px;
  margin-top: 10px;
  overflow: hidden;
`;

const PostDiv = styled.div`
  width: 400px;
`;
const LikeButton = styled.button`
  display: flex;
  width: 40px;
  height: 16px;
  flex-direction: row-reverse;
`;
export default Detail;
