import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import './components.css';

function Login(props) {
    const [user, setUser] = useState({
        username: "",
        password: "" 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // const [post, setPost] = useState([]);

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     console.log(user.username);
    //     console.log(user.password);
    // };

    // const handleLogin = e => {
    //     e.preventDefault();
    //     setIsLoading(true)
    //     // axios
    //     axiosWithAuth
    //         .post("/auth/login", user)
    //         // .post("https://plant-care-reminder.herokuapp.com/api/auth/login", user)
    //         .then(res => {
    //             setIsLoading(false)
    //             setPost(res.data);
    //             console.log("post", res.data);
    //             setUser({
    //                 username: "",
    //                 password: ""
    //             });
    //         })
    //         .catch(err => console.log('.post err',err.response, err.message));
    //         setUser({})
    // };

    // handleChange and handleLogin
    const handleChange = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };
    const handleLogin = e => {
        e.preventDefault();
        setIsLoading(true);
        axiosWithAuth()
            .post('/auth/login', user)
            .then(res=> {
            console.log('Login.js=>handleLogin=>res', res)
            setTimeout(()=>{
                setIsLoading(false);
                setError('')
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.id)
                props.history.push('/plant-cards')
            }, 150)
            })
            .catch(err=>{
            setIsLoading(false)
            console.log('Loading.js=>handleLogin=>err', err)
            setError('Invalid Login')
        })
        setUser({})
    }

    const h2MoveDown = {
        marginTop: '35px'
    }

    return (
        <div className='suliBackground'> {/*signuploginbackground*/}
            <h2 style={h2MoveDown}>User Login</h2>
            {console.log(user)}
            {/* <form onSubmit={event => handleSubmit(event)}> */}
            <h2 style={{ color: 'red'  }}>{error}</h2>
            {isLoading ? (
                <h2>Loading</h2>
            ) : (
                <form onSubmit={handleLogin}>
                    <label className='inputInfo'>
                        Username:
                        <input
                            type="text"
                            name="username"
                            onChange={event => handleChange(event)}
                            value={user.username}
                            placeholder='Username'
                        />
                    </label><br />
                    <label className='inputInfo'>
                        Password:
                        <input
                            // type="text"
                            type='password'
                            name="password"
                            onChange={event => handleChange(event)}
                            value={user.password}
                            placeholder='Password'
                        />
                    </label>
                    {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
                    <br />
                    <br />
                    <button>Submit!</button>
                </form>
            )}
        </div>
    );
}

export default Login;
