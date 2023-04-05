import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

export const PublicGroupMap = ({ player }) => {


  return (
    <div className="group__results">
      <div className="player__name">
        {player.char_links && player.char_links.length > 0 ? (
          player.char_links.map((link) => (
            <>
              <a
                href={link.link}
                target="_blank"
                rel="noreferrer"
                key={link.id}
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
