import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import * as yup from "yup";
import './components.css';

const formSchema = yup.object().shape({
    username: yup.string().required("Name is a required"),
    phone: yup.string().required("Number needed").min(10),
    password: yup.string().required("Password needed").min(3, "Passwords need 3 min"),
});

export default function SignUp(props) {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [formState, setFormState] = useState({
        username: "",
        phone: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        phone: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        setIsLoading(true)
        // axios
        axiosWithAuth()
            .post("/auth/register", formState)
            .then(res => {
                console.log("SignUp.js: formSubmit: .post", res.data);
                setTimeout(()=>{
                    setIsLoading(false);
                    setError('')
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id', res.data.data.id)
                    props.history.push('/plant-cards')
                }, 150)
            })
            .catch(err=>{
                setIsLoading(false)
                console.log('SignUp.js=>handleLogin=>err', err)
                setError('User Name Already Used')
            })
    };

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
    };

    const h2MoveDown = {
        marginTop: '35px'
    }

    return (
        <div className='suliBackground'> {/*signuploginbackground*/}
            <h2 style={h2MoveDown}>Member Sign Up</h2>
            <h2 style={{ color: 'red'  }}>{error}</h2>
            {isLoading ? (
                <h2>Loading</h2>
            ) : (
                <form onSubmit={formSubmit}>
                    <label htmlFor='username' className='inputInfo'>
                        Username
                        <input
                            type='text'
                            name='username'
                            value={formState.username}
                            onChange={inputChange}
                            placeholder='UserName'
                        />
                        {errors.username.length > 0 ? <p className='error'>{errors.username}</p> : null}
                    </label>
                    <br />
                    <label htmlFor='email' className='inputInfo'>
                        Phone Number
                        <input
                            type='text'
                            name='phone'
                            value={formState.phone}
                            onChange={inputChange}
                            placeholder='Phone Number'
                        />
                        {errors.phone.length > 0 ? (
                            <p className='error'>{errors.phone}</p>
                        ) : null}
                    </label>
                    <br />
                    <label htmlFor='password' className='inputInfo'>
                        Password
                        <input
                            // type='text'
                            type='password'
                            name='password'
                            value={formState.password}
                            onChange={inputChange}
                            placeholder='Password'
                        />
                        {errors.password.length > 0 ? (
                            <p className='error'>{errors.password}</p>
                        ) : null}
                    </label>
                    <br />
                    {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
                    <button disabled={buttonDisabled}>Sign Up</button>
                </form>
            )}
        </div>
    );
}