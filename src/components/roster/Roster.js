import { getAllRoles, getAllFactions, getAllWeapons, getAllServers, } from "../managers/ResourceManager"
import {getAllCharacters, getFilteredCharacters} from "../managers/CharacterManager"
import { putRosterName, getRosterName, newRoster   } from "../managers/RosterManager"
import { useEffect, useState } from "react"
import { RosterGrid } from "./RosterGrid"
import { ListContainer } from "./ListContainer"
import "./roster.css"
import { FilterContainer } from "./FilterContainer"
import { useContext } from "react"
import { editContext } from "../views/ApplicationViews"
import { getUserRosters } from "../managers/UserManager"

export const Roster = () => {
    const [characters, setCharacters] = useState([]);
    const [servers, setServers] = useState([]);
    const [weapons, setWeapons] = useState([]);
    const [factions, setFactions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [sortedArr, setSortedArr] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");
    const [filterButton, setFilterButton] = useState(false);
    const [factionSearch, setFactionSearch] = useState(0);
    const [roleSearch, setRoleSearch] = useState(0);
    const [serverSearch, setServerSearch] = useState(0);
    const [primarySearch, setPrimarySearch] = useState(0);
    const [secondarySearch, setSecondarySearch] = useState(0);
    const [newRosterPicks, setNewRosterPick] = useState([]);
    const [editRosterCharacters, setEditCharacters] = useState([]);
    const { currentEditRoster, setCurrentEditRoster} = useContext(editContext);
    const [showText, setShowText] = useState(false);
    const [charId, setId] = useState(0);
    const [rosterName, setRosterName] = useState({
        name: "",
        roster: currentEditRoster
    });
    const [userRosters, setUserRosters] = useState([]);
    
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
                        }).then(() => {
                            getUserRosters(setUserRosters)
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
            if (rosterIDNUMBER > 0) {
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

const createNestedArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
    };

    const nestedEditRosterCharacters = createNestedArray
    (editRosterCharacters, 5);
const handleNewRoster = (e) => {
        e.preventDefault()
        setCurrentEditRoster(0)
        newRoster().then((newRosterObj) => { //posts the new roster object to the api
            setCurrentEditRoster(newRosterObj.id)})
        setNewRosterPick([])
        setEditCharacters([])
    }
    useEffect(() => {
        if (currentEditRoster > 0) {
          
        }
    }, [currentEditRoster])
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
    
    return <main className="main--container--roster"><section className="body">
        <div className="search--container--roster">
        <FilterContainer setFactionSearch={setFactionSearch} filterButton={filterButton} setFilterButton={setFilterButton} searchTerms={searchTerms} setSearchTerms={setSearchTerms}
            setRoleSearch={setRoleSearch} setPrimarySearch={setPrimarySearch} setServerSearch={setServerSearch} setSecondarySearch={setSecondarySearch}
            roleSearch={roleSearch} serverSearch={serverSearch} factionSearch={factionSearch} primarySearch={primarySearch} secondarySearch={secondarySearch}
            setSortedArr={setSortedArr} characters={characters} servers={servers} weapons={weapons} factions={factions} roles={roles} />

   <div className="save__div">
            <button  onClick={(e) => handleNewRoster(e)
            } className="new__button">create a new roster</button><div className="roster__select">
            <span>OR</span>{userRosters.length > 0 ? <select className="roster__select" onChange={(e) => setCurrentEditRoster(parseInt(e.target.value))}>
                <option value="0">Edit Saved Roster</option>
                {userRosters.map((roster) => {
                    return <option key={roster.id} value={roster.id}>{roster.name ?
                    `${roster.name}` 
                : `untitled roster #${roster.id}` 
                }</option>
                })}
            </select> : <></>}</div>
        </div> </div>
        
         
            <ListContainer
            nestedEditRosterCharacters={nestedEditRosterCharacters} 
            rosterIDNUMBER={rosterIDNUMBER} setEditCharacters={setEditCharacters} setSearchTerms={setSearchTerms}editRosterCharacters={editRosterCharacters} showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} setNewRosterPick={setNewRosterPick} newRosterPicks={newRosterPicks} characters={sortedArr} servers={servers} weapons={weapons} factions={factions} roles={roles} />
            
            <div className="grid--name--container"> <div className="name--div">
<input type="text" className="roster_name" name="name" placeholder="give this roster a cool name ?" defaultValue={rosterName.name} onChange={(event) => handleRosterName(event)} />
            </div>
            
            <div className="parent" >
                <RosterGrid nestedEditRosterCharacters={nestedEditRosterCharacters} showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}
                    setEditCharacters={setEditCharacters} editRosterCharacters={editRosterCharacters} rosterIDNUMBER={rosterIDNUMBER} characters={characters} newRosterPicks={newRosterPicks} setNewRosterPick={setNewRosterPick} /></div></div>

                 

        </section>  </main>
}
