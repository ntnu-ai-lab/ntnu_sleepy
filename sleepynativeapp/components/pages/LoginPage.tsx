import {
  SelfServiceLoginFlow,
  SubmitSelfServiceLoginFlowBody,
  SubmitSelfServiceLoginFlowWithPasswordMethodBody,
} from "@ory/kratos-client";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Dimensions, Text } from "react-native";
import { SessionContext } from "../../auth/Auth";
import { AuthContext } from "../../auth/AuthProvider";
import { handleFormSubmitError } from "../../auth/form";
import { ProjectContext } from "../../auth/ProjectProvider";
import { newKratosSdk } from "../../auth/Sdk";
import { colors } from "../../styles/styles";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { PageTemplate } from "../material/PageTemplate";
import { TextField } from "../material/TextField";

export function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();
  const { project } = useContext(ProjectContext);
  const { setSession, session, sessionToken, isAuthenticated } =
    useContext(AuthContext);
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
      navigation.navigate("home");
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return null;
  }

  const onSubmit = (payload: SubmitSelfServiceLoginFlowBody) =>
    flow
      ? newKratosSdk(project)
          .submitSelfServiceLoginFlow(flow.id, payload, sessionToken)
          .then(({ data }) => Promise.resolve(data as SessionContext))
          // Looks like everything worked and we have a session!
          .then((session) => {
            setSession(session);
          })
          .catch(handleFormSubmitError(setFlow, initializeFlow))
      : Promise.resolve();

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
        <Card style={{ padding: 20, borderRadius: 10 }}>
          <TextField
            value={email}
            onChange={setEmail}
            style={{ marginBottom: 10 }}
            placeholderText={"Epost"}
          />
          <TextField
            value={password}
            onChange={setPassword}
            password={true}
            placeholderText={"Passord"}
          />
          <Button
          variant="contained"
            onClick={() => {
              const userInput: SubmitSelfServiceLoginFlowWithPasswordMethodBody =
                {
                  identifier: email,
                  method: "password",
                  password: password,
                };
              onSubmit(userInput);
            }}
          >
            <Text style={{fontSize: 18}}>Logg inn</Text>
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              //@ts-ignore'
              navigation.navigate("signup");
            }}
          >
            <Text style={{color: colors.text_white}}>Opprett ny bruker</Text>
          </Button>

          <Button><Text style={{color: ""}}>Glemt passord?</Text></Button>
        </Card>
      </View>
    </PageTemplate>
  );
}
