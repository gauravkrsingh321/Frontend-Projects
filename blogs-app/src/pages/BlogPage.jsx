import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AppContext } from "../Context/AppContext";
import { baseUrl2 } from "../BaseUrl";
import Header from "../components/Header";
import BlogDetails from "../components/BlogDetails";

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
    <div>
      <Header />
      <div>
        <button onClick={()=>navigate(-1)}>Back</button>
      </div>
      {
        loading ? 
        (<div><p>Loading</p></div>) : 
        blog ? 
        (<div>
            <BlogDetails post={blog} />
            <h2>Related Blogs</h2>
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