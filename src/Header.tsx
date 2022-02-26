import React from "react";
import styled from 'styled-components';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { isLogin, userInfo } from "./components/atoms";
import { MyGrid, MyText, MyButton } from "./elements/Elements";
import { deleteCookie, getCookie } from "./shared/Cookie";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate()
  const [islogin, setIslogin] = useRecoilState(isLogin);
  const [userinfo,setUserInfo] = useRecoilState(userInfo);



  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIslogin(1);
    } else {
      setIslogin(0);
    }
  }, []);


  function a() {}
  const logout = async () => {
    // deleteCookie("username")
    // deleteCookie("nickName")
    sessionStorage.removeItem("nickName")
    sessionStorage.removeItem("token")
    await axios
    .post('/api/logout')
    .then((res) => {
      if (res.data.result) {
        // alert(res.data.msg);
        console.log(res.data)

      } else {
        console.log(res)
        alert("로그아웃에 실패했습니다.");
      }
    })
    .catch(() => alert('회원가입에 문제가 발생했습니다.'));
    window.location.replace("/")
    // navigate("/")
  }


  console.log(islogin,userinfo[0])
  
  if (islogin) {
    return (
      <React.Fragment>
        <MyGrid is_flex padding="4px 16px">
          <MyGrid>
            <div style={{ width: "100px" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Fivegram>
                  <span>

                  Fivegram
                  </span>
                </Fivegram>
              </Link>
            </div>
          </MyGrid>

          <MyGrid is_flex>
            <Link to="/makepost">
            <MyButtons onClick={a}>포스팅하기</MyButtons>
            </Link>
            <MyButtons onClick={a}>내 정보</MyButtons>
            <MyButtons onClick={a}>알림</MyButtons>
            <MyButtons onClick={logout}>로그아웃</MyButtons>
          </MyGrid>
        </MyGrid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <MyGrid is_flex padding="4px 16px">
        <MyGrid>
          <div style={{ width: "100px" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <MyText margin="0px" size="24px" bold>
                Fivegram
              </MyText>
            </Link>
          </div>
        </MyGrid>

        <MyGrid is_flex>
          <Link to="/login">
            <MyButtons>로그인</MyButtons>
          </Link>
          <Link to="/register">
            <MyButtons>
              회원가입
            </MyButtons>
          </Link>
        </MyGrid>
      </MyGrid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

const MyButtons = styled.button`

  background:#1AAB8A;
  color:#fff;
  border:none;
  position:relative;
  height:60px;
  font-size:0.9em;
  padding:0 2em;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
  &:hover{
    background:#fff;
  color:#1AAB8A;
  }
  &:before,&:after{
    content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: #1AAB8A;
  transition:400ms ease all;
  }
  &:after{
    right:inherit;
  top:inherit;
  left:0;
  bottom:0;
  }
  &:hover:before,&:hover:after{
    width:100%;
  transition:800ms ease all;
  }
`
const Fivegram = styled.button`
 width: 160px;
  height: 70px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;

  background: rgb(247,150,192);
background: radial-gradient(circle, rgba(247,150,192,1) 0%, rgba(118,174,241,1) 100%);
  line-height: 42px;
  padding: 0;
  border: none;

& span {
  position: relative;
  font-size: 25px;
  letter-spacing: 2px;
  width: 100%;
  height: 100%;
}
&:before,
&:after {
  position: absolute;
  content: "";
  height: 0%;
  width: 1px;
 box-shadow:
   -1px -1px 20px 0px rgba(255,255,255,1),
   -4px -4px 5px 0px rgba(255,255,255,1),
   7px 7px 20px 0px rgba(0,0,0,.4),
   4px 4px 5px 0px rgba(0,0,0,.3);
}
&:before {
  right: 0;
  top: 0;
  transition: all 500ms ease;
}
&:after {
  left: 0;
  bottom: 0;
  transition: all 500ms ease;
}
&:hover{
  background: transparent;
  color: #76aef1;
  box-shadow: none;
}
&:hover:before {
  transition: all 500ms ease;
  height: 100%;
}
&:hover:after {
  transition: all 500ms ease;
  height: 100%;
}
& span:before,
& span:after {
  position: absolute;
  content: "";
  box-shadow:
   -1px -1px 20px 0px rgba(255,255,255,1),
   -4px -4px 5px 0px rgba(255,255,255,1),
   7px 7px 20px 0px rgba(0,0,0,.4),
   4px 4px 5px 0px rgba(0,0,0,.3);
}
& span:before {
  left: 0;
  top: 0;
  width: 0%;
  height: .5px;
  transition: all 500ms ease;
}
& span:after {
  right: 0;
  bottom: 0;
  width: 0%;
  height: .5px;
  transition: all 500ms ease;
}
& span:hover:before {
  width: 100%;
}
& span:hover:after {
  width: 100%;
}

`


export default Header;
