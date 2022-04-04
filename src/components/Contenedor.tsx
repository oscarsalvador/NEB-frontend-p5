import React, {FC, useState, useEffect} from "react"
import { gql, useQuery } from "@apollo/client";
import { Policies } from "@apollo/client/cache";
import Rotador from "./Rotador";

//el tipo es igual que la query
type Characters = {
	characters: {
		info: {
			pages: number
		}
		results: Array<{
			name: string,
			status: string
		}>
	}
}

//las mayusculas son por tradicion, es una variable normal y corriente
const GET_CHARATERS = gql`
	query characters($page: Int){
		characters(page: $page){
			info{
				pages
			},
			results{
				name,
				status
			}
		}
	}
`;

const Contenedor:FC = () =>{
	const [pagina, setPagina] = useState<Number>(1);

	//este hook ejecuta la query, y mientras se este ejecutando loading estará a true, data y error undefined. Si se ha ejecutado correctamente, loading y error lo pone a false. Si mal, loading false, error true
	//podria ser {data: miData ...} los nomrbes son los que devuelve la query, pero puedes usar el : miNombre para darle el que quieras
	const {data, loading, error, refetch} = useQuery<Characters>(GET_CHARATERS, {
		variables: {
			page: pagina
		},
		fetchPolicy: "cache-and-network"		
	});


	if(loading) return <div>Cargando</div>	;
	if(error){
		console.log(error.message);
		return <div>Error</div>;
	}	

	
		const nextPag = () => {
			let pag = +pagina + +1;
			if(pagina < data!.characters.info.pages){
				setPagina(pag)
			}
			console.log(pag)
		}
		const prevPag = () => {
			let pag = +pagina - +1;
			if(pagina > 2){
				setPagina(pag)
			}
			console.log(pag)
		}



	return <div>
			{data?.characters.results.map((c, index) => (//prestar atencion a este (), si no esta pintando, comprobar que no estoy usando {}
				<li key={c.name + index}>{c.name}, {c.status}</li>
			))}
			<button onClick={prevPag}>Prev</button>
			<button onClick={nextPag}>Next</button>
			<Rotador/>
		</div>
};

export default Contenedor;