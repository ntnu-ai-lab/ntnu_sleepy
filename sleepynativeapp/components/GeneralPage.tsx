import React from "react";
import { Card } from "./material/Card";
import { View, Text, StyleSheet } from "react-native";
import { PageTemplate } from "./PageTemplate";
import { useNavigation } from "@react-navigation/native";
import { NavBar } from "./material/NavBar";
import { colors } from "../styles/styles";

//page for general tips for sleeping. Should be available to all users when logged in.
export function GeneralPage() {
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        text: {
            color: colors.text_white
        }
    })

    return (
        <PageTemplate>
            <View>
                <Card style={{ padding: 50 }}>
                    <Text style={styles.text}>Sov i gjennomsnitt 8 timer hver dag</Text>
                    <Text style={styles.text}>Ikke bruk skjerm på mobil,tablet eller laptop 2 timer før leggetid</Text>
                    <Text style={styles.text}>Bruk sengen kun til soving</Text>
                </Card>
            </View>
        </PageTemplate>
    )
}