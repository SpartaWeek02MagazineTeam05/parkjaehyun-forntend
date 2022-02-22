import React from "react";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";

import { MyGrid, MyImage, MyText } from "./elements/Elements";
import { useRecoilValue } from "recoil";
import { IpostList } from "./components/atoms";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiLayoutColumnFill } from "react-icons/ri";
import styled from "styled-components";


interface Ipost {
  "Id":number,
  "nickName":string,
  "contents":string,
  "likeCount":number,
  "image":string,
  "type":string,
  "createdAt":string,
  "modifiedAt":string,
}
// const props = useRecoilValue(postList)
const Post = (p:Ipost) => {

  let cookie = document.cookie;
  const nick = cookie.split(" ")[1].split("=").pop();
  return (
    <React.Fragment>
      <PostDiv>
      <h4>작성자 : {nick}</h4>
        {p.type === "full" && (
          <>
            <img width="380px" src={p.image}></img>
            <Likes>
            {p.likeCount}
              
              <FaRegHeart style={{ color: "red", marginRight: "4px" }} />
            </Likes>
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
            <Likes>
              {p.likeCount}
              <FaRegHeart style={{ color: "red", marginRight: "4px" }} />
            </Likes>
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
            {p.likeCount}
              
              <FaRegHeart style={{ color: "red", marginRight: "4px" }} />
            </Likes>
          </>
        )}
      {/* <MyGrid>
        <MyGrid is_flex>
          <MyText bold>작성자 : {p.nickName}</MyText>
        </MyGrid>
        <MyGrid>
          <MyImage shape="rectangle" src={p.image} />
        </MyGrid>
        <MyGrid>
          <MyText>{p.contents}</MyText>
        </MyGrid>
        <MyGrid>
          <MyText bold>likes : {p.likeCount}</MyText>
        </MyGrid>
      </MyGrid> */}
      </PostDiv>
    </React.Fragment>
  );
};

const Likes = styled.div`
  display: flex;
  width: 380px;
  height: 20px;
  font-size: 20px;
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
`

Post.defaultProps = {
  user_info: {
    user_name: "mean0",
    user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  },
  image_url:
    "data:image/jpeg;base64,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",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
};

export default Post;
