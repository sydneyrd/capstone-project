import { Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Profile } from "../profile/Profile"

import { Character } from "../character/Character"
import { Roster } from "../roster/Roster"
import { CalculatorContainer } from "../Calculator/CalculatorContainer"
import { ViewStats } from "../ViewStats/ViewStats"
import { useState, createContext } from "react"
import { CharacterDetails } from "../character/CharacterDetails"
import { BaseStatContainer } from "../ViewStats/BaseStatContainer"

export const editContext = createContext();
export const calculateContext = createContext();

export const ApplicationViews = () => {
    const [currentEditRoster, setCurrentEditRoster] = useState(0);
    const [currentCalculateRoster, setCurrentCalculateRoster] = useState(0);
    return (
        <editContext.Provider value={{ currentEditRoster, setCurrentEditRoster }}>
            {/* Provide the second context value to child components using a Provider component */}
            <calculateContext.Provider value={{ currentCalculateRoster, setCurrentCalculateRoster }}><Routes>

                <Route path="/" element={
                    <>
                        <Outlet />
                    </>
                }>
                    
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/characters" element={<Character />} />
                    <Route path="/roster" element={<Roster />} />
                    <Route path="/resources" element={<CalculatorContainer />} />
                    <Route path="resources/:calculatedRosterId/view" element={<ViewStats />} />
                    <Route path='resources/edit/:calculatedRosterId' element={<BaseStatContainer />} />
                    <Route path="character/:characterId" element={<CharacterDetails />} />
                </Route>
            </Routes>  </calculateContext.Provider>
        </editContext.Provider>
    );
}


