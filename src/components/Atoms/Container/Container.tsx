import styles from "./Container.module.scss";
import {ReactNode} from "react";

export interface ContainerProps {
    children: ReactNode;
    id?: string;
    flexDirection?: "row" | "column";
    justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
    alignItems?: "center" | "flex-start" | "flex-end" | "stretch";
    height?: string;
    padding?: string;
    paddingTop?: string;
    gap?: string;
    className?: string;
}

const Container = (props: ContainerProps) => {
    return (
        <div style={{
            flexDirection: props.flexDirection,
            justifyContent: props.justifyContent,
            alignItems: props.alignItems,
            height: props.height,
            padding: props.padding,
            paddingTop: props.paddingTop,
            gap: props.gap,
            }} 
            id={props.id}
            className={`${styles.container} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Container;