// import { Link } from "react-router-dom"

// export const Main = () => {
//     return <div className="parent">
//         <div>
//             <Link to="/public">View Public Boards</Link>
//         </div>
//         <div className="about--link">
//             <Link to="/faq">faq </Link>
//         </div>
//         <div className="login--link">
//             <Link to="/login">login</Link>
//             or
//             <Link to="/register">register</Link>
//         </div>
//     </div>
// }

import { Link } from "react-router-dom"
import "./main.css"

export const Main = () => {
    return (
        <div className="main-container">
            <h1 className="main-title">Dead Game Roster</h1>
            <p className="main-tagline">Track player performance in war</p>
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
