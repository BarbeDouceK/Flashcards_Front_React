import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage.jsx'
import NavBar from './components/NavBar.jsx'

import Cards from './components/pages/Cards.jsx'
import Card from './components/pages/Card.jsx'
import { Authentification } from './components/pages/Authentification.jsx'

function App() {


	return (
		<>
    <a href="/"><h1>Application FlashCards</h1></a>
		<div className="relative flex min-h-screen flex-col justify-left py-6 sm:py-12">
			<div className="relative px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
					<NavBar/>
					<Router>
						<Routes>
							<Route path="/" element={<HomePage/>}></Route>
							<Route path="/cards" element={<Cards/>}></Route>
							<Route path="/card" element={<Card cardId={1} />}></Route>
							<Route path="/auth" element={<Authentification/>}></Route>
							{/* <Route path="/PATH" element={<PAGE/>}></Route> */}
						</Routes>
					</Router>
			</div>
		</div>
		</>
	)
}

export default App
