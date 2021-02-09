import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import './components.css';

const UpdatePerson = props => {
  const id = localStorage.getItem('id')
  const [user, setUser] = useState({
    username: "",
    password: "",
    phone: ''
});

const handleChange = e => {
  setUser({ ...user, [e.target.name]: e.target.value });
};

  useEffect(()=>{
    axiosWithAuth()
      .get(`/user/${id}`)
      .then(res=>{
        console.log('UpdatePerson.js: getUser: res', res)
        setUser(res.data)
      })
      .catch(err=>console.log('UpdatePerson.js: getUser: err', err.message, err.response))
  }, [])

  const submitForm = e => {
    e.preventDefault();
    axiosWithAuth()
        .put(`/user/${id}`, user)
        .then(res => {
            console.log("UpdatePerson.js: submitForm: .post", res.data);
            setTimeout(()=>{
                props.history.push('/plant-cards')
            }, 150)
        })
        .catch(err=>{
            console.log('SignUp.js=>handleLogin=>err', err)
        })
};

  return (
    <div className='suliBackground'>
      <form onSubmit={submitForm}>
        <h3>Update Information</h3>
        <label className='inputInfo'>
          Phone: 
          <input 
            type='text'
            onChange={handleChange}
            value={user.phone}
            name='phone'
          />
        </label><br/>
        <label className='inputInfo'>
          Password:
          <input 
            type='text'
            onChange={handleChange}
            value={user.password}
            name='password'
          />
        </label>
        <button type='submit'>Submit</button><br/>
        <Link to='/plant-cards'>
          <button>Your Cards</button>
        </Link>
      </form>
    </div>
  )
}

export default UpdatePerson;