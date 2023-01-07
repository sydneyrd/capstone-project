import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export function BaseStatContainer() {
    const { calculatedRosterId } = useParams()

    return<>
        <Link to={`/resources/${calculatedRosterId}/view`}>Return to Results</Link>

        <div className="kdr">KDR</div>HELLO I AM THE NEW MODULE FOR EDITING DELETING AND VIEWING BASE PLAYER STATS</>
}