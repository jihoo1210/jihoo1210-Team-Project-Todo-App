import React, { useState } from "react";
import call from './ApiService'


const LoginAndResister = () => {
    const[email, setEmail] = useState("")
    const[username, setUsername] = useState("")
    const[nickname, setNickname] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState("")

    // 회원가입 함수
    const resisterEventHandler = (event) => {

        // 기본 동작 막기
        event.preventDefault()

        // api 요청
        call("/auth/signup", "POST", {
            /* 여기 */
            // 객체 안에 객체 바로 넣어졌었고 POST라 보내기만 하면 되니까 결론 : 가장 깔끔한 형태로 변경
            ///////////////모든 POST 요청 바디 형태 통일 했음////////////////
            email,
            username,
            nickname,
            password
        })

        // 성공 로직(추가 예정)
        
        // 필요 없는 정보 초기화
        .then(response => {
            /* 여기 */
            // 성공적으로 회원가입이 완료되면
            // 필요한 정보 초기화 Email 추가했음
            setEmail("")
            setUsername("")
            setNickname("")
            setPassword("")
        })
    
        // 실패 로직 400
        .catch(error => {
            const errorBody = error

            console.log(errorBody)

            if(errorBody.error) {
                setError(error)
            }
        })
    }

    // 로그인 함수
    const loginEventHandler = (event) => {
        // 기본 동작 막기
        event.preventDefault()

        // api 요청
        call("/auth/signin", "POST", {
            email,
            password
        })
        // 성공 로직

    
        .then(response => {
            if(response.result.token) {
                sessionStorage.setItem("ACCESS_TOKEN", response.result.token)
                /* 여기 수정 */
                //토큰 저장 + 사용자 정보까지 한번에 표시
                //인증된 사용자에게 보여줄 정보 else 문 밑이였고 오타처리함
                setUsername(response.result.username)
                setNickname(response.result.nickname)
            } else {
                return Promise.reject(response)
            }
        })
        
        // 실패 로직
        .catch(error => {
            // 이미 파싱된 정보를 받음 (axios 자동파싱)
            const errorBody = error
            console.log(errorBody)
            if(errorBody.error) {
                setError(error)
            }
        })
    }

    // 로그아웃 (token 삭제)
    const logoutEventHandler = (event) => {
        event.preventDefault()
        sessionStorage.removeItem("ACCESS_TOKEN")
        // 로그인 페이지로 이동하는 로직 추가 예정
    }

return (
    <>
    </> 
    )
}

export default LoginAndResister