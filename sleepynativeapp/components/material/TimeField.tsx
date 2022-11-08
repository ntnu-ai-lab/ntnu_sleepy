import React, { useState } from "react";
import { TextField } from "./TextField";

const timeRegex: RegExp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

interface TimeFieldState {
  string: string;
  date?: Date;
  valid: boolean;
}

/**
 * Textfield for inputting a HH:MM value and convert it to a date
 * Has a separate state for the string input and the date, as well as a state
 * for validating if the input is valid using regex.
 * baseDate is a Date object given as input to specify the date you want the
 * created object to have. The baseDate object must have values for day, month and year.
 */
export function TimeField({
  initialState = { string: "", valid: true },
  onChange,
  baseDate = new Date(),
  style,
}: {
  initialState?: TimeFieldState;
  onChange: (date: Date | false) => void;
  baseDate?: Date;
  style?: any;
}) {
  const [state, setState] = useState<TimeFieldState>(initialState);
  const [hasLostFocus, setHastLostFocus] = useState(false);

  return (
    <TextField
      onEndEditing={() => setHastLostFocus(true)}
      style={{
        ...style,
        minWidth: "30%",
        maxWidth: "60%",
        marginHorizontal: "5%",
        alignItems: "center",
        alignSelf: "center",
      }}
      error={hasLostFocus && !state.valid}
      placeholderText={"HH:MM"}
      onChange={(e) => {
        setState((time) => {
          time.string = e;
          time.valid = timeRegex.test(e);
          if (time.valid) {
            time.date = new Date(
              baseDate.getFullYear(),
              baseDate.getMonth(),
              baseDate.getDate(),
              parseInt(e.slice(0, 2)),
              parseInt(e.slice(3))
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
