import { useState } from "react";
import { useEffect } from "react";
import classes from "./KakaoMap.module.css";

const { kakao, daum } = window;

const CENTER_POS_Y = 37.64836248151049;
const CENTER_POS_X = 127.2455233464401;

const MAP_MARKER_CONTENT = "남양주 스카이";
let levelFlag = false;

const KakaoMap = (props) => {
  const [lat, setLat] = useState(CENTER_POS_Y);
  const [lng, setLng] = useState(CENTER_POS_X);
  const [address, setAddress] = useState();

  const posData = (data) => {
    props.onClickPosData(data);
  };

  const sample5_execDaumPostcode = () => {
    const geocoder = new daum.maps.services.Geocoder();

    new daum.Postcode({
      oncomplete: function (data) {
        const addr = data.address; // 최종 주소 변수

        // 주소 정보를 해당 필드에 넣는다.
        setAddress(addr);
        // 주소로 상세 정보를 검색
        geocoder.addressSearch(data.address, function (results, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === daum.maps.services.Status.OK) {
            const result = results[0]; //첫번째 결과의 값을 활용

            setLat(result.y);
            setLng(result.x);
          }
        });
      },
    }).open();
  };

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    let mapLevel = 5;
    if (!levelFlag) {
      mapLevel = 9;
      levelFlag = true;
    }

    const mapOption = {
      center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: mapLevel, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(lat, lng);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    const iwContent =
        '<div style="padding:5px;">' +
        MAP_MARKER_CONTENT +
        '<br><a href="https://map.kakao.com/link/map/' +
        MAP_MARKER_CONTENT +
        ',33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${},33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition = new kakao.maps.LatLng(CENTER_POS_Y, CENTER_POS_X); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map);

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      let latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      posData({ lat: latlng.getLat(), lng: latlng.getLng() });
    });

    var coords = new daum.maps.LatLng(lat, lng);
    map.relayout();
    // 지도 중심을 변경한다.
    map.setCenter(coords);
    // 마커를 결과값으로 받은 위치로 옮긴다.
    marker.setPosition(coords);
  }, [lat, lng]);

  return (
    <>
      <div
        id="map"
        style={{ width: "100%", height: "450px", borderRadius: "10px" }}
      ></div>
      <div className={classes.address_box}>
        <input
          type="button"
          className={classes.address_button}
          onClick={sample5_execDaumPostcode}
          value="주소 검색"
        />
        <span className={classes.current_address}>{"["}현재 주소{"]"} {address}</span>
      </div>
    </>
  );
};

export default KakaoMap;
