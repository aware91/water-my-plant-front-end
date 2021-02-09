import React, { useState } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import PlantCards from '../plants/PlantCards';
import PrivateRoute from './PrivateRoute';
import UpdatePerson from './UpdatePerson';
import user from '.././img/user.png';

export default function NavBar() {
    const linkStyle = {
        textDecoration: 'none',
        color: '#F1F3F2',
        fontSize: '1.5rem'
    }

    const [user, setUser] = useState({
        username: "",
        password: "",
        phone: ''
    });

    return (
        <div>
            <nav className='navBar'>
                <div className='navTitle'>
                    <h1>Plant Parenthood</h1>
                    <div>
                        <Link to='/' style={linkStyle}>Home</Link>
                        <Link to='/about' style={linkStyle}>About</Link>
                    </div>
                </div>
                <div className='signup-login'>
                    <Link to='/sign-up' style={linkStyle}>Sign Up</Link>
                    <Link to='/login' style={linkStyle}>Login</Link>
                    <Link to='/update-info'><img src={user} alt='user logo'/></Link>
                </div>
            </nav>
            <Switch>
                <PrivateRoute exact path='/plant-cards' component={PlantCards} />
                <Route path='/login' render={(props)=><Login {...props}/>} />
                <Route path='/sign-up' render={(props)=><SignUp {...props}/>} />
                <Route path='/update-info' render={(props)=><UpdatePerson {...props}/>} />
                {/* <Route path='/about' component={About} /> 
                <Route path='/' component={Home} /> */}
            </Switch>
        </div>
    )
}