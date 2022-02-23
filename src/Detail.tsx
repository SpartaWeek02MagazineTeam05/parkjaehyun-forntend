import * as React from "react";
import { useParams } from "react-router";

const Detail = () => {
  const params = useParams()
  console.log("params",params)
  const index = params.idx;

  return <div></div>;
};

export default Detail;
