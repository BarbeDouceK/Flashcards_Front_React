import './App.css'
import HomePage from './components/pages/HomePage.jsx'
import ApiRestIndex from './components/pages/ApiRestIndex.jsx'
import Cards from './components/pages/Cards.jsx'
import Cards from './components/pages/backmvc/BackCards.jsx'
import Cards from './components/pages/Play.jsx'

function App() {


  return (
    <>
      <NavBar/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/api/v1" element={<ApiRestIndex/>}></Route>
          <Route path="/api/v1/cards" element={<Cards/>}></Route>
          <Route path="/cards" element={<BackCards/>}></Route>
          <Route path="/play" element={<Play/>}></Route>
          {/* <Route path="/PATH" element={<PAGE/>}></Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
