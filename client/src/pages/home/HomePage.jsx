import { useState } from "react";

import Posts from "../../components/Posts.jsx";
import CreatePost from "./CreatePost.jsx";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");

  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
        <div className="flex w-full border-b border-gray-700">
          <div
            className={
              "flex justify-center flex-1 p-3 hover:bg-[#CBC3E3] transition duration-300 cursor-pointer relative"
            }
            onClick={() => setFeedType("forYou")}
          >
            For you
            {feedType === "forYou" && (
              <div className="absolute bottom-0 w-10  h-1 rounded-full bg-[#CBC3E3]"></div>
            )}
          </div>
          <div
            className="flex justify-center flex-1 p-3 hover:bg-[#CBC3E3] transition duration-300 cursor-pointer relative"
            onClick={() => setFeedType("following")}
          >
            Following
            {feedType === "following" && (
              <div className="absolute bottom-0 w-10  h-1 rounded-full bg-[#CBC3E3]"></div>
            )}
          </div>
        </div>
        <CreatePost isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
        <Posts
          feedType={feedType}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
        />
      </div>
    </>
  );
};
export default HomePage;
