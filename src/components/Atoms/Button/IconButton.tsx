import React from "react";
import styles from "./Button.module.scss";

interface IconButtonProps {
  onClick?: () => void;
  type?: "edit" | "delete" | "default";
  children: React.ReactNode;
  ariaLabel?: string;
}

const IconButton = ({ onClick, type = "default", children, ariaLabel }: IconButtonProps) => {
  let className = styles.iconBtn;
  if (type === "edit") className += " " + styles.editBtn;
  if (type === "delete") className += " " + styles.deleteBtn;
  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel} type="button">
      {children}
    </button>
  );
};

export default IconButton; 