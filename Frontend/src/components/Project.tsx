import { ProjectProps } from "./Types";
import { MediaProps } from "./Types"; 
import DisplayMedia from "./DisplayMedia";

interface ProjectComponentProps extends ProjectProps {
  media: MediaProps[];
}

export default function Project({title, description, technologies, link, dateMade, mediaId, media }: ProjectComponentProps) {
  const mediaToDisplay = media.find(item => mediaId === item.media_id) || null;

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        Teknologier: {technologies.join(', ')}
      </p>
      <a href={link}>Link til prosjekt</a>
      <p>Laget: {dateMade}</p>
      

      <DisplayMedia media={mediaToDisplay} media_id="1" media_type="2" media_url="2" media_description="2" />
    </div>
  );
}
