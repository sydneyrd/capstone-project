import './App.css';
import { Login } from './auth/Login';
import { NavBar } from './Nav/NavBar';
import { Route, Routes } from "react-router-dom"
import { Authorized } from "./auth/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { Register } from "./auth/Register"
import { Main } from './main/Main';
import { PublicBoardsContainer } from './public/PublicBoardsContainer';
import { PublicViewStats } from './public/PublicViewStats';


export const App = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route path="" element={<Main />}/>
		<Route path="/public" element={<PublicBoardsContainer />} />
		<Route path="/public/:calculatedRosterId" element={<PublicViewStats />} />
		

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


