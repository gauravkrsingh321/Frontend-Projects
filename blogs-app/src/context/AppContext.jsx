import { createContext, useState } from "react";
import { baseUrl } from "../BaseUrl";
import { useNavigate } from "react-router";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [loading,setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate();

    async function fetchBlogsPosts(page=1,tag=null,category) {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag) {
            url += `&tag=${tag}`;
        }
        if(category) {
            url += `&category=${category}`;
        }
        try {
            const result = await fetch(url);
            const data = await result.json();
            if(!data.posts || data.posts.length === 0) {
                throw new Error("Something Went Wrong");
            }
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } 
        catch(error) {
            console.log("Error in fetching data");
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }

    function handlePageChange(page) {
        navigate({search: `?page=${page}`})
        setPage(page);
    }

    const objValue = {
        loading,
        setLoading,
        posts,
        setPosts,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogsPosts,
        handlePageChange
    };

    return (
        <AppContext.Provider value={objValue}>
            {children}
        </AppContext.Provider>
    )
}