import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLogin } from "./components/atoms";
import { MyGrid, MyText, MyButton } from "./elements/Elements";
import { getCookie } from "./shared/Cookie";


const Header = () => {
  const [islogin,setIslogin] = useRecoilState(isLogin)
  useEffect(()=>{
    let cookie = getCookie(document.cookie)
    console.log("dd",document.cookie,cookie)


    if(cookie){
      setIslogin(1)
    } else{
      setIslogin(0)
    }
  },[])

  function a(){}

  if (islogin) {
    return (
      <React.Fragment>
        <MyGrid is_flex padding="4px 16px">
          <MyGrid>
            <MyText margin="0px" size="24px" bold>
              Fivegram
            </MyText>
          </MyGrid>

          <MyGrid is_flex>
            <MyButton onClick={a}>내정보</MyButton>
            <MyButton onClick={a}>알림</MyButton>
            <MyButton onClick={a}>로그아웃</MyButton>
          </MyGrid>
        </MyGrid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <MyGrid is_flex padding="4px 16px">
        <MyGrid>
          <MyText margin="0px" size="24px" bold>
            Fivegram
          </MyText>
        </MyGrid>

        <MyGrid is_flex>
          <Link to="/login">
          <MyButton onClick={a}>로그인</MyButton>
          </Link>
          <Link to="/register">

          <MyButton onClick={a}>회원가입</MyButton>
          </Link>

        </MyGrid>
      </MyGrid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;

