import axios from "axios";
import "../../KakaoMap.css";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const kakao = window.kakao;
  const [keyword, setKeyword] = useState("");
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [info, setInfo] = useState(null);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])
  useEffect(() => {
    if (!map || !keyword) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, keyword]);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    // 검색 버튼 클릭에 대한 추가 로직을 여기에 추가할 수 있습니다.
  };

  // 자식 노드를 모두 제거하는 함수
  const removeAllChildNods = (el) => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  };

  // 검색 결과 항목을 가져오는 함수
  const getListItem = (index, places) => {
    // 여기에 검색 결과 항목 생성 로직을 추가하세요.
  };

   // 서점 정보 가지고오기 api
   useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = '7074597a68726a733636776a574653';
        const apiUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulLibraryBookRentNumInfo/1/5/`;
        const response = await axios.get(apiUrl); 
        const bookstoreData = response.data;// 가져온 데이터를 이용하여 처리
        // console.log(bookstoreData); // 데이터 잘찍히는지 확인
        //서점 데이터를 가지고 마커 데이터 형식으로 변환
        const data = bookstoreData.SeoulLibraryBookRentNumInfo.row;
          if(data){
            const marker = data.map((item)=>{
            const position = {
              lat: parseFloat(item.LAT),
              lng: parseFloat(item.LNG),
            };

          const content = item.STORE_NAME // 또는 다른 필드에 맞게 수정

          return { position, content };
        }); 
          setMarkers(marker);
          console.log(data);
          console.log(marker);
        const bounds = new kakao.maps.LatLngBounds();
        marker.forEach((marker)=>{
          bounds.extend(new kakao.maps.LatLng(marker.position.lat,marker.position.lng));
        });
        map.setBounds(bounds);
        }else{
          console.error("error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[map]);
//  


  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={handleKeywordChange}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>

      <div style={{ display: "flex" }}>
        <Map
          center={state.center}
          id="map_id"
          style={{
            width: "40%",
            height: "440px",
            position: "relative",
            overflow: "hidden",
            zIndex: 0, // 숫자가 높으면 높을수록 화면에 높게 표시됨 안쪽에 배치할려면 -1해주면된다
          }}
          level={3}
          onCreate={setMap}
        >
          {/* {markers.map((marker, index) => (
            <MapMarker
              key={`marker-${index}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 27,
                    y: 69,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                },
              }}
            >
              {info && info.content === marker.content && (
                <div style={{ color: "#" }}>{marker.content}</div>
              )}
            </MapMarker>
          ))} */}
          {/* 현재위치 찍어줌 */}
          {!state.isLoading && (
          <MapMarker position={state.center}> 
          </MapMarker> //현재위치 찍어주는놈
        )}
        </Map>
        
        <div id="menu_wrap" className="bg_white" >
          <ul id="placesList">
            {markers.map((marker, index) => (
              <li key={index}>{marker.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
