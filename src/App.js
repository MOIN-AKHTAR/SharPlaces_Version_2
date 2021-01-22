import React from 'react';
import {BrowserRouter,Redirect,Route,Switch} from 'react-router-dom'
import NewPlace from './Places/Pages/NewPlace';
import UpdatePlace from './Places/Pages/UpdatePlace';
import UserPlaces from './Places/Pages/UserPlaces';
import MainNavigation from './Share/Components/Navigation/MainNavigation';
import AuthContex from './Share/Context/AuthContex';
import useAuthHook from './Share/Hooks/AuthHook'
import Auth from './Users/Pages/Auth';
import Users from './Users/Pages/Users';



function App() {
    const {login,logout,userId,token}=useAuthHook();

    let routes;
    if(token){
      routes=<Switch>
            <Route path="/" exact component={Users} />
            <Route path="/new/place"  component={NewPlace}/>
            <Route path="/:pid/place" exact component={UpdatePlace}/>
            <Route path="/:uid/places"  component={UserPlaces}/>
            <Redirect to="/" />
      </Switch>

    }else{
     routes= <Switch>
           <Route path="/" exact component={Users} />
           <Route path="/auth" component={Auth}/>
           <Route path="/:uid/places"  component={UserPlaces}/>
           <Redirect to="/auth" />
      </Switch>
    }

  return (
    <AuthContex.Provider
    value={{loggedIn:!!token,login,logout,userId,token}}
    >
      <BrowserRouter>
        <MainNavigation />
        <main style={{marginTop:"100px"}}>
            {routes}
        </main>
      </BrowserRouter>
    </AuthContex.Provider>
    
  )
}

export default App;
