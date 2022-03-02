import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IForm {
  username: string;
  nickName: string;
  password: string;
  passwordCheck: string;
}

interface IRegister {
  username: string;
  nickName: string;
  password: string;
  passwordCheck: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<IForm>();
  async function onValid(data: IRegister) {
    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "비밀번호가 일치지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      await axios
        .post(`${process.env.REACT_APP_DB_ROOT}/api/register`, {
          username: data.username,
          nickName: data.nickName,
          password: data.password,
          passwordCheck: data.passwordCheck,
        })
        .then((res) => {
          if (res.data.result) {
            alert(res.data.msg);
            navigate("/login");
          } else {
            console.log(res);
            alert(res.data.msg);
          }
        })
        .catch(() => alert("회원가입에 문제가 발생했습니다."));
    }
  }

  console.log(watch());

  return (
    <FlexDiv>
      <RegisterDiv>
        <RegisterTitle>회원가입</RegisterTitle>

        <form onSubmit={handleSubmit(onValid)}>
          <h5>아이디</h5>
          <InputDiv>
            <Input
              placeholder="이메일형식으로 입력하세요"
              {...register("username", {
                required: "아이디를 입력해주세요",
                // onBlur: (e) => userNameValid(e),
                minLength: 4,
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식이 아닙니다.",
                },
              })}
            ></Input>
            <ErrorMessage>{errors?.username?.message}</ErrorMessage>
          </InputDiv>
          <h5>닉네임</h5>
          <InputDiv>
            <Input
              placeholder="닉네임을 입력하세요"
              {...register("nickName", {
                required: "닉네임을 입력해주세요",

                minLength: 4,
              })}
            ></Input>
            <ErrorMessage>
              {errors ? errors?.nickName?.message : ""}
            </ErrorMessage>
          </InputDiv>

          <h5>비밀번호</h5>
          <InputDiv>
            <Input
              placeholder="비밀번호를 입력하세요"
              {...register("password", {
                required: "비밀번호를 입력하세요",
                minLength: 4,
              })}
            ></Input>

            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          </InputDiv>

          <h5>비밀번호 확인</h5>
          <InputDiv>
            <Input
              placeholder="비밀번호를 다시 입력하세요"
              {...register("passwordCheck", {
                required: "비밀번호를 한번 더 입력하세요",
                minLength: 4,
              })}
            ></Input>

            <ErrorMessage>{errors?.passwordCheck?.message}</ErrorMessage>
          </InputDiv>

          <Button>회원가입 완료!</Button>
        </form>
        <Link to="/login">
          <Button>로그인 페이지로!</Button>
        </Link>
      </RegisterDiv>
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
export default RegisterForm;
