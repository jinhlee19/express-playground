import React from 'react'
import './App.css';

// Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Layout
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';

// Redux

function App() {
	return (
		<Router>
      <Navbar/>
			<Routes>
				<Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
