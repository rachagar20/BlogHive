import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [initialImage, setInitialImage] = useState(null); // State for initial image

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setInitialImage(res.data.photo); // Set initial image
      setCats(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
        console.log(imgUpload.data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put(
        URL + "/api/posts/" + postId,
        post,
        { withCredentials: true }
      );
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1); // Corrected splice usage
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow md:px-[200px] mt-8 pr-5 pl-5">
        <div className="pb-5 border border-gray-300 rounded-lg shadow-lg flex flex-col justify-center items-center bg-white">
          <div className="my-5 font-bold text-2xl text-center bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md">
            Edit Post
          </div>
          <form
            className="w-full flex flex-col justify-center items-center space-y-4 md:space-y-8 mt-4"
            onSubmit={handleUpdate}
          >
            <div className="w-2/3">
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                value={title}
                placeholder="Enter post title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="w-2/3">
              <label className="block text-gray-700 font-semibold mb-2">
                Image
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              
            </div>
            <div className="w-2/3 flex flex-col space-y-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Categories
              </label>
              <div className="flex items-center space-x-4">
                <input
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter post category"
                  type="text"
                />
                <div
                  onClick={addCategory}
                  className="bg-indigo-500 text-white px-4 py-2 font-semibold cursor-pointer rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                  Add
                </div>
              </div>
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mt-3">
                {cats?.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md"
                  >
                    <p>{c}</p>
                    <button
                      onClick={() => deleteCategory(i)}
                      className="text-white bg-red-500 rounded-full cursor-pointer p-1 text-sm"
                    >
                      <ImCross />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-2/3">
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                rows={8}
                value={desc}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter post description"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 w-2/3 mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
