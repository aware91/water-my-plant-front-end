import React, { useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth';

const initialPlant = {
    nickname: '',
    species: '',
    h2o_frequency: ''
}

const UpdatePlant = props => {
    console.log('PlantPost.js plants', props.plants)
    const id = localStorage.getItem('id')
    console.log('PlantCard.sj id', id)

    const [editing, setEditing] = useState(false);
    const [plantToEdit, setPlantToEdit] = useState(initialPlant)

    const editPlant = plant => {
        setEditing(true);
        setPlantToEdit(plant)
    }

    const saveEdit = e => {
        e.preventDefault();
        {props.plants.map(plant=>{
        axiosWithAuth()
            // .put(`/plants/${id}`, plantToEdit)
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

    return (
        <div>
            <h3>Edit Plant</h3>
            {editing && (
                <form onSubmit={saveEdit}>
                <legend>Edit Plant</legend>
                <label>
                    Plant nickname:
                    <input
                    onChange={e=>
                        setPlantToEdit({...plantToEdit, nickname: e.target.value})
                    }
                    value={plantToEdit.nickname}
                    />
                </label>
                <label>
                    Plant species:
                    <input
                    onChange={e=>
                        setPlantToEdit({...plantToEdit, species: e.target.value})
                    }
                    value={plantToEdit.species}
                    />
                </label>
                <label>
                    Plant h2o_frequency:
                    <input
                    onChange={e=>
                        setPlantToEdit({...plantToEdit, h2o_frequency: e.target.value})
                    }
                    value={plantToEdit.h2o_frequency}
                    />
                </label>
                <div>
                    <button type="submit">Save</button>
                    <button onClick={()=> setEditing(false)}>Cancel</button>
                </div>
                </form>
            )}
        </div>
    )
}

export default UpdatePlant;