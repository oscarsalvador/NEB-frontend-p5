import { access } from "fs";
import REact, {FC} from "react";
import { Cocktail } from "../types";

const Ingrediente: FC<{cocktail: Cocktail}> = ({cocktail}) =>{
  const arrayOfIngredientes = (cocktail: Cocktail): Array<string> =>{
    return Object.keys(cocktail).reduce((acc: string[], c: string) => {
      if(c.includes("ingredient") && (cocktail as any)[c]) 
        acc.push((cocktail as any)[c]);
      return acc;
    }, [])
  }
  ///que cojones es el reduce?
  /*
  reduce se aplica a un aray. Genera dos parametros, el acumulador, que podría ser un 
  indice numerico en otros, y el c que es el valor del array.

  si la clave tiene ingrediente y no esta vacio, lo mete en el array c

  const a = [1,2,3,4,5,6]
  const b = a.reduce((acc:number, n: number) => {
    if(n%2 == 0) acc++;
    return acc;
  }, 0);

  el acumulador tiene el total de numeros que son pares en el array
  */

  const ingredientes = arrayOfIngredientes(cocktail);
  return (
    <div>

    </div>
  )
}

export default Ingrediente;