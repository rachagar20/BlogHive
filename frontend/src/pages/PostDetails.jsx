import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL + "/api/comments/create",
        { comment: comment, author: user.username, postId: postId, userId: user._id },
        { withCredentials: true });

      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ?
        <div className="h-[80vh] flex justify-center items-center w-full"><Loader /></div> :
        <div className="px-8 md:px-[200px] mt-8 pb-5">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
              {user?._id === post?.userId &&
                <div className="flex items-center space-x-2">
                  <p className="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => navigate("/edit/" + postId)}><BiEdit size={24} /></p>
                  <p className="cursor-pointer text-gray-600 hover:text-red-600" onClick={handleDeletePost}><MdDelete size={24} /></p>
                </div>
              }
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-gray-600">@{post.username}</p>
              <div className="flex space-x-2 text-gray-500 text-sm">
                <p>{new Date(post.updatedAt).toDateString()}</p>
                <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
              </div>
            </div>
            <img src={IF + post.photo} className="w-full mt-8 rounded-lg" alt="" />
            <p className="mt-8 text-gray-700" dangerouslySetInnerHTML={{ __html: post.desc?.replace(/\n/g, '<br/>') }}></p>
            <div className="flex items-center mt-8 space-x-4 font-semibold">
              <p>Categories:</p>
              <div className="flex space-x-2">
                {post.categories?.map((c, i) => (
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1 text-gray-800">{c}</div>
                ))}
              </div>
            </div>
          </div>
          <h3 className="mt-10 text-xl font-semibold">Comments:</h3>
          <div className="w-full  bg-white shadow-md flex flex-col mt-8 md:flex-row items-center border-1 rounded-md p-4">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="w-full md:w-[80%] outline-none py-2 px-4 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
            />
            <button
              onClick={postComment}
              className="bg-indigo-500 text-sm text-white px-4 py-2 w-full md:w-[20%] mt-4 md:mt-0 rounded-md hover:bg-indigo-600 transition duration-200"
            >
              Add Comment
            </button>
          </div>
          <div className="mt-8">{comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default PostDetails;
