import { getAllCharacters, getAllRoles, getAllFactions, getCurrentRoster, getAllWeapons, getAllServers, newRoster, putRosterName, getRosterName } from "../APIManager"
import { useEffect, useState } from "react"
import { RosterGrid } from "./RosterGrid"
import { ListContainer } from "./ListContainer"
import "./roster.css"
import { FilterContainer } from "./FilterContainer"
import { newRosterChoice, } from "../APIManager"
import { useNavigate } from "react-router-dom"
import { SearchFilter } from "./SearchFilter"

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
    const [newRosterPicks, setNewRosterPick] = useState([])
    const [editRosterCharacters, setEditCharacters] = useState([])
    let navigate = useNavigate()
    const [showText, setShowText] = useState(false)
    const [charId, setId] = useState(0)
    const [rosterName, setRosterName] = useState({})
    //we are capturing the new roster id when we first click add to roster and saving it to start roster  //pass those props ^
    let rosterID = localStorage.getItem("roster_id") //need this for the new array for the api
    let rosterIDNUMBER = JSON.parse(rosterID)
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
        [] //init get all stuff
    )
    useEffect(
        () => {
            const searchedChar = characters.filter(character => {
                return character.character_name.toLowerCase().startsWith(searchTerms.toLowerCase())  //make both lowercase so you can always find a match regardless of case
            })
            setSortedArr(searchedChar)
        },
        [searchTerms]//find what you put into the search bar and set that as sorted
    )
    useEffect(
        () => {
            let alphaCharacters = characters.sort((a, b) => a.character_name.localeCompare(b.character_name))
            setSortedArr(characters) ///this alphabet sort stopped working????  it's supposed to be alphaCharacters passed into it???? why is everything not working anymore -_- it works now but could break watchout
        },
        [characters]//sort them alphabetically honestly it's just to put the characters into a sorted array because that's where i want them for future sorting
    )
    useEffect(
        () => {
            if (rosterIDNUMBER) {
                getRosterName(rosterIDNUMBER).then((data) => { setRosterName(data) }
                )
            }
        },
        [rosterIDNUMBER]//find what you put into the search bar and set that as sorted
    )



    const handleRosterName = (event) => {
        ///we are gonna match the value of the text input here, 
        //and send it to the server as a put
        //check to see if a rosterID is available in storage first and do that, if not do nothing/display pop up saying make a selection to start a roster
        let newName = { ...rosterName }
        newName[event.target.name] = event.target.value
        if (rosterIDNUMBER) {
            putRosterName(rosterIDNUMBER, newName)
        }
        else {
            alert('Pick a character first please ok just do it')
        }
    }



    const handleSave = (click, newRosterPicks) => { //onclickingSave
        click.preventDefault()
        localStorage.removeItem("roster_id")
        const createRosterChoices = (cArr) => {
            let rosterChoiceArr = []
            for (const c of cArr) {  //there might be an easier way idk, this works.   iterating the array of players in roster and uses takes their character id to create a new object
                let right = c.id
                let nC = {
                    roster: rosterIDNUMBER,
                    character: 0
                }
                if (nC.character != right) {
                    nC.character = right
                    rosterChoiceArr.push(nC)
                } else { }
            } return rosterChoiceArr
        }//promise waits for all the promises to come back in an iterable before resolving
        const rosterToPost = createRosterChoices(newRosterPicks) //calls ^ 
        Promise.all(rosterToPost.map((r) => { newRosterChoice(r) })).then((result) => {
            console.log(result)
        })
        alert("Roster successfully saved")


    }
    const handleNewRoster = (e) => {
        e.preventDefault()
        localStorage.removeItem("roster_id")
        setNewRosterPick([])
        setEditCharacters([])
    }

    return <>
        <FilterContainer setFactionSearch={setFactionSearch} filterButton={filterButton} setFilterButton={setFilterButton} searchTerms={searchTerms} setSearchTerms={setSearchTerms}
            setRoleSearch={setRoleSearch} setPrimarySearch={setPrimarySearch} setServerSearch={setServerSearch} setSecondarySearch={setSecondarySearch}
            roleSearch={roleSearch} serverSearch={serverSearch} factionSearch={factionSearch} primarySearch={primarySearch} secondarySearch={secondarySearch}
            setSortedArr={setSortedArr} characters={characters} servers={servers} weapons={weapons} factions={factions} roles={roles} />
        <div className="save__div">
        <SearchFilter setSearchTerms={setSearchTerms} />
        
            <input type="text" className="roster_name" name="name" placeholder="name this roster ?" value={rosterName.name} onChange={(event) => handleRosterName(event)} />
            <button className="save__button" onClick={(click) => { handleSave(click, newRosterPicks) }}>Save Roster</button>
            <button onClick={(e) => handleNewRoster(e)
            } className="new__button">New Roster</button>
        </div>  <section className="body">
            <ListContainer editRosterCharacters={editRosterCharacters} showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} setNewRosterPick={setNewRosterPick} newRosterPicks={newRosterPicks} characters={sortedArr} servers={servers} weapons={weapons} factions={factions} roles={roles} />

            <div className="parent" >
                <RosterGrid showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}
                    setEditCharacters={setEditCharacters} editRosterCharacters={editRosterCharacters} rosterIDNUMBER={rosterIDNUMBER} characters={characters} newRosterPicks={newRosterPicks} setNewRosterPick={setNewRosterPick} /></div>

        </section>  </>
}
