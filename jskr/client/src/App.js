import React from 'react';

// css
import './styles/main.scss'
import './App.css';


// Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Layout
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard'
// Redux

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
