import React, { useState, useEffect } from 'react';
import PlantPost from './PlantPost';
import PlantForm from './PlantForm';
import './PlantCSS.css';
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';
import { PlantContext } from '../context/PlantContext';

const StyledForm = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCards = styled.div`
  display: flex;
`;

export default function PlantCards(props) {
  const [plant, setPlant] = useState([])
  const [plants, setPlants] = useState([]);
  const id = localStorage.getItem('id')
  console.log('PlantCard.sj id', id)

  useEffect(() => {
    axiosWithAuth()
      .get(`/plants/${id}`)
      .then(res=>{
        console.log('aw: PlantCards.js: getPlantList: .get: res: ', res.data)
        setPlants(res.data)
      })
      .catch(err=>console.log('aw: PlantCards.js: getPlantList: .get: err: ', err.message, err.response))
  }, [])

  console.log('aw: plantCards.js: plant', plant)

  const addNewPlant = plantObjParam => {
    setPlant([...plant, { ...plantObjParam, id: Date.now() }])
  }

  console.log('plantcard.js plants', plants)

  return (
    <div className='plants'>
      <PlantContext.Provider value={ plants }>
      <h2>Plant Cards</h2>
      <StyledForm>
        <PlantForm addNewPlant={addNewPlant} />
      </StyledForm>
      <StyledCards>
        <PlantPost plants={plants} />
      </StyledCards>
      </PlantContext.Provider>
    </div>
  )
}