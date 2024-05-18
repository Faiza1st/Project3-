import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {  Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

import Sidebar from "./components/Sidebar.jsx";
import RightPanel from "./components/RightPanal.jsx";


import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/LoadingSpinner.jsx";


function App() {
	const {data: authUser, isLoading} = useQuery({
		quaryKey: ['authUser'],
		quaryFn: async() => {
			try {
				const res = await fetch('http://localhost:4050/api/auth/authMe');
				const data = await res.json();
				if(!res.ok){
					throw new Error(data.error || "Error")
				}
				console.log('User is here',data)
				return data
			} catch (error) {
				throw new Error(error)
			}
		},
		retry: false
	}) 
	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}
		return (
			<div className='flex max-w-6xl mx-auto'>
				{/* Only show if the user is logged in  */}
				{  <Sidebar />}
				
				<Routes>
					{/* User need to log in or sign up to have access to the app */}
					{/* home page --> direct to log in */}
					<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
					{/* logged in --> direct to home page  */}
					<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
					<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
					<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
				</Routes>
				{ <Sidebar />}
				<Toaster/>
			</div>
		);
	}

export default App;
