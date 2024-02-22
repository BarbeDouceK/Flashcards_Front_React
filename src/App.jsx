import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage.jsx'
import NavBar from './components/NavBar.jsx'

import ApiRestIndex from './components/pages/ApiRestIndex.jsx'
import CardServiceApi from './components/pages/CardServiceApi.jsx'
import Cards from './components/pages/Cards.jsx'
import Play from './components/pages/Play.jsx'
import BackCards from './components/pages/backmvc/BackCards.jsx'

function App() {


  return (
    <>
      <NavBar/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/api/v1" element={<ApiRestIndex/>}></Route>
          <Route path="/api/v1/cards" element={<Cards/>}></Route>
          <Route path="/backcards" element={<BackCards/>}></Route>
          <Route path="/play" element={<Play/>}></Route>
          <Route path="/cards" element={<CardServiceApi/>}></Route>
          {/* <Route path="/PATH" element={<PAGE/>}></Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
