import React, { useState } from "react";
import { TextField } from "./TextField";

const timeRegex: RegExp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

interface DateFieldState {
  string: string;
  date?: Date;
  correct: boolean;
}

export function DateField({
  initialState = { string: "", correct: true },
  onChange,
}: {
  initialState?: DateFieldState;
  onChange: (date: Date) => void;
}) {
  const [state, setState] = useState<DateFieldState>(initialState);

  const [date] = useState(new Date()); //TODO Change to props

  return (
    <TextField
      style={{ minWidth: 150, maxWidth: "30%", alignItems: "center" }}
      error={!state.correct}
      placeholderText={"HH:MM"}
      onChange={(e) => {
        setState((time) => {
          time.string = e;
          if (e.length < 4 || (e.length < 5 && e.includes(":"))) {
            time.correct = true;
          } else {
            time.correct = timeRegex.test(e);
          }
          if (timeRegex.test(e)) {
            time.date = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              parseInt(e.slice(0, 2)),
              parseInt(e.slice(3))
            );
            onChange(time.date);
          }
          return { ...time };
        });
      }}
      value={state.string}
    />
  );
}
