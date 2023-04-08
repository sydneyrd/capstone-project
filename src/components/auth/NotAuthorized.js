import { Link } from "react-router-dom";
import "./auth.css";
export const NotAuthorized = () => {
    return (
        <div className="sorry--charlie">
        <h1>Not Authorized</h1>
        <h3>You are not authorized to view this page.</h3>

        
  <h2>
  If you want to do stuff please{' '}
  <Link to="/register">register for an account</Link></h2>
  <h2>
  or <Link to="/login">login</Link> if you already have an account.
        </h2>(っ °Д °;)っ</div>
    );
}