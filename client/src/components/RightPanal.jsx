// Import
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SkeletonPanal from "../components/SkeletonPanal.jsx";
import toast from "react-hot-toast";

const RightPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [error, setError] = useState(null);

  const authUser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        setIsLoading(true);

        // Fetch suggested users
        const res = await axios.get(
          "http://localhost:4050/api/users/suggested",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setSuggestedUsers(res.data);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
        setError("Error fetching suggested users");
        toast.error("Error fetching suggested users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      // Suggest Users
      const res = await axios.post(
        `http://localhost:4050/api/users/follow/${userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setSuggestedUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? { ...user, isFollowing: !user.isFollowing }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      toast.error("Error following/unfollowing user");
    }
  };

  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="bg-[#CBC3E3] p-4 rounded-md sticky top-2">
        <p className="font-bold">Suggested Students:</p>
        <div className="flex flex-col gap-4">
          {isLoading && (
            <>
              <SkeletonPanal />
              <SkeletonPanal />
              <SkeletonPanal />
              <SkeletonPanal />
            </>
          )}
          {!isLoading && suggestedUsers.length === 0 && (
            <div className="text-center p-4 font-bold">
              Suggestions not available!
            </div>
          )}
          {!isLoading &&
            suggestedUsers.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center justify-between gap-4"
                key={user._id}
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={user.profileImg || "/avatar-placeholder.png"}
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                      {user.fullName}
                    </span>
                    <span className="text-sm text-purple-500">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn bg-white text-black hover:bg-purple hover:opacity-90 rounded-full btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFollow(user._id);
                    }}
                  >
                    {user.isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
