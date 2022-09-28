import { getUserbyId } from "../APIManager"
import { Link, Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { Home } from "../Home/HomePage"
import { Character } from "../character/Character"
import { Roster } from "../roster/Roster"
import {CalculatorContainer} from "../Calculator/CalculatorContainer"
import {ViewStats} from "../ViewStats/ViewStats"
import { useState } from "react"
import { CalculateByLine } from "../Calculator/CalculateByLine"
import { CharacterDetails } from "../character/CharacterDetails"
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
       <Route path="/resources" element={<CalculatorContainer />} />
       <Route path="/calculate/new" element={<CalculateByLine />} />
       <Route path="resources/:calculatedRosterId/view" element={ <ViewStats />} />
       <Route path="character/:characterId" element={<CharacterDetails />} />
      </Route>
    

    </Routes>  
}


