import styled from "styled-components";

import { useRecoilState } from "recoil";

import { useEffect, useState } from "react";
import axios from "axios";
import { myLikeLists } from "./components/atoms";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { ReactQueryDevtools } from "react-query/devtools";
import { useMutation, useQuery } from "react-query";
function Home() {
  const navigate = useNavigate();
  const [postlist, setPostlist] = useState([]);

  const [likelist, setLikeList] = useRecoilState(myLikeLists);

  const [num, setNum] = useState(0);
  console.log("likelist : ", likelist);

  // const { isSuccess, data } = useQuery("data", async () => {
  //   await axios
  //     .post("/api/showpost", {
  //       userId: sessionStorage.getItem("userId"),
  //     })
  //     .then((res) => {
  //       console.log("homeres : ", res);
  //       const postlist = res.data.post;
  //       // const myLike = res.data.myLike;

  //       // setPostlist(postlist);
  //       // if (myLike) {
  //       //   setLikeList(myLike);
  //       // }
  //     });
  // });
  // console.log("homedata",data)
  useEffect(() => {
    console.log("updatePage" + num);
    getposts();
  }, [num]);
  const getposts = async () => {
    await axios
      .post(`${process.env.REACT_APP_DB_ROOT}/api/showpost`, {
        userId: sessionStorage.getItem("userId"),
      })
      .then((res) => {
        console.log("homeres : ", res);
        const postlist = res.data.total;
        const myLike = res.data.myLike;

        setPostlist(postlist);
        if (myLike) {
          setLikeList(myLike);
        }
      })
      .catch(() => alert("게시물이 없습니다."));
  };
  console.log(postlist);
  const clickLike = async (id: number) => {
    await axios
      .post(
        `${process.env.REACT_APP_DB_ROOT}/api/like`,
        {
          userId: sessionStorage.getItem("userId")
            ? sessionStorage.getItem("userId")
            : null,
          postId: id,
        },
        {
          headers: {
            "X-Auth-Token": `${sessionStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        setNum(num + 1);
        console.log("likeres : ", res);
      })
      .catch(() => {
        alert("좋으면 로그인부터 하셈");
        navigate("/login");
      });
  };
  console.log("db:",process.env.REACT_APP_DB_ROOT);
  async function deletePost(id: number) {
    await axios
      .delete(`${process.env.REACT_APP_DB_ROOT}/api/post`, {
        headers: {
          "X-Auth-Token": `${sessionStorage.getItem("token")}`,
          "content-type": "application/json",
        },
        data: {
          postId: id,
          userId: sessionStorage.getItem("userId"),
        },
      })
      .then((res) => {
        console.log("deleteres:", res);
        setNum(num + 1);
      })
      .catch(() => alert("삭제에 실패했습니다."));
  }
  function isLike(id: number) {
    for (let i = 0; i < likelist.length + 1; i++) {
      if (id === likelist[i]?.postId) {
        return true;
      }
    }
    return false;
  }
  // const { isLoading } = useMutation(getposts);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>

      <HomeDiv>
        <ul style={{ listStyle: "none" }}>
          {postlist?.map((p: any, idx: number) => (
            <li key={idx}>
              <PostDiv>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
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
                      <Button onClick={() => deletePost(p.id)}>삭제하기</Button>
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
                        {p.likeCount}
                        {isLike(p.id) ? (
                          <FaHeart
                            onClick={() => {
                              clickLike(p.id);
                            }}
                            style={{ color: "red", marginRight: "4px" }}
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() => {
                              clickLike(p.id);
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
                    <div style={{ width: "30px", height: "25px" }}></div>
                    <Likes>
                      {p.likeCount}
                      {isLike(p.id) ? (
                        <FaHeart
                          onClick={() => {
                            clickLike(p.id);
                          }}
                          style={{ color: "red", marginRight: "4px" }}
                        />
                      ) : (
                        <FaRegHeart
                          onClick={() => {
                            clickLike(p.id);
                          }}
                          style={{ color: "red", marginRight: "4px" }}
                        />
                      )}
                    </Likes>
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
                      {p.likeCount}
                      {isLike(p.id) ? (
                        <FaHeart
                          onClick={() => {
                            clickLike(p.id);
                          }}
                          style={{ color: "red", marginRight: "4px" }}
                        />
                      ) : (
                        <FaRegHeart
                          onClick={() => {
                            clickLike(p.id);
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
      <ReactQueryDevtools initialIsOpen />
    </>
  );
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
`;
export default Home;
