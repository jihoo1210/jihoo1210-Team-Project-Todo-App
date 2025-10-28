import { API_BASE_URL } from "./app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN"

export function call(api, method, request) {

    let headers = new Headers({
      "Content-Type": "application/json"
    })
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if(accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken)
    }

  let options = {
    "headers": headers,
    url: API_BASE_URL + api,
    method: method,
  };
  console.log(...headers)
  if (request) {
    // GET method
    options.body = JSON.stringify(request);0
  }
return fetch(options.url, options)
  .then(response => {
  
      if (!response.ok) {
          return Promise.reject(response);
      }
  
      return response.json();
      }
  )
.catch(error => {
    if (error.status === 403) {
        window.location.href = "/login";
    }
    return Promise.reject(error);
    });
}

export function signin(userDTO) {
return call("/auth/signin", "POST", userDTO)
.then(response => {
    
    if (response.token) {
            localStorage.setItem(ACCESS_TOKEN, response.token);
            window.location.href = "/";
        }
    })
}

export function signout() {
    localStorage.setItem(ACCESS_TOKEN, null)
    window.location.href = "/login"
}

export function Createaccount(userDTO) {
    return call("/auth/signup", "POST", userDTO;
}


export function  


