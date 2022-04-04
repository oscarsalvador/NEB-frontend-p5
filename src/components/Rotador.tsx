import React, {FC, useEffect, useState} from "react"
import { Cocktail } from "../types"
import Ingrediente from "./Ingrediente";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import "./Rotador.css";



const Rotador: FC = () =>{

  return <div id="stage">
    <div id="spinner">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
    </div>
  </div>
}

export default Rotador;