import React, { useRef, useState } from "react";
import { Text } from "react-native";
import { NavBar } from "../material/NavBar";
import { PageTemplate } from "../material/PageTemplate";
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  ProgressBar,
} from "react-native-paper";
import { TextField } from "../material/TextField";
import { colors } from "../../styles/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import { relationshipStatus } from "../../types/Types";

export function QuestionnairePage() {
  const relationshipStatuses = {
    married: "Gift",
    coliving: "Samboer",
    relationship: "Fast forhold",
    single: "Singel",
    undefined: "",
  };
  const [relationship, setRelationship] =
    useState<relationshipStatus>("married");

  const [answer1, setAnswer1] = useState<relationshipStatus>("undefined");
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const [answer4, setAnswer4] = useState<string>("");
  const [answer5, setAnswer5] = useState<string>("");
  const [answer6, setAnswer6] = useState<string>("");
  const [answer7, setAnswer7] = useState<string>("");
  const [answer8, setAnswer8] = useState<string>("");
  const [progress, SetProgress] = useState<number>(0);
  const [smoke, setSmoke] = useState<boolean | undefined>(false);
  const [snus, setSnus] = useState<boolean | undefined>(false);
  const [pregnant, setPregnant] = useState<boolean | undefined>(false);
  const [stillingsprosent, setStillingsprosent] = useState<string>("");

  const pregnantDropdownRef = useRef<SelectDropdown>(null);

  const [children, setChildren] = useState<string[]>([]);

  return (
    <PageTemplate>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        enableAutomaticScroll={true}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
      >
        <Card>
          <Card.Content>
            <ProgressBar progress={progress} color={colors.primary_dark} />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Title>Familie</Title>

            <Card.Actions>
              <Text>Hva er din sivilstatus?</Text>
            </Card.Actions>
            <Card.Actions>
              <SelectDropdown
                defaultButtonText={"Velg et alternativ"}
                selectedRowStyle={{ backgroundColor: colors.primary_dark }}
                defaultValue={"undefined"}
                buttonStyle={{ width: "100%", borderRadius: 10 }}
                buttonTextStyle={{ textAlign: "left" }}
                dropdownStyle={{ width: "90%", borderRadius: 10 }}
                data={[
                  relationshipStatuses.married,
                  relationshipStatuses.coliving,
                  relationshipStatuses.relationship,
                  relationshipStatuses.single,
                ]}
                onSelect={(selectedItem, index) => {
                  //console.log(selectedItem, index);
                  setRelationship(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </Card.Actions>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Actions>
              <Text>Hvor mange bor i din husstand?</Text>
            </Card.Actions>
            <Card.Actions>
              <TextInput
                defaultValue={answer2}
                keyboardType="numeric"
                onChangeText={(e) => setAnswer2(e)}
                multiline={true}
                mode="outlined"
                style={{ width: "100%" }}
              />
            </Card.Actions>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Actions>
              <Text>Hvor mange barn har du?</Text>
            </Card.Actions>
            <Card.Actions>
              <TextInput
                keyboardType="numeric"
                onChangeText={(e) => {
                  setAnswer3(e);
                  console.log(e);
                  console.log(children);
                }}
                multiline={true}
                mode="outlined"
                style={{ width: "100%" }}
              />
            </Card.Actions>
          </Card.Content>
        </Card>
        {answer3.length < 1 || parseInt(answer3) == 0 ? (
          <></>
        ) : (
          <Card>
            <Card.Content style={{ alignItems: "center" }}>
              <Card.Actions>
                {parseInt(answer3) < 2 ? (
                  <Text>Hvor gammel er barnet ditt?</Text>
                ) : (
                  <Text>Hvor gamle er barna dine?</Text>
                )}
              </Card.Actions>
              {parseInt(answer3) < 15 ? (
                [...Array(parseInt(answer3) || 0).keys()].map((n) => (
                  <Card.Actions
                    style={{ width: "80%", justifyContent: "center" }}
                  >
                    <TextInput
                      key={n}
                      keyboardType="numeric"
                      onChangeText={(e) =>
                        setChildren((chld) => {
                          chld[n] = e;
                          console.log(children);
                          return chld;
                        })
                      }
                      multiline={true}
                      mode="outlined"
                      style={{ width: "50%" }}
                      placeholder="Alder"
                    />
                  </Card.Actions>
                ))
              ) : (
                <></>
              )}
            </Card.Content>
          </Card>
        )}

        <Card>
          <Card.Content>
            <Title>Helse</Title>
            <Card.Actions>
              <Text>Hvor mange timer sover du iløpet av døgnet?</Text>
            </Card.Actions>
            <Card.Actions>
              <TextInput
                keyboardType="number-pad"
                onChangeText={(e) => setAnswer4(e)}
                multiline={true}
                mode="outlined"
                style={{ width: "100%" }}
              />
            </Card.Actions>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Actions>
              <Text>Røyker du?</Text>
            </Card.Actions>
            <Card.Actions>
              <SelectDropdown
                defaultButtonText={"Velg et alternativ"}
                selectedRowStyle={{ backgroundColor: colors.primary_dark }}
                buttonStyle={{ width: "100%", borderRadius: 10 }}
                buttonTextStyle={{ textAlign: "left" }}
                dropdownStyle={{ width: "90%", borderRadius: 10 }}
                data={["Ja", "Nei", "-"]}
                onSelect={(selectedItem, index) => {
                  //console.log(selectedItem, index);
                  {
                    selectedItem === "Ja"
                      ? setSmoke(true)
                      : selectedItem === "Nei"
                      ? setSmoke(false)
                      : setSmoke(undefined);
                  }
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </Card.Actions>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Actions>
              <Text>Snuser du?</Text>
            </Card.Actions>
            <Card.Actions>
              <SelectDropdown
                defaultButtonText={"Velg et alternativ"}
                selectedRowStyle={{ backgroundColor: colors.primary_dark }}
                buttonStyle={{ width: "100%", borderRadius: 10 }}
                buttonTextStyle={{ textAlign: "left" }}
                dropdownStyle={{ width: "90%", borderRadius: 10 }}
                data={["Ja", "Nei", "-"]}
                onSelect={(selectedItem, index) => {
                  //console.log(selectedItem, index);
                  {
                    selectedItem === "Ja"
                      ? setSnus(true)
                      : selectedItem === "Nei"
                      ? setSnus(false)
                      : setSnus(undefined);
                  }
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </Card.Actions>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Actions>
              <Text>Hvor mange dager i måneden drikker du alkohol?</Text>
            </Card.Actions>
            <Card.Actions>
              <TextInput
                keyboardType="numeric"
                onChangeText={(e) => setAnswer6(e)}
                multiline={true}
                mode="outlined"
                style={{ width: "100%" }}
              />
            </Card.Actions>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Actions>
              <Text>Er du gravid for øyeblikket?</Text>
            </Card.Actions>
            <Card.Actions>
              <SelectDropdown
                defaultButtonText={"Velg et alternativ"}
                selectedRowStyle={{ backgroundColor: colors.primary_dark }}
                buttonStyle={{ width: "100%", borderRadius: 10 }}
                buttonTextStyle={{ textAlign: "left" }}
                dropdownStyle={{ width: "90%", borderRadius: 10 }}
                data={["Ja", "Nei", "-"]}
                ref={pregnantDropdownRef}
                onSelect={(selectedItem, index) => {
                  //console.log(selectedItem, index);
                  {
                    selectedItem === "Ja"
                      ? setPregnant(true)
                      : selectedItem === "Nei"
                      ? setPregnant(false)
                      : setPregnant(undefined);
                  }
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </Card.Actions>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Title>Jobb</Title>
            <Card.Actions>
              <Text>Hvilken stillingsprosent jobber du?</Text>
            </Card.Actions>
            <Card.Actions>
              <SelectDropdown
                defaultButtonText={"Velg et alternativ"}
                selectedRowStyle={{ backgroundColor: colors.primary_dark }}
                buttonStyle={{ width: "100%", borderRadius: 10 }}
                buttonTextStyle={{ textAlign: "left" }}
                dropdownStyle={{ width: "90%", borderRadius: 10 }}
                data={["100%", "80%", "60%", "40%", "20%", "0%"]}
                onSelect={(selectedItem, index) => {
                  //console.log(selectedItem, index);
                  setStillingsprosent(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </Card.Actions>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Actions>
              <Text>Når på døgnet jobber du?</Text>
            </Card.Actions>
            <Card.Actions>
              <SelectDropdown
                defaultButtonText={"Velg et alternativ"}
                selectedRowStyle={{ backgroundColor: colors.primary_dark }}
                buttonStyle={{ width: "100%", borderRadius: 10 }}
                buttonTextStyle={{ textAlign: "left" }}
                dropdownStyle={{ width: "90%", borderRadius: 10 }}
                data={["Dagtid", "Kveldstid", "Natt", "Varierer"]}
                onSelect={(selectedItem, index) => {
                  //console.log(selectedItem, index);
                  setStillingsprosent(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </Card.Actions>
          </Card.Content>
        </Card>
      </KeyboardAwareScrollView>
    </PageTemplate>
  );
}
