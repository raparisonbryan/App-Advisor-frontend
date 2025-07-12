import React from "react";

export default function EditIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.862 5.487a2.06 2.06 0 0 1 2.915 2.915l-9.193 9.193a2 2 0 0 1-.707.464l-4.243 1.414 1.414-4.243a2 2 0 0 1 .464-.707l9.193-9.193z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
} 