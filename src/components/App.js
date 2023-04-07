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
import { Faq } from './faq/Faq';
import { AddSharedCharacter } from './public/AddSharedCharacter';
import { ConditionalNavBar } from './Nav/ConditionalNavBar';
import { NotAuthorized } from './auth/NotAuthorized';
import { PasswordResetRequest } from './auth/PasswordResetRequest';
import { ResetPasswordForm } from './auth/ResetPasswordForm';
export const App = () => {
	return (
	  <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
    <Route path="/password-reset" element={<PasswordResetRequest />} />
    <Route path="/reset-password/:pass_token" element={<ResetPasswordForm />} />
		<Route
		  path=""
		  element={
			<>
			  
			  <Main />
			</>
		  }
		/>
		<Route
  path="/public"
  element={
    <>
      <ConditionalNavBar />
      <PublicBoardsContainer />
    </>
  }
/>
<Route
  path="/public/:calculatedRosterId"
  element={
    <>
      <ConditionalNavBar />
      <PublicViewStats />
    </>
  }
/>
<Route
  path="/faq"
  element={
    <>
      <ConditionalNavBar />
      <Faq />
    </>
  }
/>
<Route
  path="/add_character/:tokenId"
  element={
    <>
      <ConditionalNavBar />
      <AddSharedCharacter />
    </>
  }
/>
<Route 
path="/nope"
element={<NotAuthorized />} />
  
		<Route
		  path="*"
		  element={
			<Authorized>
			  <>
				<NavBar />
				<ApplicationViews />
			  </>
			</Authorized>
		  }
		/>
	  </Routes>
	);
  };
  

