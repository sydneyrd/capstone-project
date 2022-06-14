export const ServerFilter = ({server}) => {
    return <option value={server.id}>{server.name}</option>
}