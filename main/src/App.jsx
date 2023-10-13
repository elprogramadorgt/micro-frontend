import { useState } from 'react'

import './App.css'

// import Edu from "dashboardApp/Edu"
import EduComponent from './EduComponent'
import About from "./About"



import { Routes, Route, Link } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>


      <Link to="/dashboard">Go To Dashboard</Link>
      <Routes>

        <Route path="/" element={<About />} />
        <Route path="/eduroute" element={<EduComponent />} />

      </Routes>
    </>
  )
}

export default App
