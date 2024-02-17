import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function ReSearchBar(props) {
  const { alKey } = props;
  console.log(alKey)
  const navigate = useNavigate();
  const [search, setSearch] = React.useState({
    keyword:"",
  });
  // alKey가 변경될 때 또는 컴포넌트가 처음 렌더링될 때 keyword를 초기화합니다.
  React.useEffect(() => {
    setSearch((prevSearch) => ({ ...prevSearch, keyword: "" }));
  }, [alKey]);
  const handleSearch = (event) => {
    event.preventDefault();
    const {keyword} = search;
    if(keyword ===""){
      alert("검색어를 입력하세요")
      return;
    }
    navigate(`/book-search/${alKey} ${keyword}`);
  };
  
  const handleKeywordChange = (event) => {
    const keyword = event.target.value;
    setSearch((prevSearch) => ({ ...prevSearch, keyword }));
  };
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, height: 20,border: '2px solid pink', borderRadius: '8px',}}
      onSubmit={handleSearch}
    >
      <InputBase
        name="search"
        value={search.keyword}
        onChange={handleKeywordChange}
        sx={{ ml: 1, flex: 1}}
        placeholder={"\""+alKey+"\""+" 결과내 재검색"}
        inputProps={{ 'aria-label': 'search google maps' }}
        style={{marginLeft:"20px"}}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
