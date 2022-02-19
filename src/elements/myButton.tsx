import React from "react";
import styled from "styled-components";

interface IButton {
  height: string;
  width: string;
  margin: string;
  padding: string;
  bg: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  cursor: string;
}

const MyButton = (props: IButton) => {
  const { height, width, margin, padding, bg, children, onClick, cursor } =
    props;

  const styles = {
    height,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    onClick,
    cursor: cursor,
  };
  return (
    <React.Fragment>
      <DButton {...styles}>{children}</DButton>
    </React.Fragment>
  );
};

MyButton.defaultProps = {
  chidren: null,
  height: null,
  width: null,
  padding: false,
  margin: false,
  bg: false,
  cursor: null,
};

const DButton = styled.button`
  width: ${(props: IButton) => props.width};
  height: ${(props) => props.height};

  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

export default MyButton;
