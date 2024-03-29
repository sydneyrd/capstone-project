const apiKey = process.env.REACT_APP_API;




export const loginUser = (user) => {
    return fetch(`${apiKey}
/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}
export const registerUser = (user) => {
    return fetch(`${apiKey}
/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const fetchCsrfToken = async () => {
    const response = await fetch('http://127.0.0.1:8000/csrf', {
      credentials: 'include',
    });
    const data = await response.json();
    return data.csrf_token;
  };

