import React, {FC, useEffect, useState} from "react";
import { gql, useQuery } from '@apollo/client';
import styled from "@emotion/styled";

// const Localizacion = styled 
const dicc: {[K: string] : [V: string]} = {
  "Alive" : ["green"],
  "Dead" : ["Red"],
  "Unknown" : ["Black"]
};
const DetallesPersonaje = styled.div<{
  status: string
}>`
  text-align: center;
  & > a{
    color: ${(props) => dicc[props.status]}
  }  
`;
const MainDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const SubDiv = styled.div`
  padding: 30px;
`;
const MyTable = styled.table`
  border-collapse: collapse;
  th, td{
    padding: 10px;
    border: 1px solid;
  }
  tr:nth-of-type(even){
    background-color: azure;
  }
`;

type Detalles = {
  character: {
    image: string,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin?: {
      name: string,
      dimension: string,
      type: string,
    },
    location?: {
      name: string,
      dimension: string,
      type: string,
    },
    episode?: Array<{
      name: string,
      episode: string
    }>,
    created: string
  }
}

const GET_DETAILS = gql`
  query detalles(
    $id: ID!, 
    $skipOrigin: Boolean!
    $skipLocation: Boolean!,
    $skipEpisodes: Boolean!
  ){
    character(id: $id){
      image,
      name,
      status,
      species,
      type,
      gender,
      origin @skip(if: $skipOrigin){
        name,
        dimension,
        type
      },
      location @skip(if: $skipLocation){
        name,
        dimension,
        type
      },
      episode @skip(if: $skipEpisodes){
        name,
        episode
      },
      created
    }
  }
`;

const Personaje: FC<{
  charId: number,
  settings: {
    origin: boolean, 
    setSkipOrigin: (skip: boolean) => void,
    location: boolean, 
    setSkipLocation: (skip: boolean) => void,
    episodes:boolean
    setSkipEpisodes: (skip: boolean) => void,
  }
}> = (props) => {
  
  const {
    data, loading, error
  } = useQuery<Detalles>(GET_DETAILS, {
    variables: {
      id: props.charId,
      skipOrigin: props.settings.origin,
      skipLocation: props.settings.location,
      skipEpisodes: props.settings.episodes
    },
  });

  if (loading) return <div>Cargando Personaje</div>
  if (error){
    console.log(error.message);
    return <div>Error</div>
  } 
  if(!data) return <div>No encontrado</div>
  console.log(data)

  return <MainDiv>
    <SubDiv style={{width: "300px"}}>
      <img 
        src={data.character.image} alt="deberia haber una img"
        style={{
          width: "300px",
          height: "300px"
        }}
      />
      <DetallesPersonaje status={data.character.status}>
        <h2>{data.character.name}</h2>
        Status: <a>{data.character.status}</a> <br/>
        Species: {data.character.species || "--"} <br/>
        Type: {data.character.type || "--"} <br/>
        Gender: {data.character.gender || "--"} <br/>
        Created: {data.character.created}
      </DetallesPersonaje>
    </SubDiv>

    <SubDiv>
      <h3>Locations</h3>
      <div >
        <h4>
          Origin:
          <input 
            type="checkbox" 
            style={{float: "right"}}
            checked={!props.settings.origin}
            onChange={() => 
              props.settings.setSkipOrigin(!props.settings.origin)}
          />
        </h4> 
        {!props.settings.origin && data.character.origin? <div>
          Name: {data.character.origin.name}
          <ul>
            <li>Dimension: {data.character.origin.dimension || "--"}</li>
            <li>Type: {data.character.origin.type || "--"}</li>
          </ul>
        </div> : <div>
          Disabled
        </div>}
      </div>

      <br/>

      <div>
        <h4>
          Last known:
          <input 
            type="checkbox" 
            style={{float: "right"}}
            checked={!props.settings.location}
            onChange={() => 
              props.settings.setSkipLocation(!props.settings.location)}
          />
        </h4> 
        {!props.settings.location && data.character.location? <div> 
          Name: {data.character.location.name || "--"}
          <ul>
            <li>Dimension: {data.character.location.dimension || "--"}</li>
            <li>Type: {data.character.location.type || "--"}</li>
          </ul>
        </div> : <div>
          Disabled
        </div>}
      </div>
    </SubDiv>

    <SubDiv>
      <h3>
        Episodes
        <input 
          type="checkbox" 
          style={{float: "right"}}
          checked={!props.settings.episodes}
          onChange={() => 
            props.settings.setSkipEpisodes(!props.settings.episodes)}
        />
      </h3> 
      {!props.settings.episodes && data.character.episode?
        <MyTable><tbody>
          <tr>
            <th>Episode</th>
            <th>Name</th>
          </tr>
          {data.character.episode?.map(e =>(
            <tr key={e.episode}>
              <td>{e.episode}</td>
              <td>{e.name}</td>
            </tr>
          ))}
        </tbody></MyTable> : <div>
          Disabled
        </div>
      }
    </SubDiv>
  </MainDiv>
}


export default Personaje;