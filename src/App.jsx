import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage.jsx'
import NavBar from './components/NavBar.jsx'

import Cards from './components/pages/Cards.jsx'
import Card from './components/pages/Card.jsx'
import { Authentification } from './components/pages/Authentification.jsx'
import Tiroir from './components/pages/Tiroir.jsx'

function App() {


	return (
		<>
    <a href="/"><h1>Application FlashCards</h1></a>
		<div className="p-8">
			<div className="px-6">
				<div className="">
					
				</div>
				<div>
					<NavBar/>
					<Router>
						<Routes>
							<Route path="/" element={<HomePage/>}></Route>
							<Route path="/cards" element={<Cards/>}></Route>
							<Route path="/card" element={<Card cardId={1} />}></Route>
							<Route path="/auth" element={<Authentification/>}></Route>
							<Route path="/tiroir" element={<Tiroir/>}></Route>
							{/* <Route path="/PATH" element={<PAGE/>}></Route> */}
						</Routes>
					</Router>
				</div>
			</div>
		</div>
		</>
	)
}

export default App
