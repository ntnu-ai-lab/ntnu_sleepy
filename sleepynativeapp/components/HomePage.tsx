import React from "react";
import { View, Text } from "react-native";
import { NavBar } from "./material/NavBar";
import { PageTemplate } from "./PageTemplate";

export function HomePage() {

    return (
        <PageTemplate>
            <View>
                <Text>
                    This is the homepage
                </Text>
            </View>
        </PageTemplate>
    )
}