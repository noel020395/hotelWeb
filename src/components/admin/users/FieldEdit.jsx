import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";

export default function FieldEdit() {
  const [disabled, setDisabled] = useState(true);
  const [iconVisibility, setIconVisibility] = useState("visible");
  const [text, setText] = useState("some default text");

  const handleClick = () => {
    setDisabled(false);
    setIconVisibility("hidden");
  };

  const handleBlur = () => {
    setDisabled(true);
    setIconVisibility("visible");
  };
  return (
    <div className="flex items-center">
      <input
        type="email"
        defaultValue={text}
        className="mr-3 border-danger-500 bg-transparent"
        disabled={disabled}
        onBlur={handleBlur}
        onChange={(event) => {
          console.log(1);
          setText(event.target.value);
        }}
      />
      <BiEdit onClick={handleClick} style={{ visibility: iconVisibility }} />
    </div>
  );
}
