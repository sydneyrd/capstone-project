import { useEffect, useState } from "react"
import { getPublicCalculatedRosters } from "../managers/PublicManager"
import { getPublicServers } from "../managers/PublicManager"
import { Link } from "react-router-dom"
import "./public.css"
import { ServerSelect } from "../character/ServerSelect"
export const PublicBoardsContainer = () => {
  const [warStats, setWarStats] = useState([]);
  const [sortedWars, setSortedWars] = useState([]);
  const [servers, setServers] = useState([]);
  const [selectedServerId, setSelectedServerId] = useState(0);
  const handleServerChange = (event) => {
    setSelectedServerId(parseInt(event.target.value))
  }

  useEffect(
    () => {
      getPublicCalculatedRosters(setWarStats).then(() => {
        getPublicServers(setServers)
      })
      let sortedWarStats = warStats.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setSortedWars(sortedWarStats)
    },
    []
  )

  useEffect(() => {
    if (selectedServerId === 0 || selectedServerId === undefined) {
      let sortedWarStats = warStats.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setSortedWars(sortedWarStats)
    }
    else {
      let sortedWarStats = warStats.filter((stat) => stat.server === parseInt(selectedServerId));
      let sortedByDate = sortedWarStats.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setSortedWars(sortedByDate);
    }

  }, [selectedServerId, warStats])

  return (
    <div className="parent--public--boards">
      <div className="left--container--public">

        <h2>PUBLIC BOARDS</h2>
        <select onChange={handleServerChange}>
          <option value="0">Select a Server</option>{
            servers.map(
              (server) => {
                return <ServerSelect key={server.id} server={server} />
              }
            )}</select>
        {sortedWars.map((stat) => {
          return (
            <div className="list--parent" key={stat.id}>
              <div className="public-rosters">
                <Link to={`/public/${stat.id}`}>
                  {stat.rosterName ? `${stat.rosterName} ${new Date(stat.created_at).toLocaleDateString()}` : `Untitled War Stats ${new Date(stat.created_at).toLocaleDateString}`}
                </Link>
              </div>
            </div>
          );
        })}</div>
      <div className="right-container--public">
        <h2 className="right--heading">live coverage</h2>
        <p className="sub--heading">willy didn't pay for this</p>
        <div className="twitch-parent">
          <div className="video-parent">
            <iframe
              title="twitch"
              className="video-iframe"
              src="https://player.twitch.tv/?channel=yaboiwiilly&parent=deadgameroster.com"
              scrolling="no"
              allowFullScreen={true}
            ></iframe>
          </div>
          <div className="chat-parent">
            <iframe
              title="twitch--chat"
              className="chat-iframe"
              scrolling="no"
              id="chat_embed"
              src="https://www.twitch.tv/embed/yaboiwiilly/chat?parent=deadgameroster.com"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );

}