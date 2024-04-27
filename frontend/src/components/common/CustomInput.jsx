import { useState, useRef } from "react";

function CustomInput({ value, onChange, maxLength }) {
  const inputsRefs = useRef(new Array(maxLength).fill(null));
  const [values, setValues] = useState(
    new Array(maxLength).fill("").map((v, i) => value.charAt(i) ?? v)
  );

  const focusNextInput = (currentIndex) => {
    const nextIndex =
      currentIndex < maxLength - 1 ? currentIndex + 1 : currentIndex;
    inputsRefs.current[nextIndex].focus();
  };

  const focusPreviousInput = (currentIndex) => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    inputsRefs.current[prevIndex].focus();
  };

  const setValue = (value, i) => {
    const next_values = [...values];
    next_values[i] = value;
    setValues(next_values);
    onChange(next_values.join(""));
  };

  const handleValueChange = (value, i) => {
    if (!values[i]) {
      setValue(value, i);
      focusNextInput(i);
    }
  };

  const handleBackspace = (event, i) => {
    if (event.keyCode !== 8) return;

    if (values[i] === "") {
      setValue("", i - 1);
      focusPreviousInput(i);
    } else {
      setValue("", i);
    }
  };

  const handleClick = (event) => {
    let i = 0;
    while (values[i] !== "" && i < values.length - 1) i++;
    inputsRefs.current[i].focus();
    // inputsRefs.current[i].disabled = false;
  };

  return (
    <div className="flex flex-row justify-around" onClick={handleClick}>
      <ul className="flex flex-row">
        {values.map((value, i) => {
          return (
            <li key={i}>
              <input
                ref={(node) => {
                  if (!inputsRefs.current[i]) inputsRefs.current[i] = node;
                  else inputsRefs.current[i] = null;
                }}
                type="text"
                value={value}
                onChange={(event) => handleValueChange(event.target.value, i)}
                onKeyUp={(event) => handleBackspace(event, i)}
                className="
                justify-center
                aspect-square
                w-8
                m-2 p-2
                rounded-lg
                shadow-md
                text-center
                text-lg
                uppercase
                caret-transparent
                focus:outline transition-all delay-75 outline-sky-500 outline-[2.5]
                "
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CustomInput;
