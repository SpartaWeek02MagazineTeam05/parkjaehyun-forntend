import styled from "styled-components";
import Post from "./post";
import { useRecoilValue } from "recoil";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { postListAtom } from "./components/atoms";

// interface Ipost {
//   Id: number;
//   nickName: string;
//   contents: string;
//   likeCount: number;
//   image: string;
//   type: string;
//   createdAt: string;
//   modifiedAt: string;
// }

function Home() {
  const [postlist, setPostlist] = useState([]);
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
          {postlist.map((post: any) => (
            <li key={post.Id}>
              <Post {...post} />
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
export default Home;
