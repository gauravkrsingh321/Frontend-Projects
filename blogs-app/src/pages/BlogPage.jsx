import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AppContext } from "../Context/AppContext";
import { baseUrl2 } from "../BaseUrl";
import Header from "../components/Header";
import BlogDetails from "../components/BlogDetails";
import Spinner from "../components/Spinner";

const BlogPage = () => {
  const [blog, setBlog] = useState(null)
  const [relatedblogs, setRelatedBlogs] = useState([]);
  const location = useLocation();  
  const navigate = useNavigate();
  const {setLoading,loading} = useContext(AppContext);
  const blogId = location.pathname.split('/').at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${baseUrl2}?blogId=${blogId}`;
    console.log("Fetching blog for blogId:", blogId);
  console.log("URL being called:", url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Full API response:", data);
      console.log(data.blog)
      console.log(data.relatedBlogs)
      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    } 
    catch (error) {
      console.log("Error in network call ",error)
      setBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  } 

  useEffect(() => {
    if(blogId) fetchRelatedBlogs();
  }, [location.pathname])
  

  return (
    <div className="max-w-[900px] relative m-auto  py-8 flex flex-col justify-center items-center gap-y-10 mt-[60px] mb-[0px]">
      <Header />
      <div className="w-full">
        <button className="border-2 cursor-pointer hover:bg-gray-200 p-1 pl-2 pr-2 text-[1rem]" onClick={()=>navigate(-1)}>Back</button>
      </div>
      {
        loading ? 
        (<Spinner/>) : 
        blog ? 
        (<div>
            <BlogDetails post={blog} />
            <h2 className="mt-[40px] mb-[20px] font-bold text-2xl">Related Blogs</h2>
            {
              relatedblogs.map((post) => (
                <div key={post.id}>
                  <BlogDetails post={post}/>
                </div>
              ))
            }
        </div>) :
        (
          <div>
            <p>No Blog Found</p>
          </div>
        )
      }
    </div>
  )
}

export default BlogPage;