import React from "react";
import * as AiIcons from "react-icons/ai";
import styled from "styled-components";

function Rating({ rating, onClick }) {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <Wrapper keys={index} onClick={() => onClick(index)}>
          {rating > index ? (
            <AiIcons.AiFillStar style={{ fontSize: "15px" }} />
          ) : (
            <AiIcons.AiOutlineStar style={{ fontSize: "15px" }} />
          )}
        </Wrapper>
      ))}
    </>
  );
}

export default Rating;

const Wrapper = styled.span``;
