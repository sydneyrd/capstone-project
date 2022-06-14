export const WeaponFilter = ({weapon}) => {
    return <option value={weapon.id}>{weapon.name}</option>
}