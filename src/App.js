import './App.css';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { setAuth, auth } = useContext(AuthContext)
  if(localStorage.getItem("auth") === "true") {
    setAuth(true)
  } else {
    setAuth(false)
  }
  console.log("auth", auth)
  return auth ? <PrivateRoutes/> : <PublicRoutes/>
}

export default App;
