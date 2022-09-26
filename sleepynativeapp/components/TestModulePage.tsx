import React, { useState } from "react";
import { View, ScrollView, Text, Dimensions } from "react-native";
import { NavBar } from "./material/NavBar";
import { PageTemplate } from "./PageTemplate";
import { Card, Title, Paragraph, Button, TextInput, ProgressBar } from 'react-native-paper'
import { TextField } from "./material/TextField";
import { colors } from "../styles/styles";

export function TestModulePage() {

    const [answer1, setAnswer1] = useState<string>("");
    const [progress, SetProgress] = useState<number>(0.6);

    return (
        <PageTemplate>
            <ScrollView>
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
                            <TextInput multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn, isåfall, hvor mange?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Hvilket yrke har  du?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Hvor mange timer sover du iløpet av døgnet?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Jobber du skift?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Actions><Text>Har du barn?</Text></Card.Actions>
                        <Card.Actions>
                            <TextInput multiline={true} mode="outlined" placeholder="Type something" style={{ width: "100%" }} />
                        </Card.Actions>
                    </Card.Content>
                </Card>
            </ScrollView>
        </PageTemplate>
    )
}