import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface IForm {
  nickName: string;
  userName: string;
  password: string;
  userPwdCheck: string;
}

interface IRegister {
  password: string;
  userPwdCheck: string;
  userName: string;
  nickName: string;
}

const RegisterForm = () => {
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
  async function onValid(data: IRegister) {
    if (data.password !== data.userPwdCheck) {
      setError('userPwdCheck', { message: '비밀번호가 일치하지 않습니다.' }, { shouldFocus: true });
    } else {
      await axios
        .post('/api/register', {
          userName: data.userName,
          password: data.password,
          userPwdCheck: data.userPwdCheck,
          nickName: data.nickName,
        })
        .then((res) => {
          if (res.data.result) {
            alert(res.data.msg);
          } else {
            alert('비밀번호 일치여부를 확인해주세요');
          }
        })
        .catch(() => alert('회원가입에 문제가 발생했습니다.'));
    }
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
        <RegisterTitle>회원가입</RegisterTitle>

        <form onSubmit={handleSubmit(onValid)}>
          <h5>아이디</h5>
          <InputDiv>
            <Input
              placeholder="이메일형식으로 입력하세요"
              {...register('userName', {
                required: '아이디를 입력해주세요',
                // onBlur: (e) => userNameValid(e),
                minLength: 4,
                pattern: {
                  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            ></Input>
            <ErrorMessage>{errors?.userName?.message}</ErrorMessage>
            <ErrorMessage>
              {/* {isUserNameValid
            ? "사용 가능한 아이디입니다."
            : "이미 존재하는 아이디입니다."} */}
            </ErrorMessage>
          </InputDiv>
          <h5>닉네임</h5>
          <InputDiv>
            <Input
              placeholder="닉네임을 입력하세요"
              {...register('nickName', {
                required: '닉네임을 입력해주세요',
                // onBlur: (e) => userNickNameValid(e),
                minLength: 4,
              })}
            ></Input>
            <ErrorMessage>{errors ? errors?.nickName?.message : ''}</ErrorMessage>
            <ErrorMessage>
              {/* {isNickNameValid
            ? "사용 가능한 닉네임입니다."
          : "이미 존재하는 닉네임입니다."} */}
            </ErrorMessage>
          </InputDiv>

          <h5>비밀번호</h5>
          <InputDiv>
            <Input
              placeholder="비밀번호를 입력하세요"
              {...register('password', {
                required: '비밀번호를 입력하세요',
                minLength: 4,
              })}
            ></Input>

            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          </InputDiv>

          <h5>비밀번호 확인</h5>
          <InputDiv>
            <Input
              placeholder="비밀번호를 다시 입력하세요"
              {...register('userPwdCheck', {
                required: '비밀번호를 한번 더 입력하세요',
                minLength: 4,
              })}
            ></Input>

            <ErrorMessage>{errors?.userPwdCheck?.message}</ErrorMessage>
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
