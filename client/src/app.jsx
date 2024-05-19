import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

import Sidebar from "./components/Sidebar.jsx";
import RightPanel from "./components/RightPanal.jsx";

import { Toaster } from "react-hot-toast";

import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

function App() {
  const [authUser, setAuthUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        console.log("executing u");
        const res = await fetch("http://localhost:4050/api/auth/authMe", {
          method: "GET",
          credentials: "include", // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          console.log("Error in fetching user", data.error || "Error");
          throw new Error(data.error || "Error");
        }
        setAuthUser(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        throw new Error(error);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  console.log("auth user: ", authUser);
  return (
    <div className="flex max-w-6xl mx-auto">
      {/* Only show if the user is logged in  */}
      {<Sidebar />}

      <Routes>
        {/* User need to log in or sign up to have access to the app */}
        {/* home page --> direct to log in */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        {/* logged in --> direct to home page  */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      {<RightPanel />}
      <Toaster />
    </div>
  );
}

export default App;
