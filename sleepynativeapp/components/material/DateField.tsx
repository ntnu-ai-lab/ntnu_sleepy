import React, { useState } from "react";
import { TextField } from "./TextField";

const timeRegex: RegExp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

interface DateFieldState {
  string: string;
  date?: Date;
  valid: boolean;
}

export function DateField({
  initialState = { string: "", valid: true },
  onChange,
  baseDate = new Date(),
}: {
  initialState?: DateFieldState;
  onChange: (date: Date | false) => void;
  baseDate?: Date;
}) {
  const [state, setState] = useState<DateFieldState>(initialState);
  const [hasLostFocus, setHastLostFocus] = useState(false);

  return (
    <TextField
      onEndEditing={() => setHastLostFocus(true)}
      style={{ minWidth: 150, maxWidth: "30%", alignItems: "center" }}
      error={hasLostFocus && !state.valid}
      placeholderText={"HH:MM"}
      onChange={(e) => {
        setState((time) => {
          time.string = e;
          time.valid = timeRegex.test(e);
          console.log(time.valid);
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
