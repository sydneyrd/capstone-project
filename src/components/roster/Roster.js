import { getAllRoles, getAllFactions, getAllWeapons, getAllServers, } from "../managers/ResourceManager"
import {getAllCharacters, getFilteredCharacters} from "../managers/CharacterManager"
import { newRosterChoice, putRosterName, getRosterName   } from "../managers/RosterManager"
import { useEffect, useState } from "react"
import { RosterGrid } from "./RosterGrid"
import { ListContainer } from "./ListContainer"
import "./roster.css"
import { FilterContainer } from "./FilterContainer"
import { useNavigate } from "react-router-dom"

import { useContext } from "react"
import { editContext } from "../views/ApplicationViews"
export const Roster = () => {
    const [characters, setCharacters] = useState([])
    const [servers, setServers] = useState([])
    const [weapons, setWeapons] = useState([])
    const [factions, setFactions] = useState([])
    const [roles, setRoles] = useState([])
    const [sortedArr, setSortedArr] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filterButton, setFilterButton] = useState(false)
    const [factionSearch, setFactionSearch] = useState(0)
    const [roleSearch, setRoleSearch] = useState(0)
    const [serverSearch, setServerSearch] = useState(0)
    const [primarySearch, setPrimarySearch] = useState(0)
    const [secondarySearch, setSecondarySearch] = useState(0)
    const [newRosterPicks, setNewRosterPick] = useState([]);
    const [editRosterCharacters, setEditCharacters] = useState([]);
    const { currentEditRoster, setCurrentEditRoster} = useContext(editContext);
    const [showText, setShowText] = useState(false);
    const [charId, setId] = useState(0);
    const [rosterName, setRosterName] = useState({
        name: "",
        roster: currentEditRoster
    });
    
    //we are capturing the new roster id when we first click add to roster and saving it to start roster  //pass those props ^
    let rosterIDNUMBER = currentEditRoster

    const setCharId = e => {
        setId(parseInt(e.target.id))
    } //sets identifier to get correct detail info
    const handleMouseEnter = e => {

        setShowText(true)
    } //show pop up element when mouse
    const handleMouseLeave = e => {
        // e.target.style.background = "transparent"
        setShowText(false)
        setId(0)
    }//removes the pop up and identifier when mouse leaves

    useEffect(
        () => {
            getAllCharacters(setCharacters)
                .then(() => {
                    getAllRoles(setRoles)
                        .then(() => {
                            getAllFactions(setFactions)
                        })
                        .then(() => {
                            getAllWeapons(setWeapons)
                        })
                        .then(() => {
                            getAllServers(setServers)
                        })
                })
        },
        [] 
    )

//if i don't use this initial use effect the character details don't appear on screen?   um ok i'll look at it later
    useEffect(
        () => {
            let alphaCharacters = characters.sort((a, b) => a.character_name.localeCompare(b.character_name))
            setSortedArr(characters) 
        },
        [characters]
    )
    useEffect(
        () => {
            if (rosterIDNUMBER) {
                getRosterName(rosterIDNUMBER).then((data) => { setRosterName(data) }
                )
            }
            else {}
        },
        [rosterIDNUMBER]
    )



    const handleRosterName = (event) => {
        let newName = { ...rosterName } //copy the old name value
        newName[event.target.name] = event.target.value //update the name value
        if (rosterIDNUMBER) {
            putRosterName(rosterIDNUMBER, newName) //put the new name value to the api
        }
        else {
            alert('Pick a character first please ok just do it')
        }
    }

    // const handleSave = (click, newRosterPicks) => { //onclickingSave
    //     click.preventDefault()
    //     const createRosterChoices = (cArr) => {
    //         let rosterChoiceArr = []
    //         for (const c of cArr) {  //there might be an easier way idk, this works.   iterating the array of players in roster and uses takes their character id to create a new object
    //             let right = c.id
    //             let nC = {
    //                 roster: rosterIDNUMBER,
    //                 character: 0
    //             }
    //             if (nC.character != right) {
    //                 nC.character = right
    //                 rosterChoiceArr.push(nC)
    //             } else { }
    //         } return rosterChoiceArr
    //     }//promise waits for all the promises to come back in an iterable before resolving
    //     const rosterToPost = createRosterChoices(newRosterPicks) //calls ^ 
    //     Promise.all(rosterToPost.map((r) => { newRosterChoice(r) })).then((result) => {
    //         console.log(result)
    //     })
    //     alert("Roster successfully saved")
    // }

    const handleNewRoster = (e) => {
        e.preventDefault()
        setCurrentEditRoster(0)
        setNewRosterPick([])
        setEditCharacters([])
    }
    useEffect(()=>{
        let url = ""
        if (roleSearch !== 0) {
            url += `role=${roleSearch}&`
        }
        if (factionSearch !== 0) {
            url += `faction=${factionSearch}&`
        }
        if (serverSearch !== 0) {
            url += `server=${serverSearch}&`
        }
        if (primarySearch !== 0) {
            url += `primary_weapon=${primarySearch}&`
        }
        if (secondarySearch !== 0) {
            url += `secondary_weapon=${secondarySearch}&`
        }
        
        if (searchTerms.length > 0) {
        let search_text = searchTerms.slice()
            let formatted_search_text = search_text.replace(' ', '%20')
            url+= `search_text=${formatted_search_text}`
        }
        getFilteredCharacters(url, setSortedArr)
    
    }, [roleSearch, primarySearch, serverSearch, secondarySearch, factionSearch, searchTerms])
    
    return <main className="main--container--roster">
        <div className="search--container--roster">
        <FilterContainer setFactionSearch={setFactionSearch} filterButton={filterButton} setFilterButton={setFilterButton} searchTerms={searchTerms} setSearchTerms={setSearchTerms}
            setRoleSearch={setRoleSearch} setPrimarySearch={setPrimarySearch} setServerSearch={setServerSearch} setSecondarySearch={setSecondarySearch}
            roleSearch={roleSearch} serverSearch={serverSearch} factionSearch={factionSearch} primarySearch={primarySearch} secondarySearch={secondarySearch}
            setSortedArr={setSortedArr} characters={characters} servers={servers} weapons={weapons} factions={factions} roles={roles} />
</div>

        <div className="save__div">
            <input type="text" className="roster_name" name="name" placeholder="name this roster ?" defaultValue={rosterName.name} onChange={(event) => handleRosterName(event)} />
            {/* <button className="save__button" onClick={(click) => { handleSave(click, newRosterPicks) }}>Save Roster</button> */}
            <button onClick={(e) => handleNewRoster(e)
            } className="new__button">New Roster</button>
        </div> 
         <section className="body">
            <ListContainer
            rosterIDNUMBER={rosterIDNUMBER} setEditCharacters={setEditCharacters} setSearchTerms={setSearchTerms}editRosterCharacters={editRosterCharacters} showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} setNewRosterPick={setNewRosterPick} newRosterPicks={newRosterPicks} characters={sortedArr} servers={servers} weapons={weapons} factions={factions} roles={roles} />
            

            <div className="parent" >
                <RosterGrid showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}
                    setEditCharacters={setEditCharacters} editRosterCharacters={editRosterCharacters} rosterIDNUMBER={rosterIDNUMBER} characters={characters} newRosterPicks={newRosterPicks} setNewRosterPick={setNewRosterPick} /></div>

        </section>  </main>
}
