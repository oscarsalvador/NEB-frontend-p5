import React, {FC, useState} from "react"
import { Cocktail } from "../types"

const Lista: FC<{
  cocktails: Array<Cocktail>
  switchToDetail: (id: string)=> void
}> = ({cocktails, switchToDetail}) =>{
  return (
    <div>
      {cocktails.map(c =>(
        <div 
          key={c.idDrink}
          onClick={() => switchToDetail(c.idDrink)}
        >{
          c.strDrink
        }</div>
      ))}
    </div>
  )
}

export default Lista;