import React from 'react';
const AuthContext=React.createContext({
loggedIn:false,
userId:null,
token:null,
login:()=>{},
logout:()=>{}
});

export default AuthContext;