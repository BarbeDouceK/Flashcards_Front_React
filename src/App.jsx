import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage.jsx'
import NavBar from './components/NavBar.jsx'

import Cards from './components/pages/Cards.jsx'
import Play from './components/pages/Play.jsx'

function App() {


  return (
    <>
      <NavBar/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/api/v1/cards" element={<Cards/>}></Route>
          <Route path="/play" element={<Play/>}></Route>
          {/* <Route path="/PATH" element={<PAGE/>}></Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
