import {ReactNode} from "react";

interface H1Props {
  children: ReactNode;
  color?: string;
}

const H1 = (props: H1Props) => {
  const { children, color } = props;

  return <h1 style={{ color: color }}>{children}</h1>;
}

export default H1;