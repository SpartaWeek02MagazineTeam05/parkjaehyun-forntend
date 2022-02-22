import styled from "styled-components";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { likeList, postListAtom } from "./components/atoms";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function Home() {

  const [postlist, setPostlist] = useState([]);
  const [likelist, setLikeList] = useRecoilState(likeList);
  let likeArrr = new Array(likelist.length).fill(0)
  const [likeArr, setLikeArr] = useState(likeArrr)


  useEffect(() => {
    getposts();
  }, []);
  const getposts = async () => {
    await axios
      .get("api/post")
      .then((res) => {
        console.log(res.data);
        const postlist = res.data.posts;
        return setPostlist(postlist);
      })
      .catch(() => alert("게시물이 없습니다."));
  };


  return (
    <>
      <HomeDiv>
        <ul>
          {postlist.map((p: any, idx: number) => (
            <li key={p.Id}>
              <PostDiv>
                <h4>작성자 : {p.nickName}</h4>
                {p.type === "full" && (
                  <>
                    <img width="380px" src={p.image}></img>
                    <div style={{ width: "30px", height: "25px" }}>
                      <Likes>
                        {p.likeCount + likeArr[idx]}
                        {likelist[idx] ? (
                          <FaHeart
                            onClick={() =>{
        
                              setLikeList((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  0,
                                  ...old.slice(idx + 1),
                                ];
                              })
                              setLikeArr((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  likeArr[idx]-1,
                                  ...old.slice(idx + 1),
                                ];
                              })
                            }
                            }
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() =>{
                              setLikeList((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  1,
                                  ...old.slice(idx + 1),
                                ];
                              })
                              setLikeArr((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  likeArr[idx]+1,
                                  ...old.slice(idx + 1),
                                ];
                              })
                            }
                            }
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        )}
                      </Likes>
                    </div>

                    <TextView>{p.contents}</TextView>
                  </>
                )}
                {p.type === "right" && (
                  <>
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
                      <TextView style={{ height: "310px" }}>
                        {p.contents}
                      </TextView>
                    </div>
                    <div style={{ width: "30px", height: "25px" }}>
                      <Likes>
                      {p.likeCount + likeArr[idx]}
                        {likelist[idx] ? (
                          <FaHeart
                            onClick={() =>{
        
                              setLikeList((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  0,
                                  ...old.slice(idx + 1),
                                ];
                              })
                              setLikeArr((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  likeArr[idx]-1,
                                  ...old.slice(idx + 1),
                                ];
                              })
                            }
                            }
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() =>{
                              setLikeList((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  1,
                                  ...old.slice(idx + 1),
                                ];
                              })
                              setLikeArr((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  likeArr[idx]+1,
                                  ...old.slice(idx + 1),
                                ];
                              })
                            }
                            }
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        )}
                      </Likes>
                    </div>
                  </>
                )}
                {p.type === "left" && (
                  <>
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
                            onClick={() =>{
        
                              setLikeList((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  0,
                                  ...old.slice(idx + 1),
                                ];
                              })
                              setLikeArr((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  likeArr[idx]-1,
                                  ...old.slice(idx + 1),
                                ];
                              })
                            }
                            }
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() =>{
                              setLikeList((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  1,
                                  ...old.slice(idx + 1),
                                ];
                              })
                              setLikeArr((old) => {
                                return [
                                  ...old.slice(0, idx),
                                  likeArr[idx]+1,
                                  ...old.slice(idx + 1),
                                ];
                              })
                            }
                            }
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        )}
                    </Likes>
                  </>
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

export default Home;
