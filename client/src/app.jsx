import {  Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

import Sidebar from "./components/Sidebar.jsx";
import RightPanel from "./components/RightPanal.jsx";


import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

function App() {
	const { data: authUser } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/authUser");
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something is wrong");
				}
				console.log("auth User is here:", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},

	});
		return (
			<div className='flex max-w-6xl mx-auto'>
				<Sidebar/>
				<Routes>
					<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
					<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />}  />
					<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
					<Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
					<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
				</Routes>
				<RightPanel/>
				<Toaster/>
			</div>
		);
	}

export default App;
