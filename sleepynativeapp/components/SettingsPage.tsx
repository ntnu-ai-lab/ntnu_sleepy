import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { IconButton } from "./material/IconButton";
import { NavBar } from "./material/NavBar";
import { PageTemplate } from "./PageTemplate";

export function SettingsPage() {

    const navigation = useNavigation();

    return (
        <PageTemplate>
            <View>
                <Button onPress={() => //@ts-ignore
                { navigation.navigate("login") }}>
                    logout
                </Button>
                <Text>
                    This is the settings
                </Text>
            </View>
        </PageTemplate>
    )
}