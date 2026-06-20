import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import UserHome from './Components/UserHome'
import AdminHome from './Components/AdminHome'
import NewReport from './Components/NewReport'

import Adminlogin from './Components/Adminlogin'
import Adminedit from './Components/Adminedit'
import Useredit from './Components/Useredit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
          
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/adminlogin' element={<Adminlogin/>}/>
          <Route path='/userhome' element={<UserHome/>}/>
          <Route path='/useredit' element={<Useredit/>}/>
          <Route path='/adminhome' element={<AdminHome/>}/>
          <Route path='/newreports' element={<NewReport/>}/>
          
          <Route path='/adminedit' element={<Adminedit/>}/>

          

        </Routes>
      </Router>
    </>
  )
}

export default App
