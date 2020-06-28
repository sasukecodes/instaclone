import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/navbar';
import "./App.css";
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Home from './components/screens/home';
import Login from './components/screens/login';
import Profile from './components/screens/profile';
import Signup from './components/screens/signup';
import CreatePost from './components/screens/createpost';
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/userprofile'
export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      //history.push('/') 
    }
    else{
      history.push('/login')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
      <Home/>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route exact path="/signup">
        <Signup/>
      </Route>
      <Route exact path="/create">
        <CreatePost/>
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile/>
      </Route>

    </Switch>
    
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
