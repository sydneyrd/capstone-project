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

    return (
        <div className="parent--public--boards">
            <div className="left--container--public">
          
            PUBLIC BOARDS
            {warStats.map((stat) => {
              return (
                <div className="list--parent" key={stat.id}>
                  <div className="public-rosters">
                    <Link to={`/public/${stat.id}`}>
                      {stat.rosterName ? `${stat.rosterName}` : "Untitled War Stats"}
                    </Link>
                  </div>
                </div>
              );
            })}</div>
         
      
          <div className="right-container--public">
            <div className="twitch-parent">
            <div className="video-parent">
  <iframe
    className="video-iframe"
    src="https://player.twitch.tv/?channel=yaboiwiilly&parent=localhost"
    scrolling="no"
    allowFullScreen="true"
  ></iframe>
</div>
<div className="chat-parent">
  <iframe
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