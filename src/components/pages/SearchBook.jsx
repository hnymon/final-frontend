import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

const SearchBook = ({ title }) => {
  const { keyword } = useParams();
  const [query, setQuery] = useState(keyword);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(1);
  const [documents, setDocuments] = useState(null);

  const callAPI = useCallback(async () => {
    const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&page=${page}`;
    const config = {
      headers: { Authorization: "KakaoAK 05377ae946110607a0d89dae94e81960" },
    };
    try {
      const result = await axios(url, config);
      setDocuments(result.data.documents);
      const total = result.data.meta.pageable_count;
      setLast(Math.ceil(total / 10));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [query, page]);

  useEffect(() => {
    // URL의 keyword 파라미터가 변경될 때마다 query를 업데이트
    setQuery(keyword);
  }, [keyword]);

  useEffect(() => {
    callAPI();
  }, [callAPI, query, page]);

  return (
    <div>
      <h1>{title}</h1>

      {documents === null ? (
        <h1>로딩중........</h1>
      ) : (
        <>
          {documents.length === 0 ? (
            <h2>검색된 목록이 없습니다.</h2>
          ) : (
            <div className="documents">
              {documents.map((d, index) => (
                <div className="box" key={`${d.isbn}-${index}`}>
                  <Link to={`/book-detail/${d.isbn}`}>
                    <img
                      src={d.thumbnail ? d.thumbnail : "http://via.placeholder.com/120X150"}
                      alt=""
                    />
                    <div className="ellipsis">{d.title}</div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          {/* paging */}
          {documents.length > 0 && (
            <div>
              <button
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={page === 1}
              >
                이전
              </button>
              <span style={{ margin: "10px" }}>
                {page}/{last}
              </span>
              <button
                onClick={() => setPage((prevPage) => Math.min(prevPage + 1, last))}
                disabled={page === last}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBook;
