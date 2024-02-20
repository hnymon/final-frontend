import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
const LegendContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 4%;
  padding: 10px;

  p {
    margin: 0;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    img {
      margin-right: 10px;
    }
  }
`;

const KakaoMap = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [clickedAddress, setClickedAddress] = useState("");
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      const loadKakaoMapsSDK = () => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=e06a12caf9f1479fb96a03f060d86d4c&libraries=services&autoload=false";

          script.onload = () => {
            window.kakao.maps.load(() => {
              initMap(); // Kakao 지도 SDK 로드 후 지도 초기화 함수 호출
              resolve();
            });
          };

          script.onerror = () => {
            reject(new Error("Failed to load Kakao Maps SDK."));
          };

          document.head.appendChild(script);
        });
      };

      loadKakaoMapsSDK().catch((error) => {
        console.error(error);
      });
    }
  }, [modalIsOpen]);

  const initMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    setMap(map);

    displayCurrentLocationMarker(map);

    fetchDataAndDisplayMarkers(map);

    window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      moveCurrentLocationMarker(mouseEvent.latLng);
    });
  };
  // 도서관 마커를 찍어주는 const
  //  도서관 위치
  // const [dataList, setDataList] = useState([]);
  // console.log(dataList);
 const fetchDataAndDisplayMarkers = async (map) => {
  try {
    const response = await axios.get("/Library");
    const dataList = response.data.csvList; // 서버에서 받아온 데이터
    console.log(dataList);
    const markers = [];
    dataList.forEach((data) => {
      const markerPosition = new window.kakao.maps.LatLng(
        data.latitude,
        data.longitude
      );
      // // 마커 구분짓기 // 좀있다가 범헌
      let markerImage;

      switch (data.lbrrySe) {
        case "어린이도서관":
          markerImage = "/children1.png"; // 어린이도서관 마커 
          break;
        case "공공도서관":
          markerImage = "/publicLibrary.png"; // 공공도서관 마커 
          break;
        case "작은도서관":
          markerImage = "/small.png"; // 작은도서관 마커 이미지 
          break;
        case "학교도서관":
          markerImage = "/school.png";
        default:
          markerImage = "/default_library_marker.jpg"; 
      }
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: new window.kakao.maps.MarkerImage(markerImage, new window.kakao.maps.Size(30, 30)) // 마커 표시
      });
      marker.setMap(map);
      // 마커 클러스트
      
      const content = `
        <div class="wrap" style="background-color: white; border: 1px solid #ccc; padding: 10px;">
          <div class="info">
            <div class="title" style="font-size: 18px; font-weight: bold; color: #666; margin-bottom: 10px;">${data.lbrryNm}</div>
            <hr style="border-top: 1px solid #ccc; margin: 10px 0;"/>
            <div class="body" style="display: flex; align-items: center;">
              <div class="img" style="margin-right: 10px;">
                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70"/>
              </div>
              <div class="desc" style="flex-grow: 1;">
                <div class="ellipsis" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${data.rdnmadr}</div>
                <div class="jibun ellipsis" style="color: #666;">${data.phoneNumber}</div>
                <div><a href="${data.homepageUrl}" target="_blank" class="link" style="color: blue; text-decoration: none;">홈페이지</a></div>
              </div>
            </div>
          </div>
        </div>
      `;

     const overlay = new window.kakao.maps.CustomOverlay({
        clickable: true,
        content: content,
        map: null,
        position: marker.getPosition(),
        yAnchor: 0,
      });
      
      window.kakao.maps.event.addListener(marker, "click", function () {
        if (overlay.getMap() === null) {
          overlay.setMap(map);
        } else {
          overlay.setMap(null);
        }
      });
      // markers.push(marker);
    });

    // var clusterer = new window.kakao.maps.MarkerClusterer({
    //   map: map,
    //   averageCenter: true,
    //   disableClickZoom: true,
    //   minClusterSize: 2
    // });
  
    // clusterer.addMarkers(markers);
  
    // window.kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
    //   console.log('클러스터 클릭', cluster);
    // });
  
  
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


  //  도서관 위치
  // 현재위치를 직어주는 const
  const displayCurrentLocationMarker = (map) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentPos = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        // 현재 위치 마커에 이미지 적용
        const currentLocationMarkerImage = new window.kakao.maps.MarkerImage(
          "/Logo_n.png", // 현재 위치 마커 이미지 파일 경로
          new window.kakao.maps.Size(60, 60) // 마커 이미지 크기 설정
        );

        const currentLocationMarker = new window.kakao.maps.Marker({
          position: currentPos,
          image: currentLocationMarkerImage, // 현재위치 마커 이미지 적용
        });
        currentLocationMarker.setMap(map);
 
        setMarker(currentLocationMarker);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  };

  const moveCurrentLocationMarker = (latLng) => {
    if (marker) {
      marker.setMap(null);
      marker.setPosition(latLng);
      marker.setMap(map);
    }
  };
  // 현재위치 맵클릭시 마커이동 useEffect()
  useEffect(() => {
    if (map && marker) {
      const clickListener = window.kakao.maps.event.addListener(
        map,
        "click",
        (mouseEvent) => {
          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.coord2Address(
            mouseEvent.latLng.getLng(),
            mouseEvent.latLng.getLat(),
            (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const addr =
                  result[0]?.road_address?.address_name ||
                  result[0]?.address?.address_name;

                console.log("클릭한 위치의 주소:", addr);

                setClickedAddress(addr);
                if (marker) {
                  marker.setMap(null);
                  marker.setPosition(mouseEvent.latLng);
                  marker.setMap(map);
                }
              }
            }
          );
        }
      );

      return () => {
        if (clickListener) {
          window.kakao.maps.event.removeListener(clickListener);
        }
      };
    }
  }, [map, marker]);
  // 현재위치 geolocation
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const currentPos = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        if (map) {
          map.panTo(currentPos);

          if (marker) {
            marker.setMap(null);
            marker.setPosition(currentPos);
            marker.setMap(map);
          }
        }

        setClickedAddress("");
      } catch (error) {
        console.error("현재 위치를 가져오는 데 실패했습니다:", error);
      }
    };

    getCurrentLocation();
  }, [map, marker]);

  return (
    <div>
      
      {/* <button onClick={openModal}>지도 보기</button> */}
      <button style={{
          backgroundColor: '#FFC0CB',
          border: 'none',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          outline: 'none',
        }} onClick={openModal}>가까운 도서관 찾기</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            margin:0,
            padding:0,
            paddingTop:30,
            width: "70%", // 모달 창의 너비
            height: "60%", // 모달 창의 높이
            top: "50%", // 모달 상단의 위치 (50%는 중앙)
            left: "50%", // 모달 좌측의 위치 (50%는 중앙)
            transform: "translate(-50%, -50%)", // 정중앙 정렬을 위한 변환
            backgroundColor: '#FFC0CB' // 색 주변
          },
        }}
      >
       <> 
          <div
            id="map"
            style={{
              margin:0,
              padding:0,
              marginRight:100,
              width: "70%",
              height: "100%",
              left: "10px",
              top: "-20px",
            }}
          ></div>
          <LegendContainer>
            <p><img src="/school.png" alt="" height={"50px"} />&nbsp;&nbsp;대학교 도서관입니다</p>
            <p><img src="/small.png" alt="" height={"50px"} />&nbsp;&nbsp;작은도서관입니다</p>
            <p><img src="/children1.png" alt="" height={"50px"} />&nbsp;&nbsp;어린이도서관입니다</p>
            <p><img src="/publicLibrary.png" alt="" height={"45px"} />&nbsp;&nbsp;&nbsp;공공도서관입니다</p>
          </LegendContainer>
        </>
        <button
          onClick={closeModal}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          X
        </button>
      </Modal>
    </div>
  );
};

export default KakaoMap;
