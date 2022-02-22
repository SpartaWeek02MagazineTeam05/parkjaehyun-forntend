import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { isLogin, userInfo } from "./components/atoms";
import { MyGrid, MyText, MyButton } from "./elements/Elements";
import { deleteCookie, getCookie } from "./shared/Cookie";

const Header = () => {
  const navigate = useNavigate()
  const [islogin, setIslogin] = useRecoilState(isLogin);
  const [userinfo,setUserInfo] = useRecoilState(userInfo);

  let cookie = document.cookie;

  useEffect(() => {
    if (cookie) {
      setIslogin(1);
    } else {
      setIslogin(0);
    }
  }, []);


  function a() {}
  const logout = () => {



    deleteCookie("username")
    deleteCookie("nickName")
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
                <MyText margin="0px" size="24px" bold>
                  Fivegram
                </MyText>
              </Link>
            </div>
          </MyGrid>

          <MyGrid is_flex>
            <Link to="/makepost">
            <MyButton onClick={a}>포스팅하기</MyButton>
            </Link>
            <MyButton onClick={a}>내 정보</MyButton>
            <MyButton onClick={a}>알림</MyButton>
            <MyButton onClick={logout}>로그아웃</MyButton>
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
            <MyButton>로그인</MyButton>
          </Link>
          <Link to="/register">
            <MyButton cursor="pointer">
              회원가입
            </MyButton>
          </Link>
        </MyGrid>
      </MyGrid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
