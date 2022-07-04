import React, { useEffect, useRef, useState } from "react";
import "../../styles/dropdown.css";

export default function Dropdown({ options, prompt, value, onChangeCapture }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function close(e) {
    setOpen(e && e.target === ref.current);
  }

  function filter(options) {
    return options.filter(
      (option) => option.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  function displayValue() {
    if(query.length > 0) return query;

    if(value) return value.name
    return ""
  }

  return (
    <div className="dropdown">
      <div className="control" onClick={() => setOpen((prev) => !prev)}>
        <div className="selected-value">
          <input
            type="text"
            ref={ref}
            placeholder={value ? value.name : prompt}
            value={displayValue()}
            onChange={(e) => {
              setQuery(e.target.value);
              onChangeCapture(null);
            }}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={`arrow ${open ? "open" : null}`} />
      </div>
      <div className={`options ${open ? "open" : null}`}>
        {filter(options).map((option) => (
          <div
            className={`option ${value === option ? "selected" : null}`}
            key={option.uuid}
            onClick={() => {
              setQuery("");
              onChangeCapture(option);
              setOpen(false);
            }}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}
