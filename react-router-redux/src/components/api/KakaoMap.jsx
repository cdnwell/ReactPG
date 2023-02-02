import { useEffect } from "react";

const { kakao } = window;

const CENTER_POS_X = 37.64836248151049;
const CENTER_POS_Y = 127.2455233464401;

const MAP_MARKER_CONTENT = "남양주 스카이";

const KakaoMap = (props) => {
  const posData = (data) => {
    props.onClickPosData(data);
  }
  
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(CENTER_POS_X, CENTER_POS_Y), // 지도의 중심좌표
      level: 9, // 지도의 확대 레벨
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
    var markerPosition = new kakao.maps.LatLng(CENTER_POS_X, CENTER_POS_Y);

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
      iwPosition = new kakao.maps.LatLng(CENTER_POS_X, CENTER_POS_Y); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map, marker);

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      let latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      posData({ lat : latlng.getLat(), lng : latlng.getLng()});
    });
  }, []);

  return <div id="map" style={{ width: "100%", height: "450px", borderRadius : '10px' }}></div>;
};

export default KakaoMap;
