import axios from "axios";

const ACCESS_TOKEN = "ACCESS_TOKEN";
const API_BASE_URL = "http://localhost:8080"; // 백엔드 주소

// axios 요청 함수
export const call = async (api, method, request) => {
    const url = API_BASE_URL + api;

    // token 확인
    const token = sessionStorage.getItem(ACCESS_TOKEN);

    // 요청 옵션
    const config = {

        /*여기*/
        //method: method
        //url: url 중복기재 방지 위해 축약형 사용 해야함
        method,
        url,
        headers: {
            "Content-Type": "application/json",
            ...(token && token !== "null" && { Authorization: `Bearer ${token}` }),
        },
        ...(request !== undefined ? { data: request } : {}),
    };

    return axios(config)
        .then((response) => response.data)
        .catch((error) => {
            console.log("error", error); // 테스트용 콘솔
            const data = error && error.response && error.response.data; // response 안에 http 요청 body(data) 들어있음

            // 403 에러는 로그인 페이지로 이동
            if (error.response && error.response.status === 403) {
                console.log("403 에러 입니다.", data?.error);
                alert("로그인이 필요합니다.");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000); // 1초 줌
            }

            // 403 이외 예외 처리
            return Promise.reject(data?.error || error.message);
        });
};

