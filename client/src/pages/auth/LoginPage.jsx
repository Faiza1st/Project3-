import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import toast from "react-hot-toast";

const LoginPage = ({ setAuthUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const login = async (formData) => {
    try {
      const res = await fetch("http://localhost:4050/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
        credentials: "include",
      });

      if (res.status !== 200) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      const data = await res.json();
      localStorage.setItem("authUser", JSON.stringify(data));

      toast.success("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.log("Error in login: ", error);
      toast.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center justify-center"></div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-extrabold text-white">{"Let's go."}</h1>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
              aria-label="Username"
              required
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              aria-label="Password"
              required
            />
          </label>

          <button
            className="btn rounded-full btn-primary text-white"
            type="submit"
          >
            Login
          </button>

          {/* {mutation.isError && (
            <p className="text-red-500">{mutation.error.message}</p>
          )} */}
        </form>

        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">{"Don't have an account?"}</p>
          <button
            className="btn rounded-full btn-primary text-white btn-outline w-full"
            onClick={() => (window.location.href = "/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
