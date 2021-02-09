import React, { useState, useEffect, useContext } from "react";
import './PlantCSS.css';
import { useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import { PlantContext } from '../context/PlantContext';
import styled from "styled-components";

const initialPlant = {
  nickname: '',
  species: '',
  h2o_frequency: ''
}

const PlantPost = props => {
// const PlantPost = () => {
  const { plants } = useContext(PlantContext)
  // console.log('PlantPost.js plants', props.plants)
  console.log('PlantPost.js plants', plants)
  const id = localStorage.getItem('id')
  console.log('PlantCard.sj id', id)

  const [editing, setEditing] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState(initialPlant)
  const [plant, setPlant] = useState(null)
  const params = useParams()
  console.log('PlantPost.js params', params)

  const editPlant = plant => {
      setEditing(true);
      setPlantToEdit(plant)
  }
  console.log('plant to edit state', plantToEdit)
  
  const saveEdit = e => {
      e.preventDefault();
      {props.plants.map(plant=>{
      // {plants.map(plant=>{
      axiosWithAuth()
          .put(`/plants/${id}/${plant.plant_id}`, plantToEdit)
          .then(res=>{
              console.log('aw: UpdatePlant.js: saveEdit: .put: res',res)
              setPlantToEdit(res.data)
              document.location.reload(true)
          })
          .catch(err=>
            console.log('aw: UpdatePlant.js: saveEdit: .put: err', err.message, err.response)
            )
        })}
  }

  console.log('props.plants', props.plants)
  const deletePlant = () => {
    {props.plants.map(plant=>{
    // {plants.map(plant=>{
    axiosWithAuth()
      .delete(`/plants/${id}/${plantToEdit.plant_id}`)
      .then(res=>{
        console.log('PlantCards.js deletePlant: .delete: res', res.data)
        document.location.reload(true)
      })
      .catch(err=>{
        console.log('PlantCards.js: deletePlant: .delete: err: ', err.message, err.response)
      })
  })}
  }
  console.log('plants context', plants)

  return (
    <div className="plantPost">
      <div className="edit">
      {editing && (
        <form onSubmit={saveEdit} className="editForm">
          <legend className="plantEditName">Edit Plant</legend>
          <label>
            Plant Name:
            <input
              onChange={e=>
                setPlantToEdit({...plantToEdit, nickname: e.target.value})
              }
              value={plantToEdit.nickname}
              />
          </label>
          <br />
          <label>
            Plant Species:
            <input
              onChange={e=>
                setPlantToEdit({...plantToEdit, species: e.target.value})
              }
              value={plantToEdit.species}
              />
          </label>
          <br />
          <label>
            Watering Frequency:
            <input
              onChange={e=>
                setPlantToEdit({...plantToEdit, h2o_frequency: e.target.value})
              }
              value={plantToEdit.h2o_frequency}
              />
          </label>
          <br />
          <div>
            <button type="submit">Save</button>
            <br />
            <button onClick={()=> setEditing(false)}>Cancel</button>
            <br />
            <button onClick={deletePlant}>Delete Plant</button>
          </div>
        </form>
      )}
      </div>
      <div className="plantPost2">
      {props.plants.map(plant => (
        <div className="plantCards" key={plant.id}>
            <p id="nickname">{plant.nickname}</p>
            <p id="species">{plant.species}</p>
            <p id="water">{plant.h2o_frequency}</p>
            <button onClick={()=>editPlant(plant)}>Edit</button>
        </div>
      
      ))}
      </div>
    </div>
  );
};

export default PlantPost;

