import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { NavBar } from "./material/NavBar";
import { PageTemplate } from "./PageTemplate";
import { Card, Title, Paragraph, Button, TextInput, ProgressBar } from 'react-native-paper'
import { TextField } from "./material/TextField";
import { colors } from "../styles/styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SelectDropdown from "react-native-select-dropdown";
import { relationshipStatus } from "../types/Types";

export function QuestionnairePage() {
    const relationshipStatuses = { "married": "Gift", "coliving": "Samboer", "relationship": "Fast forhold", "single": "Singel", "undefined": "" }
    const [relationship, setRelationship] = useState<relationshipStatus>("married");


    const [answer1, setAnswer1] = useState<relationshipStatus>("undefined");
    const [answer2, setAnswer2] = useState<string>("");
    const [answer3, setAnswer3] = useState<string>("");
    const [answer4, setAnswer4] = useState<string>("");
    const [answer5, setAnswer5] = useState<string>("");
    const [answer6, setAnswer6] = useState<string>("");
    const [answer7, setAnswer7] = useState<string>("");
    const [answer8, setAnswer8] = useState<string>("");
    const [progress, SetProgress] = useState<number>(0.6);


    const [children, setChildren] = useState<string[]>([])

    

    return (
        <PageTemplate>
            <KeyboardAwareScrollView viewIsInsideTabBar={true} enableAutomaticScroll={true} enableResetScrollToCoords={false}>
                <Card>
                    <Card.Content>
                        <ProgressBar progress={progress} color={colors.primary_dark} />
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                    <Card.Actions><Text>Hva er din sivilstatus?</Text></Card.Actions>
                        <Card.Actions>
                        <SelectDropdown
                            defaultButtonText={relationshipStatuses[relationship]}
                            selectedRowStyle={{ backgroundColor: colors.primary_dark }}
                            defaultValue={relationshipStatuses[relationship]}
                            buttonStyle={{ width: "100%", borderRadius: 10 }}
                            buttonTextStyle={{ textAlign: "left" }}
                            dropdownStyle={{ width: "90%", borderRadius: 10 }}
                            data={[relationshipStatuses.married, relationshipStatuses.coliving, relationshipStatuses.relationship, relationshipStatuses.single]}
                            onSelect={(selectedItem, index) => {
                                //console.log(selectedItem, index);
                                setRelationship(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Hvor mange bor i din husstand?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput defaultValue={answer2} keyboardType="numeric" onChangeText={(e) => setAnswer2(e)} multiline={true} mode="outlined" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Hvor mange barn har du?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput keyboardType="numeric" onChangeText={(e) => {setAnswer3(e); console.log(e); console.log(children)}} multiline={true} mode="outlined" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                {answer3.length < 1 ? <></>: <Card>
                    <Card.Content style={{alignItems:"center"}}>
                        <Card.Actions>
                            {parseInt(answer3) < 2 ? <Text>Hvor gammel er barnet ditt?</Text> : <Text>Hvor gamle er barna dine?</Text>}
                            
                        </Card.Actions>
                            {parseInt(answer3) < 15 ? [...Array(parseInt(answer3) || 0).keys()].map((n) => 
                                <Card.Actions style={{width: "80%", justifyContent:"center"}}>
                                    <TextInput
                                        key={n}
                                        keyboardType="numeric"
                                        onChangeText={(e) => setChildren((chld) => {chld[n] = e; console.log(children); return chld})}
                                        multiline={true}
                                        mode="outlined"
                                        style={{ width: "50%" }}
                                        placeholder="Alder" />
                                </Card.Actions>
                            ): <></>}
                    </Card.Content>
                    </Card>}

                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Hvor mange timer sover du iløpet av døgnet?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer4(e)} multiline={true} mode="outlined" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Jobber du skift?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer5(e)} multiline={true} mode="outlined" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer6(e)} multiline={true} mode="outlined" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer7(e)} multiline={true} mode="outlined" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer8(e)} multiline={true} mode="outlined" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
            </KeyboardAwareScrollView>
        </PageTemplate>
    )
}