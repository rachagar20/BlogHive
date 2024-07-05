import { Link, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import HomePosts from "../components/HomePosts"
import Loader from "../components/Loader"


const MyBlogs = () => {
    const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  // console.log(user)

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/posts/user/"+user?._id)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search,user])

  return (
    <div>
  <Navbar/>
  <div className="flex flex-col items-center px-8 md:px-[200px] min-h-[80vh]">
    <h2 className="text-center font-bold mt-2 text-2xl">My Blogs</h2>

    {loader ? (
      <div className="h-[40vh] flex justify-center items-center">
        <Loader/>
      </div>
    ) : !noResults ? (
      posts.map((post) => (
        <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
          <HomePosts post={post}/>
        </Link>
      ))
    ) : (
      <h3 className="text-center font-bold mt-16">No posts available</h3>
    )}
  </div>
</div>

  )
}

export default MyBlogs