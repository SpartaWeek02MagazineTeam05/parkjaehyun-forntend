import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { FaRegHeart } from "react-icons/fa";
import { RiLayoutColumnFill } from "react-icons/ri";

import {
  // IimgCategories,
  // imgCategoryState,
  isLogin,
  likeList,
  userInfo,
} from "./components/atoms";
import { useNavigate } from "react-router";

interface IForm {
  username: string;
  image: string;
  contents: string;
}

interface IPostUpload {
  username: string;
  image: string;
  contents: string;
}

const MakePost = () => {
  const [layout, setLayout] = useState("full");

  const nick = sessionStorage.getItem("nickName");

  const navigate = useNavigate();

  const islogin = useRecoilValue(isLogin);
  const userinfo = useRecoilValue(userInfo);
  console.log("userINFO", userinfo);

  const [files, setFiles] = useState<FileList | null>(null);
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("aaa");
    const file = e.target.files;
    setFiles(file);
    console.log(file);
    // imgInput.current.click()
  };
  const [imgSrc, setImgSrc] = useState("");

  // const saveImg = () => {
  //   const formdata = new FormData();
  //   if (files) {
  //     formdata.append("uploadImage", files[0]);
  //   }
  //   const config = {
  //     Headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   // axios.post('api',formdata,config)
  // };

  function full() {
    setLayout("full");
  }
  function right() {
    setLayout("right");
  }
  function left() {
    setLayout("left");
  }

  // @ts-ignore
  // useEffect(() => {
  //   preview();
  //   return () => preview();
  // });
  // const preview = () => {
  //   if (!files) return false;
  //   const imgEl = document.querySelector(".img__box");
  //   const reader = new FileReader();
  //   // @ts-ignore
  //   reader.onload = () => {
  //     const imageData = reader.result.split(",")[1];
  //   };
  //   reader.readAsDataURL(files[0]);
  // };
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<IForm>();
  const setlikelist = useSetRecoilState(likeList);
  async function onValid(data: IPostUpload) {
    await axios
      .post(
        `${process.env.REACT_APP_DB_ROOT}/api/post`,
        {
          nickName: sessionStorage.getItem("nickName"),
          image: data.image,
          contents: data.contents,
          type: layout,
        },
        {
          headers: {
            "X-Auth-Token": `${sessionStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.result) {
          alert(res.data.msg);
          setlikelist((likelist) => [0, ...likelist]);
          window.location.replace("/");
        } else {
          console.log(res);
          alert(res.data.msg);
          alert("???????????? ??????????????????.");
          window.location.replace("/login");
        }
      })

      .catch(() => alert("???????????? ????????? ??????????????????."));
  }
  console.log("reg", register);
  console.log(watch());
  console.log(watch().image);
  const [imageSrc, setImageSrc] = useState("");
  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        // @ts-ignore
        setImageSrc(reader.result);
        // @ts-ignore
        resolve();
      };
    });
  };

  return (
    <FlexDiv>
      <RegisterDiv>
        <div style={{ display: "flex", alignItems: "center" }}>
          <RegisterTitle>????????? ??????</RegisterTitle>

          <RiLayoutColumnFill
            onClick={full}
            style={
              layout === "full"
                ? { color: "red", fontSize: "34px", transform: "rotate(90deg)" }
                : { fontSize: "34px", transform: "rotate(90deg)" }
            }
          />
          <RiLayoutColumnFill
            onClick={right}
            style={
              layout === "right"
                ? { color: "red", fontSize: "34px" }
                : { fontSize: "34px" }
            }
          />
          <RiLayoutColumnFill
            onClick={left}
            style={
              layout === "left"
                ? {
                    color: "red",
                    fontSize: "34px",
                    transform: "rotate(180deg)",
                  }
                : { fontSize: "34px", transform: "rotate(180deg)" }
            }
          />
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <h5>?????????</h5>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) encodeFileToBase64(e.target.files[0]);
            }}
          />
          <div
            style={{ width: "270px", height: "220px", marginTop: "20px" }}
            className="preview"
          >
            {imageSrc && <img width="270px" src={imageSrc} alt="preview-img" />}
          </div>

          <h5>???????????????</h5>
          <InputDiv>
            <Input
              placeholder="????????? ????????? ??????????????????"
              style={{ height: "30px" }}
              {...register("image", {
                required: "????????? ????????? ??????????????????",
                minLength: 4,
              })}
            ></Input>
            <ErrorMessage>{errors?.image?.message}</ErrorMessage>
          </InputDiv>

          <h5>??????</h5>
          <InputDiv>
            <Input
              placeholder="???????????? ??????????????????"
              {...register("contents", {
                required: "???????????? ??????????????????",
                minLength: 4,
              })}
            ></Input>
            <ErrorMessage>{errors?.contents?.message}</ErrorMessage>
          </InputDiv>
          <Button>???????????????!</Button>
        </form>
      </RegisterDiv>

      {isLogin ? "" : <NonLoginDiv>????????? ??? ??????????????????!</NonLoginDiv>}

      <RegisterDiv style={{ width: "400px" }}>
        <PostView>????????????</PostView>
        <h4>????????? : {nick}</h4>
        {layout === "full" && (
          <>
            <img width="380px" src={watch().image}></img>
            <Likes>
              0
              <FaRegHeart style={{ color: "red", marginRight: "4px" }} />
            </Likes>
            <TextView>{watch().contents}</TextView>
          </>
        )}
        {layout === "right" && (
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
                  src={watch().image}
                ></img>
              </div>
              <TextView style={{ height: "310px" }}>
                {watch().contents}
              </TextView>
            </div>
            <Likes>
              0
              <FaRegHeart style={{ color: "red", marginRight: "4px" }} />
            </Likes>
          </>
        )}
        {layout === "left" && (
          <>
            <div style={{ display: "flex" }}>
              <TextView style={{ height: "310px" }}>
                {watch().contents}
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
                  src={watch().image}
                ></img>
              </div>
            </div>
            <Likes>
              0
              <FaRegHeart style={{ color: "red", marginRight: "4px" }} />
            </Likes>
          </>
        )}
      </RegisterDiv>
    </FlexDiv>
  );
};

const RegisterDiv = styled.div`
  margin: 30px;

  width: 300px;
  height: 700px;
  background-color: #d9d5d4;
  border-radius: 20px;
  padding: 20px;
  padding-left: 45px;
  box-shadow: 1px 1px 1px gray;
`;
const RegisterTitle = styled.h2`
  margin-right: 70px;
`;
const InputDiv = styled.div`
  height: 60px;
`;
const Input = styled.input`
  border-radius: 20px;
  border: 0;
  height: 30px;
  width: 260px;
  padding: 5px;
  padding-left: 14px;
  color: blue;
  cursor: pointer;
  box-shadow: 1px 1px 1px gray;
  &:hover {
    transition: 0.15s ease-in;
    transform: translateY(-3px);
    background-color: #dde8d8;
  }

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  font-size: 10px;
  color: red;
  margin-left: 20px;
`;

const Button = styled.button`
  &:hover {
    transition: 0.15s ease-in;
    transform: translateY(-3px);
    background-color: #dde8d8;
  }

  border-radius: 20px;
  border: none;
  margin-top: 18px;
  margin-left: 12px;
  background-color: pink;
  width: 250px;
  height: 30px;
  box-shadow: 1px 1px 1px gray;
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const NonLoginDiv = styled.div`
  display: flex;
  padding: 40px;
  position: fixed;
  background-color: pink;
  opacity: 0.5;
  font-size: 40px;
  height: 100vh;
  width: 100vw;
  left: 0;
`;

const PostView = styled.h2``;
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
export default MakePost;
