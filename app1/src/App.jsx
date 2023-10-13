import { useState } from 'react'

import './App.css'


import Iluminasaurio from './Iluminasaurio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Iluminasaurio />
    </>
  )
}

export default App
