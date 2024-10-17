import Contact from "./Contact";
import { HeaderProps } from "./Types";

export default function Header({ student, degree, points, email }: HeaderProps) {
    return (
      <section className="grid-article-item">
        <h1>{student}</h1>
        <p>Degree: {degree}</p>
        <p>Points: {points}</p>
        <Contact email={email}/>
      </section>

      
    );
  }