import {FC, useState, useEffect} from "react"
import { gql, useQuery } from "@apollo/client";
import Rotador from "./Rotador";
import styled from "@emotion/styled";
import Modal from "react-modal";
import Personaje from "./Personaje";

const Cabecera = styled.div`
	position: fixed;
	width: 100%;
	height: 40px;
	background: #555;
	color: white;

	display: flex;
	align-items: center;
	justify-content: center;
	.c{
		justify-content: center;
	}
`;
const PageDiv = styled.div<{ver: boolean}>`
	display: inline-block;
	visibility: ${(props) => props.ver? "visible" : "hidden"};
	width: 100px;
	text-align: center;
`;
const TextoCabecera = styled.span`
	padding: 5px;
	&:hover{
		font-weight: 800;
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


const Contenedor: FC = () => {
	const [currPag, setCurrPag] = useState<number>(1);
	const [addPag, setAddPag] = useState<number>(1);
	const [canAdd, setCanAdd] = useState<boolean>(false)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [selectedChar, setSelectedChar] = useState<number>(1);

	const [skipOrigin, setSkipOrigin] = useState<boolean>(false);
	const [skipLocation, setSkipLocation] = useState<boolean>(false);
	const [skipEpisodes, setSkipEpisodes] = useState<boolean>(false);

	
	useEffect(() =>{
		window.addEventListener("scroll", (e: Event) =>{
			var {scrollTop, scrollHeight, clientHeight} = document.documentElement;
			console.log("manejando evento")
			if(scrollTop + clientHeight >= scrollHeight -5){
				console.log("close to bottom")
				incrementaAddPag()
				setTimeout(() =>{
					window.scrollTo({
						top: document.documentElement.scrollHeight -window.outerHeight,
						behavior: 'smooth',
					});
				}, 1000)
			}
		});
	}, 
	[]
	);
	
	const incrementaAddPag = () =>{
		setCanAdd(true);
	}
	useEffect(() =>{
		if(canAdd) setAddPag(addPag +1);
	},
		[canAdd]
	);
	useEffect(() =>{
		setCanAdd(false);
		console.log(addPag);
		handleLoadMore();

	}, 
		[addPag]
	);
	useEffect(() =>{
		console.log(currPag)
		console.log(addPag)
		setAddPag(currPag)
	},
		[currPag]
	)


	const {
		data, loading, error, fetchMore
	} = useQuery<Characters>(GET_CHARATERS, {
		variables: {
			page: currPag, 
		},
		fetchPolicy: "cache-and-network",
	});


	const handleLoadMore = () => {
		console.log(addPag)
		fetchMore({
			variables: {
				page: addPag
			},
			updateQuery: (prev, {fetchMoreResult})  =>{
				if(!fetchMoreResult) return prev;
				console.log("AAAAAAAAAAAA")
				console.log(prev)
				console.log(fetchMoreResult)

				return Object.assign({}, prev, {
					characters: {
						info: 
							{...prev.characters.info}
							// fetchMoreResult.characters.info
						,
						results: 
							// fetchMoreResult.characters.results
						[...prev.characters.results, ...fetchMoreResult.characters.results]
						
					}
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
	
	
	function toggleShow(){
		setShowModal(!showModal);
	}



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
			<Rotador>
				<PageDiv ver={currPag > 1}>
					<TextoCabecera
						onClick={() => setCurrPag(currPag -1)}
					>Prev</TextoCabecera>

					<TextoCabecera
						onClick={() =>setCurrPag(1)}
					>1</TextoCabecera>

					{currPag > 2? "..." : ""}
				</PageDiv>

				<TextoCabecera>{currPag}</TextoCabecera>

				<PageDiv ver={currPag < data.characters.info.pages}>
					{currPag < data.characters.info.pages -1? "..." : ""}

					<TextoCabecera 
						onClick={() =>setCurrPag(data.characters.info.pages)}
					>{data.characters.info.pages} </TextoCabecera>

					<TextoCabecera
						onClick={() =>setCurrPag(currPag +1)}
					>Next</TextoCabecera>
				</PageDiv>
				</Rotador>
		</Cabecera>
			<br/>
			<br/>

		<ContieneChars>
			{data.characters.results.map((c, index) => (
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
	</div>
};

export default Contenedor;