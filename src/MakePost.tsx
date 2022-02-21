import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  IimgCategories,
  imgCategoryState,
  isLogin,
  userInfo,
} from "./components/atoms";
import { useNavigate } from "react-router";
import { useRef } from "react";

interface IForm {
  userId: string;
  image: string;
  contents: string;
}

interface IPostUpload {
  userId: string;
  image: string;
  contents: string;
}

const MakePost = () => {
  // const imgInput = useRef<HTMLInputElement>(0)
  const navigate = useNavigate();
  const [category, setCategory] = useRecoilState(imgCategoryState);
  const islogin = useRecoilValue(isLogin);
  const userinfo = useRecoilValue(userInfo);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any);
  };
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.currentTarget.files;
    console.log(img);
    // imgInput.current.click()
  };
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

  console.log(watch());

  return (
    <FlexDiv>
      <RegisterDiv>
        <RegisterTitle>포스트작성</RegisterTitle>

        <form onSubmit={handleSubmit(onValid)}>
          <h5>이미지</h5>
          <InputDiv>
            <input
              accept="image/*"
              placeholder="이메일형식으로 입력하세요"
              type="file"
              {...register("image", {
                onChange: uploadFile,
              })}
            ></input>
          </InputDiv>
          <h5>내용</h5>

            <Input
              placeholder="게시글을 작성해주세요"
              {...register("contents", {
                required: "게시글을 입력해주세요",
                // onBlur: (e) => userNickNameValid(e),
                minLength: 4,
              })}
            ></Input>
            <ErrorMessage></ErrorMessage>

          <h5>사진 위치</h5>
          <select value={category} onInput={onInput}>
            <option value={IimgCategories.FULL}>Full</option>
            <option value={IimgCategories.RIGHT}>Right</option>
            <option value={IimgCategories.LEFT}>Left</option>
          </select>

          <Button>포스팅하기!</Button>
        </form>
      </RegisterDiv>
      {/* {isLogin && userInfo ? <NonLoginDiv>로그인 후 이용해주세요!</NonLoginDiv>: ""} */}
    </FlexDiv>
  );
};

const RegisterDiv = styled.div`
  margin-top: 30px;
  
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
export default MakePost;
