import './App.css';
import { Login } from './auth/Login';
import { NavBar } from './Nav/NavBar';
import { Route, Routes } from "react-router-dom"
import { Authorized } from "./auth/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { Register } from "./auth/Register"


export const App = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}


