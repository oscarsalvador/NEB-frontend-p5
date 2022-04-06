import React, {FC, useState, useEffect} from "react"
import { gql, useQuery } from "@apollo/client";
import Rotador from "./Rotador";
import styled from "@emotion/styled";
import ReactModal from 'react-modal';
import Modal from "react-modal";
import Personaje from "./Personaje";
import App from "../App";

const Cabecera = styled.div`
	position: fixed;
	width: 100%;
	height: 40px;
	background: #555;
	color: white;

	display: flex;
	align-items: center;
	justify-content: center;
`;
const TextoCabecera = styled.span`
	padding: 5px;
	&:hover{
		font-weight: bold;
	}
`;
const ContieneChars = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`;
const TextoNombre = styled.div<{vive: boolean}>`
	text-align: center;
	max-width: 150px;
	& > a {
		color: ${(props) => props.vive? "green" : "red"};
	}
`;
//el tipo es igual que la query
type Charac = {
	image: string,
	name: string,
	status: string,
	id: number
}

type Characters = {
	characters: {
		info: {
			pages: number
		}
		results: Array<Charac>
	}
}

//las mayusculas son por tradicion, es una variable normal y corriente
const GET_CHARATERS = gql`
	query characters($page: Int){
		characters(page: $page){
			info{
				pages
			},
			results {
				image,
				name,
				status,
				id
			}
		}
	}
`;

// function Contenedor<FC>() {
const Contenedor: FC = () => {
	const [currPag, setCurrPag] = useState<number>(1);
	const [addPag, setAddPag] = useState<number>(1);
	const [showModal, setShowModal] = useState<boolean>(false)
	const [selectedChar, setSelectedChar] = useState<number>(1);
	
	const [characs, setCharacs] = useState<Array<Charac>>([]);

	const [skipOrigin, setSkipOrigin] = useState<boolean>(false);
	const [skipLocation, setSkipLocation] = useState<boolean>(false);
	const [skipEpisodes, setSkipEpisodes] = useState<boolean>(false);

	
	useEffect(() =>{
		window.addEventListener("scroll", (e: Event) =>{
			var {scrollTop, scrollHeight, clientHeight} = document.documentElement;
			console.log("manejando evento")
			if(scrollTop + clientHeight >= scrollHeight -5){
				console.log("close to bottom")
			}
		});
	}, 
		[]
	);
	useEffect(() =>{
		console.log(characs)
	}, 
		[characs]
	);
	//este hook ejecuta la query, y mientras se este ejecutando loading estará a true, data y error undefined. Si se ha ejecutado correctamente, loading y error lo pone a false. Si mal, loading false, error true
	//podria ser {data: miData ...} los nomrbes son los que devuelve la query, pero puedes usar el : miNombre para darle el que quieras

	const {
		data, loading, error, fetchMore
	} = useQuery<Characters>(GET_CHARATERS, {
		variables: {
			page: currPag, 
		},
		fetchPolicy: "cache-and-network",
		
		
	});

	// const updateQuery = (previousResult, {fetchMoreResult}) =>{
	// 	if(!fetchMoreResult) return previousResult;
	// 	return {
	// 		...previousResult,
	// 		books: [...previousResult.characters, ...fetchMoreResult.characters]
	// 	}
	// }

	//https://stackoverflow.com/questions/62536109/apollo-graphql-fetchmore
	const handleLoadMore = () => {
		fetchMore({
			variables: {
				page: addPag
			},
			updateQuery: (prev, {fetchMoreResult})  =>{
				if(!fetchMoreResult) return prev;
				return Object.assign({}, prev, {
					characters: [...prev.characters.results, ...fetchMoreResult.characters.results]
				})
			}
		})
	}

	if(loading) return <div>Cargando</div>	;
	if(error){
		console.log(error.message);
		return <div>Error</div>;
	}
	if(!data) {
		return <div>No encontrado</div>
	}
	
	// setCharacs(data.characters.results)
	
	function toggleShow(){
		setShowModal(!showModal);
	}

	// fetchMore({
	// 	variables: {
	// 		page: addPag,
	// 	},
	// 	updateQuery: ()
	// })
	

// 	const updateQuery = (previousResult: Characters, fetchMoreResult: Characters) => {
//     if (!fetchMoreResult) {
//         return previousResult;
//     }

//     const previousCharacs = data.characters.results;
//     const fetchMoreCharacs = fetchMoreResult.edges;

//     fetchMoreResult.edges = [...previousEdges, ...fetchMoreEdges];

//     return { ...fetchMoreResult }
// }




	return <div>
		<Modal
			isOpen={showModal}
			onRequestClose={toggleShow}
			contentLabel="modal para personajes"
		>
			<button 
				onClick={toggleShow}
				style={{float: "right"}}
			>
				Cerrar
			</button>

			<div>Nº {selectedChar}</div>

			<Personaje 
				charId={selectedChar}
				settings={{
					origin: skipOrigin, 
					setSkipOrigin: setSkipOrigin,
					location: skipLocation, 
					setSkipLocation: setSkipLocation,
					episodes: skipEpisodes,
					setSkipEpisodes: setSkipEpisodes
				}}
			/>
		</Modal>

		<Cabecera>
			{/* <Rotador> */}
				{currPag > 1? 
					<span>
						<TextoCabecera onClick={() => {
							setCurrPag(currPag -1)
							setCharacs([]);
						}}>Prev</TextoCabecera>
						<TextoCabecera onClick={() =>setCurrPag(1)}>1</TextoCabecera>
					</span>: null
				}

				{currPag > 2? "..." : ""}
				<TextoCabecera> ({currPag}) </TextoCabecera>
				{currPag < data.characters.info.pages -1? "..." : ""}

				{currPag < data.characters.info.pages? 
					<span>
						<TextoCabecera onClick={() =>setCurrPag(data.characters.info.pages)}>
							{data.characters.info.pages} </TextoCabecera>
						<TextoCabecera onClick={() => {
							handleLoadMore();
							setAddPag(addPag +1)
						}}>Next</TextoCabecera>
					</span>: null
				}
			{/* </Rotador> */}
		</Cabecera>
			<br/>
			<br/>

		<ContieneChars>
			{data.characters.results.map((c, index) => (//prestar atencion a este (), si no esta pintando, comprobar que no estoy usando {}
				<div key={c.name + index}
					style={{padding: "15px"}}
				>
					<img src={c.image} alt="deberia haber una imagen"
						style={{
							width: "150px",
							height: "150px"
						}}
						onClick={() => {
							setSelectedChar(c.id)
							setShowModal(true)
						}}
					/>
					<TextoNombre vive={c.status === "Alive"}>
						{c.name}
						<a>*</a>
					</TextoNombre>
				</div>
			))}
		</ContieneChars>



		<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/><br/>
			<br/><br/>
			<br/>
	</div>
};

export default Contenedor;