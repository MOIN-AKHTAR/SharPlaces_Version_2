import React,{useContext} from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import AuthContex from '../../Context/AuthContex';
import style from './NavLinks.module.css';

const setStyle=(location,path)=>{
    if(location.pathname===path){
        return {
            background: "#f8df00",
    borderColor: "#292929",
    color: "#292929"
        }
    }
}

const  NavLinks=(props)=> {
    const auth=useContext(AuthContex);
    return (
        <ul className={style.nav_links}>
            <li>
                <NavLink 
                to="/" 
                exact
                style={setStyle(props.history.location,"/")}
                >
                    ALL USERS
                </NavLink>
            </li>
            {auth.loggedIn&&[<li key={1}>
                <NavLink 
                to={`${auth.userId}/places`}
                style={setStyle(props.history.location,`/${auth.userId}/places`)}
                >
                    MY PLACES
                </NavLink>
            </li>,
            <li key={2}>
                <NavLink 
                to="/new/place"
                style={setStyle(props.history.location,"/new/place")}
                 >
                    ADD PLACE
                </NavLink>
            </li>]}
            {!auth.loggedIn&&<li>
                <NavLink to="/auth"
                style={setStyle(props.history.location,"/auth")}
                 >
                    AUTHENTICATE
                </NavLink>
            </li>}
            {
                auth.loggedIn&&<li>
                    <button onClick={auth.logout}>LOGOUT</button>
                </li>
            }
        </ul>
    )
}

export default withRouter(NavLinks);
