import { getUserbyId } from "../APIManager"
import { Link, Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { Home } from "../Home/HomePage"
import { Character } from "../character/Character"
import { Roster } from "../roster/Roster"
export const ApplicationViews = () => {



   
   
   
   
   
   
    return   <Routes>

        <Route path="/" element={
                <>
                    

                    <Outlet />
                </>
            }>
                
                <Route path="/home" element={< Home />} />
       <Route path="/profile" element={ <Profile />} />
       <Route path="/characters" element={<Character />} />
       <Route path="/roster" element={<Roster />} />
      
      </Route>
    

    </Routes>  
}


