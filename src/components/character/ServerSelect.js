export const ServerSelect = ({server}) => {
    return <option value={server.id}>{server.name}</option>
}