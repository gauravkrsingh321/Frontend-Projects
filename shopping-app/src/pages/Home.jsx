import React, { useEffect,useState } from 'react'
import Spinner from '../components/Spinner';
import Product from '../components/Product';

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  async function fetchProductData() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log(data)
      setPosts(data)
    } 
    catch (error) {
      console.log("Error in fetching data",error)
      setPosts([])
    }
    setLoading(false);
  }
  useEffect(()=>{
    fetchProductData()
  },[])

  //filter posts
  const filteredData = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="relative mb-3 px-3 md:px-0 mx-auto max-w-[1100px] mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search absolute left-4 md:left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input
          className="flex h-10 w-full rounded-[12px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-sm muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-9"
          placeholder="Search Products Here...."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    <div>
      {
        loading ? <Spinner/> :
        posts.length > 0 ?
        (<div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]'>
          {
          filteredData.map((post)=>{
            return <Product key={post.id} post={post}/>
          })
          }
        </div>) :
        <div className='flex justify-center items-center'><p>No Data Found</p></div>
      }
    </div>
    </div>
  )
}

export default Home