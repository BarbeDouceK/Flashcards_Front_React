import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage.jsx'
import NavBar from './components/NavBar.jsx'

import Cards from './components/pages/Cards.jsx'
import Card from './components/pages/Card.jsx'

function App() {


	return (
		<>
		<div className="p-8">
			<div className="px-6">
				<div className="">
					<a href="/"><h1>Application FlashCards</h1></a>
				</div>
				<div>
					<NavBar />
					<Router>
						<Routes>
							<Route path="/" element={<HomePage/>}></Route>
							<Route path="/cards" element={<Cards/>}></Route>
							<Route path="/card" element={<Card/>}></Route>
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
