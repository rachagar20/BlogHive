import axios from "axios";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, { withCredentials: true });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-4 py-3 bg-white shadow-md rounded-lg my-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-indigo-600">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4 xs:flex-col sm:flex-row text-gray-500 text-sm">
          <p>{new Date(c.updatedAt).toDateString()}</p>
          <p>{new Date(c.updatedAt).toLocaleTimeString()}</p>
          {user?._id === c?.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p className="cursor-pointer text-red-500 hover:text-red-700" onClick={() => deleteComment(c._id)}>
                <MdDelete size={20} />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="px-4 mt-2 text-gray-700">{c.comment}</p>
    </div>
  );
};

export default Comment;
