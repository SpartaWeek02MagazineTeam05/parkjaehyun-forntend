import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { setCookie } from "./shared/Cookie";
import { useSetRecoilState } from "recoil";
import { isLogin, userInfo } from "./components/atoms";
import { Link, useNavigate } from "react-router-dom";
import { setSyntheticTrailingComments } from "typescript";
import { RiShieldCrossLine } from "react-icons/ri";
import jwt_decode from "jwt-decode";
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
      .post(
        `${process.env.REACT_APP_DB_ROOT}/api/login`,
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.result) {
          const tokenJSON: any = jwt_decode(res.data.tokenname);

          console.log("token : ", tokenJSON);
          // setCookie("username", res.data.username);
          // setCookie("nickName", res.data.nickName);
          sessionStorage.setItem("nickName", tokenJSON.nickName);
          sessionStorage.setItem("userId", tokenJSON.userId);
          sessionStorage.setItem("token", res.data.tokenname);
          console.log("login res : ", res);

          // axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data
          // axios.defaults.headers.common['X-AUTH-TOKEN'] = res.data.tokenname
          console.log("axios : ", axios.defaults);
          setLogin(1);
          // setUserInfo(
          //   // console.log(res.data.username, res.data.nickName)
          //   [{ username: data.username, nickName: res.data.nickName }]
          // );
          alert(res.data.msg);
          navigate("/");
          console.log("success", res);
        } else {
          console.log("fail", res);
          alert(res.data.msg);

          // alert("???????????? ??????????????? ??????????????????");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("???????????? ????????? ??????????????????.");
      });
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
        <RegisterTitle>?????????</RegisterTitle>

        <form onSubmit={handleSubmit(onValid)}>
          <h5>?????????</h5>
          <InputDiv>
            <Input
              placeholder="????????????????????? ???????????????"
              {...register("username", {
                required: "???????????? ??????????????????",
                // onBlur: (e) => userNameValid(e),
                minLength: 4,
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "????????? ????????? ????????????.",
                },
              })}
            ></Input>
            <ErrorMessage>{errors?.username?.message}</ErrorMessage>
            <ErrorMessage>
              {/* {isUserNameValid
            ? "?????? ????????? ??????????????????."
            : "?????? ???????????? ??????????????????."} */}
            </ErrorMessage>
          </InputDiv>

          <h5>????????????</h5>
          <InputDiv>
            <Input
              placeholder="??????????????? ???????????????"
              {...register("password", {
                required: "??????????????? ???????????????",
                minLength: 4,
              })}
            ></Input>

            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          </InputDiv>

          <Button>????????? ??????!</Button>
        </form>
        <Link to="/register">
          <Button>???????????? ????????????!</Button>
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
