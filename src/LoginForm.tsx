import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { setCookie } from "./shared/Cookie";
import { useSetRecoilState } from "recoil";
import { isLogin, userInfo } from "./components/atoms";
import { Link, useNavigate } from "react-router-dom";
// import api from "./mockapi"
interface IForm {
  username: string;
  password: string;
  nickName?: string;
}

interface ILogin {
  username: string;
  password: string;
  nickName?: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  let setLogin = useSetRecoilState(isLogin);
  let setUserInfo = useSetRecoilState(userInfo);
  // const [isUserNameValid, setIsUserNameValid] = useState(false);
  // const [isNickNameValid, setIsNickNameValid] = useState(false);

  // let seePassword = true;
  // let seeUserPwdCheck = true;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();
  async function onValid(data: ILogin) {
    // const auth = new URLSearchParams();
    // const auth = new FormData();
    // auth.append('username', data.username);
    // auth.append('password', data.password);
    // console.log(auth)
    await axios
      .post("/api/login", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res.data.result) {
          setCookie("username", res.data.username);
          setCookie("nickName", res.data.nickName);

          setLogin(1);
          setUserInfo(
            // console.log(res.data.username, res.data.nickName)
            [{ username: res.data.username, nickName: res.data.nickName }]
          );
          alert(res.data.message);
          navigate("/");
          console.log("success", res);
        } else {
          console.log("fail", res);
          alert(res.data.msg);

          // alert("비밀번호 일치여부를 확인해주세요");
        }
      })

      .catch(() => alert("로그인에 문제가 발생했습니다."));
  }

  // console.log(watch());

  // async function userNameValid(e) {

  //   await axios
  //     .post("/api/register/username", {
  //       userName: e.currentTarget.value,
  //     })
  //     .then((res) => {
  //       if (res.result) {
  //         setIsUserNameValid(false);
  //       } else {
  //         setIsUserNameValid(true);
  //       }
  //     });
  // }
  // async function userNickNameValid(e) {
  //   await axios
  //     .post("/api/register/nickname", {
  //       nickName: e.currentTarget.value,
  //     })
  //     .then((res) => {
  //       if (res.result) {
  //         setIsNickNameValid(false);
  //       } else {
  //         setIsNickNameValid(true);
  //       }
  //     });
  // }

  return (
    <FlexDiv>
      <RegisterDiv>
        <RegisterTitle>로그인</RegisterTitle>

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
            <ErrorMessage>
              {/* {isUserNameValid
            ? "사용 가능한 아이디입니다."
            : "이미 존재하는 아이디입니다."} */}
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

          <Button>로그인 완료!</Button>
        </form>
        <Link to="/register">
          <Button>회원가입 페이지로!</Button>
        </Link>
      </RegisterDiv>
    </FlexDiv>
  );
};

const RegisterDiv = styled.div`
  margin-top: 110px;
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
export default LoginForm;
