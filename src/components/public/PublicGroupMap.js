import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

export const PublicGroupMap = ({ player }) => {


  return (
    <div className="group__results" key={`group--container${player.id}`}>
      <div className="player__name" key={`group--player--${player.id}`}>
        {player.char_links && player.char_links.length > 0 ? (
          player.char_links.map((link) => (
            <>
              <a
                href={link.link}
                target="_blank"
                rel="noreferrer"
                key={`player--links--${player.id}`}
              >
                {player?.character?.character_name}
              </a>{" "}
              <FontAwesomeIcon icon={faVideo} />
            </>
          ))
        ) : (
          player?.character?.character_name
        )}
      </div>
    </div>
  );
};
