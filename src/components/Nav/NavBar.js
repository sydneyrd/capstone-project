import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate =useNavigate()

    return (
        <ul className="navbar">
            
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            <li className="navbar__item active"><Link className="navbar__link" to="/characters">My Characters</Link></li>
            <li className="navbar__item active"><Link className="navbar__link"  to="/roster">Create Roster</Link></li>
            <li className="navbar__item active"><Link className="navbar__link" to="/resources">Create War Board</Link></li>
            <li className="navbar__item active"><Link className="navbar__link" to="/public">View Public Boards</Link></li><li className="navbar__item active">
                <Link className="navbar__link" to="/faq">FAQ</Link>
            </li>
            {
                localStorage.getItem("roster_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("roster_user")
                        localStorage.removeItem("roster_token") 
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        
        </ul>
    )
}
