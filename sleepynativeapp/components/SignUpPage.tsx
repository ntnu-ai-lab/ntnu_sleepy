import React, { useState } from "react";
import { View, Text } from "react-native";
import { gender, relationshipStatus } from "../helpers/Types";
import { colors } from "../styles/styles";
import { Button } from "./material/Button";
import { Card } from "./material/Card";
import { Select } from "./material/Select";
import { TextField } from "./material/TextField";
import { PageTemplate } from "./PageTemplate";

export function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<gender>();
  const [occupation, setOccupation] = useState<string>("");
  const [relationshipStatus, setRelationshipStatus] =
    useState<relationshipStatus>();

  function passwordMatch() {
    if (!password2) return true
    else if (password === password2) return true
    return false
  }

  return (
    <PageTemplate style={{paddingTop: 60}}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 24, alignSelf: "center" }}>
          Registrer ny bruker
        </Text>
      </View>
      <Card style={{paddingVertical: 5, width: "90%", alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
        <View style={{width: "90%"}}>
          <TextField value={email} onChange={setEmail} placeholderText="Epost"/>
          <TextField value={name} onChange={setName} placeholderText="Fullt Navn"/>
          <TextField value={password} onChange={setPassword} placeholderText="Passord" password/>
          <TextField value={password2} onChange={setPassword2} placeholderText="Oppgi Passord på nytt" password error={!passwordMatch()}/>
          <Select placeholderText="Sivilstatus" options={["married", "coliving", "relationship", "single"]} optionDisplay={(arg: relationshipStatus) => {
            if (arg === "married") return "Gift"
            if (arg === "coliving") return "Samboer"
            if (arg === "relationship") return "Fast forhold"
            return "Single"
          }}/>
          <Select placeholderText="Kjønn" options={["male", "female", "other"]} optionDisplay={(arg: gender) => {
            if (arg === "male") return "Mann"
            else if (arg === "female") return "Kvinne"
            else return "Annet"
          }}
          zIndex={90}/>
          <Text style={{textTransform: "uppercase", fontSize: 12, color: colors.text_secondary, paddingLeft: 15}}> Fødselsdato på format: ddmmåååå</Text>
          <TextField value={dateOfBirth} onChange={setDateOfBirth} placeholderText="Fødselsdato"/>
          <TextField value={occupation} onChange={setOccupation} placeholderText="Yrke"/>
        </View>

        <Button
          variant="contained"
          style={{ width: "50%", alignSelf: "center" }}
        >
          <Text style={{ fontSize: 20 }}>Register</Text>
        </Button>
      </Card>
    </PageTemplate>
  );
}
