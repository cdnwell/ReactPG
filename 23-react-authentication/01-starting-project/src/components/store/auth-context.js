import React, { useCallback, useEffect, useState } from "react";

// 타이머 전역변수로 선언
let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// 헬퍼 함수
const calculateRemainingTime = (expirationTime) => {
  // 남은 시간은 밀리 세컨드로
  const currentTime = new Date().getTime(); // 현재 타임 스탬프, 밀리 세컨드로
  // 만료 시간은 문자열이 된다.
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

// 헬퍼 함수
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600000) {
    // 토큰이 아니라 널을 리턴합니다.
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  // 남은 시간이 있어서 유효한 토큰이 잇다면 그때는 저장된 토큰을 반환합니다.
  // 그리고 저장된 토큰 뿐만아니라 남은 시간도 리턴해 적절한 타이머가 설정 가능하게 합니다.
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
    // 타이머 설정은 여기서 할 수 없다.
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, expirationTime) => {
    // 토근 저장
    // 브라우저에 내장된 API
    // 키 밸류 쌍을 저장함
    // 로컬 저장소는 기본 데이터만 저장할 수 있어 객체를 저장하고 싶다면
    // 우선 데이터를 JSON으로 바꿔야 합니다. 그럼 문자열이 되서 저장가능해집니다.
    setToken(token);
    localStorage.setItem("token", token);
    // 로그인 할 때마다 만료 시간을 저장합니다.
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    // 타이머 설정
    // 타이머가 만료되면 사용자를 로그아웃합니다.
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    // 로그아웃을 했다면 타이머를 없애준다.
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
