/* eslint-disable react/prop-types */
import { IF } from '../url';

const ProfilePosts = ({ p }) => {
  return (
    <div className="p-4 mt-2 mb-2 w-full flex pt-5 pb-5 bg-white space-x-4 border border-gray-300 shadow-lg rounded-lg">
      {/* Left side (image) */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IF + p.photo} alt={p.title} className="h-full w-full object-cover rounded-lg" />
      </div>
      {/* Right side (details) */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">{p.title}</h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{p.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-base">{p.desc.slice(0, 200)} ...<span className="text-blue-500 cursor-pointer">Read more</span></p>
      </div>
    </div>
  );
}

export default ProfilePosts;
