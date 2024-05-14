import {  Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

import Sidebar from "./components/Sidebar.jsx";
import RightPanel from "./components/RightPanal.jsx";

function App() {
		return (
			<div className='flex max-w-6xl mx-auto'>
				<Sidebar/>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/signup' element={<SignUpPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/notifications' element={<NotificationPage />} />
					<Route path='/profile/:username' element={<ProfilePage />} />
				</Routes>
				<RightPanel/>
			</div>
		);
	}

export default App;
