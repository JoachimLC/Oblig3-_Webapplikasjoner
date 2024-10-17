import React from "react";
import { MediaProps } from "./Types";

interface MediaItem {
  media_id: string;
  media_type: string;
  media_url: string;
  media_description: string;
}

interface DisplayMediaProps extends MediaProps{
  media: MediaItem | null;
}

const DisplayMedia: React.FC<DisplayMediaProps> = ({ media }) => {
    return (
      <div className="media-gallery">
        {media ? ( 
          <div key={media.media_id} className="media-item">
            {media.media_type === "image" && (
              <img
                src={media.media_url}
                alt={`Media ${media.media_description || media.media_id}`}
                className="media-image"
                onClick={() => handleImageClick(media.media_url)}
              />
              
            )}
          </div>
        ) : (
          <p>No media available</p>
        )}
      </div>
    );
  };
  
const handleImageClick = (url: string) => {
  const imageWindow = window.open(url, "_blank");
  if (imageWindow) imageWindow.focus();
};

export default DisplayMedia;