import React, { useState } from "react";
import { TextField } from "./TextField";

const timeRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

/**
 * Textfield for inputting a YYYY-MM-DD value and convert it to a date
 * Has a separate state for the string input and the date, as well as a state
 * for validating if the input is valid using regex.
 * This is used in combination with TimeField to create a date object with YYYY-MM-DD HH:MM.
 */
interface DateFieldState {
  string: string;
  date?: Date;
  valid: boolean;
}

export function DateField({
  initialState = { string: "", valid: true },
  onChange,
  style,
}: {
  initialState?: DateFieldState;
  onChange: (date: Date | false) => void;
  style?: any;
}) {
  const [state, setState] = useState<DateFieldState>(initialState);
  const [hasLostFocus, setHasLostFocus] = useState(false);

  return (
    <TextField
      onEndEditing={() => setHasLostFocus(true)}
      style={{ ...style, minWidth: "40%", alignItems: "center" }}
      error={hasLostFocus && !state.valid}
      placeholderText={"YYYY-MM-DD"}
      onChange={(e) => {
        setState((time) => {
          time.string = e;
          time.valid = timeRegex.test(e);
          if (time.valid) {
            time.date = new Date(
              parseInt(e.slice(0, 4)),
              parseInt(e.slice(5, 7)) - 1, //-1 because Date.month is 0-indexed for some reason.
              parseInt(e.slice(8, 10))
            );
            onChange(time.date);
          } else {
            onChange(false);
          }
          return { ...time };
        });
      }}
      value={state.string}
    />
  );
}
