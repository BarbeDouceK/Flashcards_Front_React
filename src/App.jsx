import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage.jsx'
import NavBar from './components/NavBar.jsx'

import Cards from './components/pages/Cards.jsx'
import Card from './components/pages/Card.jsx'
import { Authentification } from './components/pages/Authentification.jsx'
import { Register } from './components/pages/Register.jsx'
import Tiroir from './components/pages/Tiroir.jsx'
import Footer from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { Daily } from './components/pages/Daily.jsx'

function App() {
	let auth;
	try {
		auth = JSON.parse(localStorage.getItem('auth'));
		console.log(auth);
	} catch(jsonParse) {
		auth = null;
	}

	return (
		<>
			<div className="mb-10 flex flex-row">
				<Header/>
			</div>
			<div className="flex">
				<NavBar userId={auth ? auth.user.id : 0} />
				<div className='separator border-r'></div>
				<div className='grow min-w-0'>
				<Router>
					<Routes>
						<Route path="/" element={<HomePage />}></Route>
						<Route path="/cards" element={<Cards isAdmin={auth ? auth.user.roles.includes("ADMIN") : false} />}></Route>
						<Route path="/card/:id" element={<Card/>}></Route>
						<Route path="/auth" element={<Authentification />}></Route>
						<Route path="/tiroir" element={<Tiroir />}></Route>
						<Route path="/daily" element={<Daily />}></Route>
						<Route path="/register" element={<Register />}></Route>
						{/* <Route path="/PATH" element={<PAGE/>}></Route> */}
					</Routes>
				</Router>
				</div>
			</div>
			<div className=''>
				<Footer/>
			</div>
		</>
	)
}

export default App
