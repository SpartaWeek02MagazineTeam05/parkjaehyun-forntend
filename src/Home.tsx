import styled from "styled-components";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { likeList, postListAtom } from "./components/atoms";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getImpliedNodeFormatForFile } from "typescript";
import { Link } from "react-router-dom";
import Detail from "./Detail";

function Home() {
  const navigate = useNavigate();
  const [postlist, setPostlist] = useState([]);
  const [likelist, setLikeList] = useRecoilState(likeList);
  let likeArrZero = new Array(likelist.length).fill(0);
  const [likeArr, setLikeArr] = useState(likeArrZero);
  const [num, setNum] = useState(0);


  useEffect(() => {
    getposts();
    console.log("updatePage" + num);
  }, [num]);

  const getposts = async () => {
    await axios
      .get("/api/post")
      .then((res) => {
        console.log(res.data);
        const postlist = res.data;

        return setPostlist(postlist);
      })
      .catch(() => alert("게시물이 없습니다."));
  };
  console.log(postlist)
  async function deletePost(id: number) {
    await axios
      .delete("/api/post", {
        data: {
          postId: id,
        },
      })
      .then(() => setNum(num + 1))
      .catch(() => alert("삭제에 실패했습니다."));
  }
  console.log("sdf",postlist, sessionStorage.getItem("nickName"))
  
  return (
    <>
      <HomeDiv>
        <ul style={{listStyle:"none"}}>

          {postlist?.map((p: any, idx: number) => (
            <li key={idx}>
              <PostDiv>
                <div
                  style={{ display: "flex", justifyContent: "space-between" ,alignItems:"center"}}
                >
                  <h4>작성자 : {p.nickName}</h4>
                  {sessionStorage.getItem("nickName") === p.nickName ? (
                    <div>
                      <Button
                        onClick={() => {
                          navigate("/modipost/" + idx, { state: p });
                        }}
                      >
                        수정하기
                      </Button>
                      <Button onClick={() => deletePost(p.Id)}>삭제하기</Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {p.type === "full" && (
                  <div>
                    <img
                      onClick={() => {
                        navigate("/detail/" + idx, { state: p });
                      }}
                      width="380px"
                      src={p.image}
                    ></img>
                    <div style={{ width: "30px", height: "25px" }}>
                      <Likes>
                        {p.likeCount + likeArr[idx]}
                        {likelist[idx] ? (
                          <FaHeart
                            onClick={() => {
                              setLikeList((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  0,
                                  ...old.slice(idx + 1),
                                ];
                              });
                              setLikeArr((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  likeArr[idx] - 1,
                                  ...old.slice(idx + 1),
                                ];
                              });
                            }}
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() => {
                              setLikeList((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  1,
                                  ...old.slice(idx + 1),
                                ];
                              });
                              setLikeArr((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  likeArr[idx] + 1,
                                  ...old.slice(idx + 1),
                                ];
                              });
                            }}
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        )}
                      </Likes>
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
                          onClick={() => {
                            navigate("/detail/" + idx, { state: p });
                          }}
                          style={{ marginLeft: "-85px" }}
                          width="auto"
                          height="340px"
                          src={p.image}
                        ></img>
                      </div>
                      <TextView style={{ height: "310px" }}>
                        {p.contents}
                      </TextView>
                    </div>
                    <div style={{ width: "30px", height: "25px" }}>
                      <Likes>
                        {p.likeCount + likeArr[idx]}
                        {likelist[idx] ? (
                          <FaHeart
                            onClick={() => {
                              setLikeList((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  0,
                                  ...old.slice(idx + 1),
                                ];
                              });
                              setLikeArr((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  likeArr[idx] - 1,
                                  ...old.slice(idx + 1),
                                ];
                              });
                            }}
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() => {
                              setLikeList((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  1,
                                  ...old.slice(idx + 1),
                                ];
                              });
                              setLikeArr((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  likeArr[idx] + 1,
                                  ...old.slice(idx + 1),
                                ];
                              });
                            }}
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        )}
                      </Likes>
                    </div>
                  </div>
                )}
                {p.type === "left" && (
                  <div>
                    <div style={{ display: "flex" }}>
                      <TextView style={{ height: "310px" }}>
                        {p.contents}
                      </TextView>
                      <div
                        style={{
                          width: "320px",
                          height: "350px",
                          overflow: "hidden",
                          marginLeft: "5px",
                        }}
                      >
                        <img
                          onClick={() => {
                            navigate("/detail/" + idx, { state: p });
                          }}
                          style={{ marginLeft: "-85px" }}
                          width="auto"
                          height="340px"
                          src={p.image}
                        ></img>
                      </div>
                    </div>
                    <Likes>
                      {p.likeCount + likeArr[idx]}
                      {likelist[idx] ? (
                        <FaHeart
                          onClick={() => {
                            setLikeList((old) => {
                              return [
                                ...old.slice(0, idx),
                                0,
                                ...old.slice(idx + 1),
                              ];
                            });
                            setLikeArr((old) => {
                              return [
                                ...old.slice(0, idx),
                                likeArr[idx] - 1,
                                ...old.slice(idx + 1),
                              ];
                            });
                          }}
                          style={{ color: "red", marginRight: "4px" }}
                        />
                      ) : (
                        <FaRegHeart
                          onClick={() => {
                            setLikeList((old) => {
                              return [
                                ...old.slice(0, idx),
                                1,
                                ...old.slice(idx + 1),
                              ];
                            });
                            setLikeArr((old) => {
                              return [
                                ...old.slice(0, idx),
                                likeArr[idx] + 1,
                                ...old.slice(idx + 1),
                              ];
                            });
                          }}
                          style={{ color: "red", marginRight: "4px" }}
                        />
                      )}
                    </Likes>
                  </div>
                )}
              </PostDiv>
            </li>
          ))}
      
        </ul>
                        
      </HomeDiv>
    </>
  );

  // const postlist = useRecoilValue(postList);
}

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
const Button = styled.button`
width: 80px;
  height: 35px;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #ddd;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-left: 5px;
  }

&:hover {
  background-color: #2EE59D;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
`
export default Home;
