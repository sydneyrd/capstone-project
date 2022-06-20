import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate =useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Home</Link>
            </li>
            <li className="navbar__item active"><Link className="navbar__link" to="/characters">Characters</Link></li>
            <li className="navbar__item active"><Link className="navbar__link"  to="/roster">Build a Roster</Link></li>
            <li className="navbar__item active"><Link className="navbar__link" to="/resources">Resources</Link></li>
            {
                localStorage.getItem("roster_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("roster_user")
                         localStorage.removeItem("roster_id") 
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
           
        </ul>
    )
}
