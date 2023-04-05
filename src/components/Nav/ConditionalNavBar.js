import { NavBar } from "./NavBar";
import { PublicNavBar } from "./PublicNavBar";
export const ConditionalNavBar = () => {
    const isAuthenticated = localStorage.getItem('roster_token') !== null;
  
    if (isAuthenticated) {
      return <NavBar />;
    } else {
      return <PublicNavBar />;
    }
  };
  