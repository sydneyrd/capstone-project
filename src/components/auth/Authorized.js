import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("roster_token")) {
        return children
    }
    else {
        return <Navigate
            to={`/nope/${location.search}`}
            replace
            state={{ location }} />
    }
}
