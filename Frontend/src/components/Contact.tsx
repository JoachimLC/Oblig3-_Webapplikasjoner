import { ContactProps } from "./Types";  

  export default function Contact({ email }: ContactProps) {
    return (
      <section>
        <button className="submitbutton" onClick={() => alert(email)} type="button">Email</button>
      </section>
    );
  }