import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    if (user) {
      try {
        const res = await axios.get(URL + "/api/users/" + user._id);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(URL + "/api/users/" + user._id, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    if (user) {
      try {
        const res = await axios.get(URL + "/api/posts/user/" + user._id);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user, param]);

  useEffect(() => {
    fetchUserPosts();
  }, [user, param]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="min-h-100 px-8 mt-8 flex flex-col-reverse items-center">
        <div className="flex mt-4 flex-col w-full md:w-2/3">
          <h1 className="text-2xl font-bold mb-4">Your Posts</h1>
          {posts.length===0?
          <div>
            <h3 className="text-center font-bold mt-16 mb-16">No posts available</h3>
          </div>:
          posts.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
        <div className="flex justify-center w-full">
          <div className="flex flex-col space-y-4 items-center p-4 bg-white shadow-md rounded-lg w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <label className="block w-full">
              <span className="text-gray-700">Username</span>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="mt-1 block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your username"
                type="text"
              />
            </label>
            <label className="block w-full">
              <span className="text-gray-700">Email</span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="mt-1 block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your email"
                type="email"
              />
            </label>
            <div className="flex items-center space-x-4 mt-6 w-full">
              <button
                onClick={handleUserUpdate}
                className="w-full text-white font-semibold bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="w-full text-white font-semibold bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">User updated successfully!</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
