//Importing
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreatePost = ({ isUpdating, setIsUpdating }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setIsPending(true);

    if (text.trim() === "" && !img) {
      toast.error("Post must have text or image");
      setIsPending(false);
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    if (img) {
      formData.append("img", img);
    }

    try {
      const res = await axios.post(
        "http://localhost:4050/api/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        toast.success("Post created successfully");
        setText("");
        setImg(null);
        imgRef.current.value = null;

        setIsUpdating(!isUpdating);
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Something went wrong");
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const authUser = JSON.parse(localStorage.getItem("authUser"));

  const data = {
    profileImg: "/avatars/boy1.png",
  };

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img
            src={authUser.profileImg || "/avatar-placeholder.png"}
            alt="profile"
          />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full " onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full p-2 text-lg resize-none border-none focus:outline-none border-purple-800"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {img && (
          <div className="relative w-72 mx-auto">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
            />
            <img
              src={URL.createObjectURL(img)}
              className="w-full mx-auto h-72 object-contain rounded"
              alt="upload"
            />
          </div>
        )}
        <div className="flex justify-between border-t py-2 border-t-gray-700">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
          />
          <button
            className="btn btn-primary rounded-full btn-sm text-white px-4"
            disabled={isPending}
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
        {isError && <div className="text-red-500">Something went wrong</div>}
      </form>
    </div>
  );
};

export default CreatePost;
