export const loginUser = (user) => {
    return fetch("http://127.0.0.1:8000/login", {
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
    return fetch("http://127.0.0.1:8000/register", {
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

