// Import
import Post from "./Post.jsx";
import PostSkeleton from "./SkeletonPost.jsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType, isUpdating, setIsUpdating, userToFetch }) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  // Backend integrations
  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return "/api/posts/all";
      case "following":
        return "/api/posts/followingpost";
      case "posts":
        return `/api/posts/user/${
          userToFetch?.username || authUser.username
        }`;
      case "likes":
        return `/api/posts/likes/${
          userToFetch?._id || authUser._id
        }`;

      default:
        return "/api/posts/all";
    }
  };

  const POST_ENDPOINT = getPostEndpoint();

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts", feedType], // Add feedType to queryKey to refetch on feedType change
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT, {
          credentials: "include", // Ensure cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch, isUpdating]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4">No Post Yet!!</p>
      )}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts.map((post) => {
            console.log(post);
            return (
              <Post
                key={post._id}
                post={post}
                isUpdating={isUpdating}
                setIsUpdating={setIsUpdating}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
export default Posts;
