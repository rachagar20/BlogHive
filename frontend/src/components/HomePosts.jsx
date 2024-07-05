/* eslint-disable react/prop-types */
import { IF } from '../url';

const HomePosts = ({ post }) => {
  return (
    <div className="p-4 mt-2 mb-2 w-full flex pt-5 pb-5 bg-white
     space-x-4 border border-gray-300 shadow-lg rounded-lg">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IF + post.photo} alt={post.title} className="h-full w-full object-cover rounded-lg" />
      </div>
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">{post.title}</h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-base">{post.desc.slice(0, 200)} ...<span className="text-blue-500 cursor-pointer">Read more</span></p>
      </div>
    </div>
  );
}

export default HomePosts;
