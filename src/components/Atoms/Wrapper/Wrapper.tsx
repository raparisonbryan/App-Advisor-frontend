import { ReactNode, CSSProperties } from "react";

export interface WrapperProps {
    children: ReactNode;
    justifyContent?: CSSProperties["justifyContent"];
    alignItems?: CSSProperties["alignItems"];
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    padding?: CSSProperties["padding"];
    gap?: CSSProperties["gap"];
    zIndex?: CSSProperties["zIndex"];
}

const Wrapper = (props: WrapperProps) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: props.alignItems,
            justifyContent: props.justifyContent,
            width: props.width,
            height: props.height,
            padding: props.padding,
            gap: props.gap,
            position: "relative",
            zIndex: props.zIndex
        }}>
            {props.children}
        </div>
    );
}

export default Wrapper;