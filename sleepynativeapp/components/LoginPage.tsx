import { SelfServiceLoginFlow, SubmitSelfServiceLoginFlowBody, SubmitSelfServiceLoginFlowWithPasswordMethodBody } from "@ory/kratos-client";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { SessionContext } from "../auth/Auth";
import { AuthContext } from "../auth/AuthProvider";
import { handleFormSubmitError } from "../auth/form";
import { ProjectContext } from "../auth/ProjectProvider";
import { newKratosSdk } from "../auth/Sdk";
import { Button } from "./material/Button";
import { Card } from "./material/Card";
import { ProgressBar } from "./material/ProgressBar";
import { TextField } from "./material/TextField";
import { PageTemplate } from "./PageTemplate";

export function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();
  const { project } = useContext(ProjectContext);
  const { setSession, session, sessionToken, isAuthenticated } = useContext(AuthContext);
  const [flow, setFlow] = useState<SelfServiceLoginFlow | undefined>(undefined);
  const route = useRoute();

  const initializeFlow = () =>
    newKratosSdk(project)
      .initializeSelfServiceLoginFlowWithoutBrowser(
        true,
        undefined,
        sessionToken
      )
      .then((response) => {
        const { data: flow } = response;
        // The flow was initialized successfully, let's set the form data:
        setFlow(flow);
      })
      .catch(console.error);

  useFocusEffect(
    React.useCallback(() => {
      initializeFlow();

      return () => {
        setFlow(undefined);
      };
    }, [project])
  );

  useEffect(() => {
    if (isAuthenticated && sessionToken && session) {
      //@ts-ignore
      navigation.navigate("profile")
    }
  }, [isAuthenticated])

  if (isAuthenticated) {
    return null
  }

  const onSubmit = (payload: SubmitSelfServiceLoginFlowBody) =>
    flow
      ? newKratosSdk(project)
          .submitSelfServiceLoginFlow(flow.id, payload, sessionToken)
          .then(({ data }) => Promise.resolve(data as SessionContext))
          // Looks like everything worked and we have a session!
          .then((session) => {
            setSession(session)
            setTimeout(() => { // @ts-ignore
              navigation.navigate("profile")
            }, 100)
          })
          .catch(handleFormSubmitError(setFlow, initializeFlow))
      : Promise.resolve()

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
          <Button variant="contained" onClick={() => {
            const userInput: SubmitSelfServiceLoginFlowWithPasswordMethodBody = {
              identifier: email,
              method: "password",
              password: password,
            }
            onSubmit(userInput)
          }}>
            <Text style={{ fontSize: 20 }}>Log in</Text>
          </Button>
        </Card>
        <Button
          onClick={() => {
            //@ts-ignore'
            navigation.navigate("signup");
          }}
        >
          <Text style={{ fontSize: 20 }}>Opprett ny bruker</Text>
        </Button>
        <View>
          <Button style={{ height: 20 }}>
            <Text style={{ fontSize: 14 }}>Glemt passord?</Text>
          </Button>
          <Button
            style={{ height: 20 }}
            onClick={() =>
              { //@ts-ignore
                navigation.navigate("profile");
              }
            }
          >
            <Text style={{ fontSize: 14 }}>Midlertidig profilside test</Text>
          </Button>
        </View>
      </View>
    </PageTemplate>
  );
}
