import React, { useState } from "react";
import { View, ScrollView, Text, Dimensions } from "react-native";
import { NavBar } from "./material/NavBar";
import { PageTemplate } from "./PageTemplate";
import { Card, Title, Paragraph, Button, TextInput, ProgressBar } from 'react-native-paper'
import { TextField } from "./material/TextField";
import { colors } from "../styles/styles";

export function TestModulePage() {

    const [answer1, setAnswer1] = useState<string>("");
    const [answer2, setAnswer2] = useState<string>("");
    const [answer3, setAnswer3] = useState<string>("");
    const [answer4, setAnswer4] = useState<string>("");
    const [answer5, setAnswer5] = useState<string>("");
    const [answer6, setAnswer6] = useState<string>("");
    const [answer7, setAnswer7] = useState<string>("");
    const [answer8, setAnswer8] = useState<string>("");
    const [progress, SetProgress] = useState<number>(0.6);

    return (
        <PageTemplate>
            <ScrollView contentInset={{ bottom: 200, top: 0 }} keyboardDismissMode={"on-drag"} alwaysBounceVertical={true} style={{padding: 10}}  >
                <Card>
                    <Card.Content>
                        <ProgressBar progress={progress} color={colors.primary_dark} />
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Title>Spørreskjema</Title>
                        <Card.Actions><Text>Er du gravid?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer1(e)} multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn, isåfall, hvor mange?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer2(e)} multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Hvilket yrke har  du?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer3(e)} multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Hvor mange timer sover du iløpet av døgnet?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer4(e)} multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Jobber du skift?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer5(e)} multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer6(e)} multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer7(e)} multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput onChangeText={(e) => setAnswer8(e)} multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <View style={{height: 100}}/>
            </ScrollView>
        </PageTemplate>
    )
}