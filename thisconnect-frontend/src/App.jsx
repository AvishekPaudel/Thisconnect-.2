import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Register from './pages/UserRegister'
import Login from './pages/UserLogin'
import ThisConnectLanding from './pages/landingPage'
import UserProfile from './pages/UserProfile'

import { MessageProvider } from './context/MessageContext.jsx'
import {UserContext} from './context/UserContext.jsx'
import { useContext } from 'react'

function App() {
  const {user} = useContext(UserContext)
  return (
    <MessageProvider userId={user._id}>
      <Routes>
        <Route path='/foryou' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path='/' element={<ThisConnectLanding />} />
        <Route path='/user/:userId' element={<UserProfile />} />
      </Routes>
    </MessageProvider>
  )
}

export default App