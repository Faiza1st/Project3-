import { useState } from "react";
import { toast } from "react-hot-toast";

const EditProfileModal = ({ user, setIsUpdating, isUpdating }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    username: user.username || "",
    email: user.email || "",
    bio: user.bio || "",
    link: user.link || "",
    newPassword: "",
    currentPassword: "",
    profileImg: "",
    coverImg: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4050/api/users/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      console.log(res);

      const data = await res.json();
      toast.success("Profile updated successfully");

      // Optionally, update local state or perform other actions here

      setIsUpdating(!isUpdating);
      // Close the modal
      document.getElementById("edit_profile_modal").close();

      // Set updating to true to re-fetch the user data
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm bg-[#CBC3E3]"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box border rounded-md border-gray-700 shadow-md">
          <h3 className="font-bold text-lg my-3">Update Student Profile</h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.fullName}
                name="fullName"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Username"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Email/StudentID"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Student Bio"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.bio}
                name="bio"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                placeholder="Current Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.currentPassword}
                name="currentPassword"
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="New Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.newPassword}
                name="newPassword"
                onChange={handleInputChange}
              />
            </div>
            <input
              type="text"
              placeholder="Link"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              value={formData.link}
              name="link"
              onChange={handleInputChange}
            />
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Profile Image URL"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.profileImg}
                name="profileImg"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Cover Image URL"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.coverImg}
                name="coverImg"
                onChange={handleInputChange}
              />
            </div>
            <button className="btn btn-primary rounded-full btn-sm text-white">
              Update
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </>
  );
};

export default EditProfileModal;
