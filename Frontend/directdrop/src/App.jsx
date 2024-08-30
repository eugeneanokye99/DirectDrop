import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Button} from '@chakra-ui/react'
import './App.css'


function App() {
  

  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
         
        </Routes>
      </Router>
    </div>
    
     
  )
}

export default App
