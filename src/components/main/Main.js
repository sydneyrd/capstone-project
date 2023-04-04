import { Link } from "react-router-dom"

export const Main = () => {
    return <div className="parent">
        <div>
            <Link to="/public">View Public Boards</Link>
        </div>
        <div className="about--link">
            <Link to="/faq">faq and contact</Link>
        </div>
        <div className="login--link">
            <Link to="/login">login</Link>
            or
            <Link to="/register">register</Link>
        </div>
    </div>
}