import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaRegHeart } from "react-icons/fa";

import {
  IimgCategories,
  imgCategoryState,
  isLogin,
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
  let cookie = document.cookie;
  console.log(cookie);
  const nick = cookie.split(" ")[1].split("=").pop();
  // const imgInput = useRef<HTMLInputElement>(0)
  const navigate = useNavigate();
  const [category, setCategory] = useRecoilState(imgCategoryState);
  const islogin = useRecoilValue(isLogin);
  const userinfo = useRecoilValue(userInfo);
  console.log("userINFO", userinfo);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any);
  };
  const [files, setFiles] = useState<FileList | null>(null);
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("aaa");
    const file = e.target.files;
    setFiles(file);
    console.log(file);
    // imgInput.current.click()
  };
  const [imgSrc, setImgSrc] = useState("");

  const saveImg = () => {
    const formdata = new FormData();
    if (files) {
      formdata.append("uploadImage", files[0]);
    }
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    // axios.post('api',formdata,config)
  };
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
  async function onValid(data: IPostUpload) {
    await axios
      .post("/api/register", {
        nickName: userinfo[0].nickName,
        image: data.image,
        contents: data.contents,
      })
      .then((res) => {
        if (res.data.result) {
          alert(res.data.msg);
        } else {
          alert("비밀번호 일치여부를 확인해주세요");
        }
      })
      .catch(() => alert("회원가입에 문제가 발생했습니다."));
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
      {/* <div
        className="img__box"
        style={{ width: "200px", height: "220px" }}
      ></div> */}
      <RegisterDiv>
        <RegisterTitle>포스트작성</RegisterTitle>

        <form onSubmit={handleSubmit(onValid)}>
          <h5>이미지</h5>
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

          {/* <input
            id="imgae"
            accept="image/*"
            placeholder="이메일형식으로 입력하세요"
            type="file"
            // onChange={uploadFile}
            {...register("image", {
              onChange: uploadFile,
            })}
          ></input>
          <label htmlFor="imgae"> 파일 선택하기 </label>
          <button onClick={saveImg}></button> */}
          <h5>이미지경로</h5>

          <Input
            placeholder="이미지 경로를 입력해주세요"
            style={{ height: "30px" }}
            {...register("image", {
              required: "이미지 경로를 입력해주세요",

              // onBlur: (e) => userNickNameValid(e),
              minLength: 4,
            })}
          ></Input>

          <h5>내용</h5>

          <Input
            placeholder="게시글을 작성해주세요"
            {...register("contents", {
              required: "게시글을 입력해주세요",
              // onBlur: (e) => userNickNameValid(e),
              minLength: 4,
            })}
          ></Input>

          <h5>사진 위치</h5>

          <select
            {...register("category" as any, {
              value: category,
              // onInput: onInput
            })}
            onInput={onInput}
          >
            <option value={IimgCategories.FULL}>Full</option>
            <option value={IimgCategories.RIGHT}>Right</option>
            <option value={IimgCategories.LEFT}>Left</option>
          </select>

          <Button>포스팅하기!</Button>
        </form>
      </RegisterDiv>

      {/* {isLogin && userInfo ? <NonLoginDiv>로그인 후 이용해주세요!</NonLoginDiv>: ""} */}
      {watch().category === "0" && "dsf"}
      <RegisterDiv style={{ width: "400px" }}>
        <PostView>미리보기</PostView>
        <h4>작성자 : {nick}</h4>
        <img
          width="380px"
          src={watch().image}
          alt="여기에 이미지가 표시됩니다."
        ></img>
        <Likes>
          0
          <FaRegHeart style={{ color: "red", marginRight: "4px" }} />
        </Likes>
        <TextView>{watch().contents}</TextView>
      </RegisterDiv>
    </FlexDiv>
  );
};

const RegisterDiv = styled.div`
  margin: 30px;

  width: 300px;
  background-color: #d9d5d4;
  border-radius: 20px;
  padding: 20px;
  padding-left: 45px;
  box-shadow: 1px 1px 1px gray;
`;
const RegisterTitle = styled.h2``;
const InputDiv = styled.div`
  height: 60px;
`;
const Input = styled.input`
  border-radius: 20px;
  border: 0;
  height: 130px;
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
  height: 140px;
  margin-top: 10px;
`;
export default MakePost;
