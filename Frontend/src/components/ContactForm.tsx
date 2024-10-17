import { useState, type FormEvent } from "react";

export default function ContactForm() {
  type FormData = {
    id: string;
    name: string;
    text: string;
  };

  const [messages, setMessages] = useState<FormData[]>([]);
  const [sendersName, setSendersName] = useState("");
  const [sendersText, setSendersText] = useState("");

  const [sendersNameValid, setSendersNameValid] = useState(false);
  const [sendersNameIsDirty, setSendersNameIsDirty] = useState(false);
  const [sendersNameIsTouched, setSendersNameIsTouched] = useState(false);

  const [sendersTextValid, setSendersTextValid] = useState(false);
  const [sendersTextIsDirty, setSendersTextIsDirty] = useState(false);
  const [sendersTextIsTouched, setSendersTextIsTouched] = useState(false);

  const validateSendersNameInput = (sendersName: string) => {
    if (sendersNameIsTouched && sendersNameIsDirty) {
      setSendersNameValid(sendersName.trim().length > 2);
    }
  };

  const updateSendersName = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setSendersNameIsDirty(true);
    setSendersName(input.value);
  };


  const validateSendersText = (text: string) => {
    const wordCount = text.trim().split(/\s+/).length;
    setSendersTextValid(wordCount >= 2);
  };


  const updateSendersText = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setSendersTextIsDirty(true);
    setSendersText(input.value);
    validateSendersText(input.value); 
  };

  const addMessageToList = (name: string, text: string) => {
    const newMessage: FormData = {
      id: crypto.randomUUID(),
      name,
      text,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const sendFormWithState = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!sendersName || !sendersTextValid) return;

    addMessageToList(sendersName, sendersText);
    setSendersName("");
    setSendersText("");
    setSendersNameIsDirty(false);
    setSendersNameIsTouched(false);
    setSendersNameValid(false);
    setSendersTextIsDirty(false);
    setSendersTextIsTouched(false); 
    setSendersTextValid(false);
  };

  return (
    <>
      <section className="componentcard">
        <h2>Send en melding</h2>
        <form  onSubmit={sendFormWithState}>
          <label htmlFor="sendersname">
        <p>Ditt navn:</p>
            <input
              type="text"
              id="sendersname"
              name="sendersname"
              onChange={updateSendersName}
              onFocus={() => setSendersNameIsTouched(true)}
              onBlur={() => validateSendersNameInput(sendersName)}
              value={sendersName}
            />
            {!sendersNameValid && sendersNameIsDirty ? (
              <p className="warning">Navnet må være minst 3 tegn langt</p>
            ) : null}
          </label>
          <label htmlFor="senderstext">
          <p> Din tekst (må inneholde minst to ord):</p>
            <input
              type="text"
              id="senderstext"
              name="senderstext"
              onChange={updateSendersText}
              onFocus={() => setSendersTextIsTouched(true)} 
              onBlur={() => validateSendersText(sendersText)} 
              value={sendersText}
            />
            {!sendersTextValid && sendersTextIsDirty && sendersTextIsTouched ? ( 
              <p className="warning">Teksten må inneholde minst to ord</p>
            ) : null}
          </label>
          <button type="submit" className="submitbutton">send melding</button>
        </form>
      </section>
      <aside className="componentcard">
        <h2>Sendte meldinger</h2>
        <p>Her vises det som lagres i usestate for meldinger og kunne blitt sendt videre til lagring i server:</p>
        <pre>{JSON.stringify(messages, null, 2)}</pre>
      </aside>
    </>
  );
}
