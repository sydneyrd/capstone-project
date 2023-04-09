import "./results.css"
import { RoleSelect } from "../character/Role"
import { getAllRoles } from "../managers/ResourceManager"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const StatFilters = ({players, setGroup, setBase, setFilteredPlayers, sortByArmy, sortByGroup}) => {
    const [roles, setRoles] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        getAllRoles(setRoles);
    }, []);

    function compareStat(a, b, stat) {
        const compareValue = b[stat] - a[stat];
        return sortOrder === 'asc' ? -compareValue : compareValue;
    }

    function sortStat(stat) {
        setBase(false);
        setGroup(false);
        const copy = [...players];
        copy.sort((a, b) => compareStat(a, b, stat));
        setFilteredPlayers(copy);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    function roleFilter(event) {
        event.preventDefault();
        setGroup(false);
        const copy = [...players];
        const rolePlayers = copy.filter(e => e?.character?.role === parseInt(event.target.value));
        setFilteredPlayers(rolePlayers);
        setSortOrder('desc');
    }

    function handleReset(event) {
        event.preventDefault();
        const copy = [...players];
        setFilteredPlayers(copy);
        setGroup(false);
        setSortOrder('desc');
    }

    return (
        <>
            <Link to="/resources/edit/{}"></Link>
            <div>
                <button className='button-84' onClick={click => sortByGroup(click)}>Group</button>
                <button className='button-84' onClick={click => sortByArmy(click)}>Army</button>
                <button className='button-84' onClick={() => sortStat('damage')}>Damage</button>
                <button className='button-84' onClick={() => sortStat('healing')}>Healing</button>
                <button className='button-84' onClick={() => sortStat('kills')}>Kills</button>
                <button className='button-84' onClick={() => sortStat('assists')}>Assists</button>
                <button className='button-84' onClick={() => sortStat('kdr')}>KDR</button>
                <button className='button-84' onClick={event => handleReset(event)}>Reset</button>
                <select className='role--select' onChange={(event) => roleFilter(event)}>
                    {roles.map((role) => <RoleSelect key={`role--${role.id}`} role={role} />)}
                </select>
            </div>
            <hr className="custom-line-break" />
        </>
    );
};
