import React from "react";
import styled from "styled-components";


interface IText {
  bold:boolean;
  color:string;
  size:string;
  children:React.ReactNode;
  margin:string;
}

const myText = (props:IText) => {
  const { bold, color, size, children,margin } = props;

  const styles = {bold: bold, color: color, size: size, margin};
  return (
      <P {...styles}>
          {children}
      </P>
  )
};

myText.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
};

const P = styled.p`
  color: ${(props:IText) => props.color};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};

  font-weight: ${(props) => (props.bold? "600" : "400")};
`;

export default myText;