import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import Pagination from '../components/Pagination';
import Blogs from '../components/Blogs';
import Header from '../components/Header';

const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.pathname.split("/").at(-1);
  return (
    <div>
      <Header/>
      <div>
        <button onClick={()=>navigate(-1)}>Back</button>
        <h2>Blogs on <span>{category}</span></h2>
      </div>
      <Blogs/>
      <Pagination/>
    </div>
  )
}

export default CategoryPage