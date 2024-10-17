import { TitleProps } from "./Types";
  
export default function Title(props: TitleProps) {
    const { title = "Default title" } = props;
    return <h2>{title}</h2>;
}