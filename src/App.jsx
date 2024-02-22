import './App.css'

function App() {


  return (
    <>
      <NavBar/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/api/v1" element={<ApiRest/>}></Route>
          <Route path="/api/v1/cards" element={<Cards/>}></Route>
          <Route path="/cards" element={<BackCards/>}></Route>
          <Route path="/play" element={<Play/>}></Route>
          {/* <Route path="/" element={<Formulaire/>}></Route>
          <Route path="/" element={<Flux/>}></Route>
          <Route path="/" element={<HookUseEffect/>}></Route>
          <Route path="/" element={<HookUseMemo/>}></Route>
          <Route path="/" element={<RequesAPI/>}></Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
