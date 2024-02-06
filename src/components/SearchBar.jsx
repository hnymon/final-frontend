import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState({
    keyword:"",
  });
  const handleSearch = (event) => {
    event.preventDefault();
    const {keyword} = search;
    if(keyword ===""){
      alert("검색어를 입력하세요")
      return;
    }
    navigate(`/book-search/${keyword}`);
  };

  const handleKeywordChange = (event) => {
    const keyword = event.target.value;
    setSearch((prevSearch) => ({ ...prevSearch, keyword }));
  };
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, border: '2px solid pink', borderRadius: '8px',}}
      onSubmit={handleSearch}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
      </IconButton>
      <InputBase
        name="search"
        value={search.keyword}
        onChange={handleKeywordChange}
        sx={{ ml: 1, flex: 1}}
        placeholder="책 검색"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
