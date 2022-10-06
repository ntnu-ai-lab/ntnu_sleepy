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
import { View, Dimensions } from "react-native";
import { SessionContext } from "../auth/Auth";
import { AuthContext } from "../auth/AuthProvider";
import { handleFormSubmitError } from "../auth/form";
import { ProjectContext } from "../auth/ProjectProvider";
import { newKratosSdk } from "../auth/Sdk";
import { TextField } from "./material/TextField";
import { PageTemplate } from "./PageTemplate";
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Text,
} from "react-native-paper";
import { colors } from "../styles/styles";

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
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{ marginBottom: 10 }}
            label={"Epost"}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            label={"Passord"}
          />
          <Button
            onPress={() => {
              const userInput: SubmitSelfServiceLoginFlowWithPasswordMethodBody =
                {
                  identifier: email,
                  method: "password",
                  password: password,
                };
              onSubmit(userInput);
            }}
          >
            <Text>Logg inn</Text>
          </Button>

          <Button
            onPress={() => {
              //@ts-ignore'
              navigation.navigate("signup");
            }}
          >
            <Text>Opprett ny bruker</Text>
          </Button>

          <Button mode="text">Glemt passord?</Button>
        </Card>
      </View>
    </PageTemplate>
  );
}
