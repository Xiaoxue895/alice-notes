import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkSearchNotes, thunkSearchNotesByCategory } from '../../redux/notes';
import { Link } from 'react-router-dom';
import "./SearchBar.css"

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const categories = ['工作', '生活', '学习', '其他']; 


  const handleSearch = (e) => {
    // console.log("Query before search:", query);
    e.preventDefault();
    if (!query) {
      return;
    }
    if (query) {
      dispatch(thunkSearchNotes(query)); 
      setQuery(""); 
    }
    navigate(`/notes/search/results?query=${query}`); 
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}> 
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}  
          placeholder="按内容搜索你的笔记"
        />
        <button type="submit">Search</button> 
      </form>
      <div className="categories">
        <p>按类别搜索你的笔记</p>
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat}`} 
            className="category-btn"
            onClick={() => dispatch(thunkSearchNotesByCategory(cat))} 
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;


