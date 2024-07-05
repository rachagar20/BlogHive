import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { setUser, user } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-24 py-4 bg-indigo-500 text-white shadow-lg">
      <h1 className="text-lg md:text-2xl font-extrabold">
        <Link to="/">BlogHive</Link>
      </h1>
      {path === "/" && (
        <div className="flex w-1/3 items-center bg-white text-black rounded-full px-3 py-1 space-x-2 shadow-inner">
          <BsSearch
            className="cursor-pointer"
            onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))}
          />
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3 py-1 w-full rounded-full"
            placeholder="Search a post"
            type="text"
          />
        </div>
      )}
      <div className="hidden lg:flex items-center space-x-4">
        {user ? (
          <>
            <h1 className="text-white text-sm hover:text-gray-300 cursor-pointer">
              <Link to="/write">Create Post</Link>
            </h1>
            <h3 className="text-white text-sm hover:text-gray-300 cursor-pointer">
              <Link to={"/myblogs/" + user._id}>My Blogs</Link>
            </h3>
            <h3 className="text-white text-sm hover:text-gray-300 cursor-pointer">
              <Link to={"/profile/" + user._id}>Profile</Link>
            </h3>
            <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-300 cursor-pointer">
              Logout
            </h3>
          </>
        ) : (
          <h3><Link to="/login">Login</Link></h3>
        )}
      </div>
      <div className="lg:hidden relative">
        <FaBars className="cursor-pointer text-2xl" onClick={showMenu} />
        {menu && <Menu />}
      </div>
    </div>
  );
}

export default Navbar;
