import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Feed from './pages/feed'
import Home from './pages/home'
import Register from './pages/UserRegister'
import Login from './pages/UserLogin'
import { ThemeModeScript } from "flowbite-react";
import React from "react";
import ReactDOM from "react-dom/client";


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/feed' element={<Feed />}/>
      <Route path='/UserRegister' element={<Register />}/>
      <Route path='/UserLogin' element={<Login />} />
    </Routes>
)
}

export default App