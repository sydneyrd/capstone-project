import { useEffect, useState } from "react"
import { getPublicCalculatedRosters } from "../managers/PublicManager"
import { Link } from "react-router-dom"
import "./public.css"
export const PublicBoardsContainer = () => {
const [warStats, setWarStats] = useState([])

    useEffect(
        () => {
            getPublicCalculatedRosters(setWarStats)
        },
        []
    )
    const sortedWarStats = warStats.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    
    return (
        <div className="parent--public--boards">
            <div className="left--container--public">
          
            <h2>PUBLIC BOARDS</h2>
            {sortedWarStats.map((stat) => {
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
    src="https://player.twitch.tv/?channel=yaboiwiilly&parent=localhost"
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
    src="https://www.twitch.tv/embed/yaboiwiilly/chat?parent=localhost"
  ></iframe>
</div>

            </div>
          </div>
        </div> 
      );
      
}