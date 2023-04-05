import { Link } from "react-router-dom"
import "./main.css"

export const Main = () => {
    return (
        <div className="main-container">
            <img src="./logo-no-background.png" alt="Your Logo" className="logo" />
            <div className="main-links">
                <Link className="main-button" to="/public">View Public Boards</Link>
                <Link className="main-button" to="/faq">FAQ</Link>
                <div className="login-register">
                    <Link className="main-button" to="/login">Login</Link>
                    <span>or</span>
                    <Link className="main-button" to="/register">Register</Link>
                </div>
            </div>
        </div>
    )
}
