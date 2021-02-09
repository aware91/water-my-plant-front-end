import React, { useState } from "react";
import './PlantCSS.css';
import axiosWithAuth from '../utils/axiosWithAuth'

const PlantForm = props => {
    const [plants, setPlants] = useState({
        nickname: "",
        species: "",
        h2o_frequency: ""
    });

    const handleChanges = e => {
        setPlants({ ...plants, [e.target.name]: e.target.value });
    };

    // const submitForm = e => {
    //     e.preventDefault();
    //     props.addNewPlant(plants);
    //     setPlants({ nickname: "", species: "", h2oFrequency: "" });
    // };

    const [post, setPost] = useState([]);
    const id = localStorage.getItem('id')
    console.log('PlantForm.sj id', id) 

    const submitForm = e => {
        e.preventDefault();
        axiosWithAuth()
            .post(`/plants/${id}`, plants)
            .then(res => {
                setPost(res.data);
                console.log("PlantForm.sj .post success", res);
                // localStorage.setItem('plant_id', res.data.plant_id)
                props.addNewPlant(plants);
                setPlants({
                    nickname: "",
                    species: "",
                    h2o_frequency: "",
                    image: ''
                });
                document.location.reload(true)
            })
            .catch(err => console.log('PlantForm.js .post err', err.response, err.message));
    };

    const frequency = [
        'Choose Frequency',
        'Twice a day',
        'Once a day', 
        'Every two days', 
        'Every three days'
    ]

    return (
        <form onSubmit={submitForm} className='plantForm'>
            <h3>Add New Plant</h3>
            <label htmlFor="nickname">
                Name: 
                <input
                    type="text"
                    placeholder="Name of Plant"
                    onChange={handleChanges}
                    value={plants.nickname}
                    name="nickname"
                />
            </label>
            <br />
            <label htmlFor="species">
                Species: 
                <input
                    type="text"
                    placeholder="Species of Plant"
                    onChange={handleChanges}
                    value={plants.species}
                    name="species"
                />
            </label>
            <br />
            <label htmlFor="freq">
                Watering Frequency: 
                <select
                    name="h2o_frequency"
                    value={plants.h2o_frequency}
                    onChange={handleChanges} >
                        {frequency.map(freq => {
                            return (
                                <option value={freq}>{freq}</option>
                            )
                        })}
                
                </select>
            </label>
            <br />
            {/* <label htmlFor="image">
                Add an Image:
                <input
                    type="file"
                    placeholder="image"
                    onChange={handleChanges}
                    value={plants.file}
                    name="image"
                />
            </label>
            <br /> */}
            <button className="form" type="submit">Add Plant</button>
        </form>
    );
};

export default PlantForm;
