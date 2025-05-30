import { ReactNode } from 'react';

interface WrapperRowProps {
  children: ReactNode;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  padding?: string;
  gap?: string;
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  className?: string;
}

const WrapperRow = (props: WrapperRowProps) => {
  const { children, justifyContent, alignItems, width, height, padding, gap, wrap } = props;

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: alignItems,
      justifyContent: justifyContent,
      width: width,
      height: height,
      padding: padding,
      gap: gap,
      flexWrap: wrap
    }}
    className={props.className}
    >
      {children}
    </div>
  );
}

export default WrapperRow;