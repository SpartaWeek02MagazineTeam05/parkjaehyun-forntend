import styled from "styled-components";
import Post from "./post";
import { useRecoilValue } from "recoil";
import { postList } from "./components/atoms";

const Home = () => {
  const postlist = useRecoilValue(postList);
  const posts = postlist.map((post) => (
    <li key={post.postId}>
      <Post {...post} />
    </li>
  ));
  return (
    <>
      <HomeDiv>
        <ul>{posts}</ul>
      </HomeDiv>
    </>
  );
};

const HomeDiv = styled.div`
  display: flex;
  /* width: 800px; */
`;

const Div = styled.h1``;
export default Home;
