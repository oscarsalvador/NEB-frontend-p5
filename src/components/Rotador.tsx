import React, {FC, useEffect, useState} from "react"
import { Cocktail } from "../types"
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
// import "./Rotador.css";

const spin = keyframes`
  from {
    -moz-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  to {
    -moz-transform: rotateY(-360deg);
    -ms-transform: rotateY(-360deg);
    transform: rotateY(-360deg);
  }
`;
const Stage = styled.div`
  margin: 1em auto;
  -webkit-perspective: 1200px;
  -moz-perspective: 1200px;
  -ms-perspective: 1200px;
  perspective: 1200px;
`;
const Spinner = styled.div`
  -webkit-animation-name: ${spin};
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 6s;

  animation-name: ${spin};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 10s;

  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;

  &:hover {
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
  }
`;

const Rotador: FC = ({children}) =>{
  return <Stage>
    <Spinner>
      {children}
    </Spinner>
  </Stage>
  // return <div id="stage">
  //   <div id="spinner">
  //     <button>1</button>
  //     <button>2</button>
  //     <button>3</button>
  //     <button>4</button>
  //     <button>5</button>
  //     <button>6</button>
  //   </div>
  // </div>
}

export default Rotador;