import React from "react";
import Button from "react-bootstrap/Button";

export default function MyButton({ color, text, onClick }) {
  color = `bg-${color}-500 group-hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded `;
  return (
    <Button className={color} onClick={onClick}>
      {text}
    </Button>
  );
}

/* export default function ({ text, color, onClick }) {
  // style = "bg-" + style + "-500 hover:bg-"+ style + "-700"

  color = `bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded`;

  return (
    <Button variant="primary" className={color} onClick={onClick}>
      {text}
    </Button>
  ); */
