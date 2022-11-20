import React from "react";
import { Text } from "react-native";
import { Button } from "../material/Button";

export function EntryDisplay({ onEdit }: { onEdit: () => void }) {
  return (
    <>
      <Button
        variant="outlined"
        style={{ width: "70%", padding: 5 }}
        onClick={onEdit}
      >
        <Text style={{ color: "white" }}>Rediger</Text>
      </Button>
      <Text>This is a display mode</Text>
    </>
  );
}
