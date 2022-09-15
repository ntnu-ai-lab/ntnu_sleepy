import React from "react";
import { Card } from "./material/Card";
import { View, Text} from "react-native";
import { PageTemplate } from "./PageTemplate";
import { useNavigation } from "@react-navigation/native";

//page for general tips for sleeping. Should be available to all users when logged in.
export function GeneralPage() {
    const navigation = useNavigation();

    return(
        <PageTemplate>
            <View>
                <Card style={{padding:50}}>
                    <Text>Sov i gjennomsnitt 8 timer hver dag</Text>
                    <Text>Ikke bruk skjerm på mobil,tablet eller laptop 2 timer før leggetid</Text>
                    <Text>Bruk sengen kun til soving</Text>
                </Card>
            </View>
        </PageTemplate>
    )
}