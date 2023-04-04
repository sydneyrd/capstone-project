import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"

export const PublicNavBar = () => {
    const navigate =useNavigate()

    return (
        <ul className="navbar">
            
            
            <li className="navbar__item active"><Link className="navbar__link" to="/public">View Public Boards</Link></li><li className="navbar__item active">
                <Link className="navbar__link" to="/faq">FAQ</Link>
            </li>
            <li className="navbar__item active"><Link className="navbar__link" to="/login">Login</Link></li>
            <li className="navbar__item active"><Link className="navbar__link" to="/register">Register</Link></li>
            
        
        </ul>
    )
}
