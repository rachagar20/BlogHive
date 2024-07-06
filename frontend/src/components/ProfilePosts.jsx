/* eslint-disable react/prop-types */
import { IF } from '../url';

const ProfilePosts = ({ p }) => {
  return (
    <div className="p-4 mt-2 mb-2 w-full  pt-5 pb-5 bg-white
     sm:space-x-4 border border-gray-300 shadow-lg rounded-lg  flex xs:flex-col xs:items-center xs:justify-center sm:flex-row">
      <div className="xs:w-[100%] sm:w-[35%] h-[200px] flex justify-center items-center ">
        <img src={IF + p.photo} alt={p.title} className="h-full w-full object-cover rounded-lg" />
      </div>
      <div className="flex flex-col xs:w-[100%] sm:w-[65%]" style={{xs:{marginLeft:"0px"},sm:{marginLeft:"16px"}}}>
        <h1 className="text-xl xs:text-center sm:text-left font-bold md:mb-2 mb-1 md:text-2xl">{p.title}</h1>
        <div className="flex-col mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4 ">
          <p>@{p.username}</p>
          <div className="flex space-x-2 text-sm  ">
            <div><p>{new Date(p.updatedAt).toString().slice(0, 15)}</p></div>
            <div><p>{new Date(p.updatedAt).toString().slice(16, 24)}</p></div>
          </div>
        </div>
        <p className="text-sm md:text-base">{p.desc.slice(0, 200)} ...<span className="text-blue-500 cursor-pointer">Read more</span></p>
      </div>
    </div>
  );
}

export default ProfilePosts;
