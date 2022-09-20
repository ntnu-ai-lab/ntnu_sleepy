import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Button } from "./material/Button";
import { Card } from "./material/Card";
import { ProgressBar } from "./material/ProgressBar";
import { TextField } from "./material/TextField";
import { PageTemplate } from "./PageTemplate";

export function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();

  return (
    <PageTemplate>
      <View
        style={{
          height: Dimensions.get("window").height,
          width: "100%",
          paddingHorizontal: 20,
          justifyContent: "center",
        }}
      >
        <Card style={{ padding: 20 }}>
          <TextField
            value={email}
            onChange={setEmail}
            placeholderText={"Epost"}
          />
          <TextField
            value={password}
            onChange={setPassword}
            password
            placeholderText={"Passord"}
          />
          <Button variant="contained">
            <Text style={{ fontSize: 20 }}>Log in</Text>
          </Button>
        </Card>
        <Button
          onClick={() => { //@ts-ignore
            navigation.navigate("signup");
          }}
        >
          <Text style={{ fontSize: 20 }}>Opprett ny bruker</Text>
        </Button>
        <View>
          <Button style={{ height: 20 }}>
            <Text style={{ fontSize: 14 }}>Glemt passord?</Text>
          </Button>
          <Button style={{ height: 20 }} onClick={() => //@ts-ignore 
          {navigation.navigate("profile");}}>
            <Text style={{ fontSize: 14 }}>Midlertidig profilside test</Text>
          </Button>
        </View>
      </View>
    </PageTemplate>
  );
}
