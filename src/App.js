import React from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import Header from "./components/header.jsx"
import {Main, Registration, Login, Profile, Todo } from '../src/pages/index.js'
import EditProfile from "./pages/editProfile.jsx"

import * as fetches from './redux/slices/user.js'

function App() {
  
  const dispatch = useDispatch()

  React.useEffect( ()  => {
    dispatch(fetches.fetchAuthMe())
  }, [dispatch])
  

  return ( 
  <>
    <Routes>

        <Route path="/" element={<><Header/><Main/></>  } />

        <Route path="/login" element={<><Header/><Login/></> } />
        <Route path="/registration" element={<><Header/><Registration/></> } />

        <Route path="/profile" element={<><Header/><Profile/></> } />
        <Route path="/edit-profile" element={<><Header/><EditProfile/></> } />

        <Route path="/todo" element={<><Header/><Todo/></> } />

    </Routes>
  </>)
}

export default App;
