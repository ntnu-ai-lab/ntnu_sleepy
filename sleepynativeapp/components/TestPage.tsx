import React from "react";
import { View, ScrollView, Text, Dimensions } from "react-native";
import { NavBar } from "./material/NavBar";
import { PageTemplate } from "./PageTemplate";


export function TestPage() {

    return (
        <PageTemplate>
            <ScrollView>
                <Text>
                    Hello world
                </Text>
            </ScrollView>
            <NavBar />
        </PageTemplate>
    )
}