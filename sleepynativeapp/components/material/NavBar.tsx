import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Tools from "../../assets/tools.svg";
import ToolsSelected from "../../assets/toolsSelected.svg";
import Home from "../../assets/home.svg";
import Stats from "../../assets/statistics.svg";
import StatsSelected from "../../assets/statsSelected.svg";
import Assignment from "../../assets/assignment.svg";
import AssignmentSelected from "../../assets/assignmentSelected.svg";
import Settings from "../../assets/settings.svg";
import SettingsSelected from "../../assets/settingsSelected.svg";
import HomeSelected from "../../assets/homeselected.svg";
import { colors } from "../../styles/styles";
import { IconButton } from "./IconButton";
import { NavigationRouteContext, useNavigation, useRoute } from "@react-navigation/native";

export function NavBar() {

    const navigation = useNavigation();
    const route = useRoute();

    const styles = StyleSheet.create({
        NavBar: {
            height: 75,
            width: "100%",
            backgroundColor: colors.primary,
            justifyContent: "space-evenly",
            display: "flex",
            flexDirection: "row",
            flex: 1,
            zIndex: 100,
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            //top: Dimensions.get("window").height - 10
        },
        Image: {
            height: 50,
            width: 50,
            padding: 37,
            flexDirection: "row",
        },
    });

    return (
        <View style={styles.NavBar} >
            <IconButton style={styles.Image} onClick={() => //@ts-ignore
            { navigation.navigate("home") }}>
                {route.name === "home" ? <HomeSelected /> : <Home />}
            </IconButton>
            <IconButton style={styles.Image} onClick={() => //@ts-ignore
            { navigation.navigate("tools") }}>
                {route.name === "tools" ? <ToolsSelected /> : <Tools />}
            </IconButton>
            <IconButton style={styles.Image} onClick={() => //@ts-ignore
            { navigation.navigate("stats") }}>
                {route.name === "stats" ? <StatsSelected /> : <Stats />}
            </IconButton>
            <IconButton style={styles.Image} onClick={() => //@ts-ignore
            { navigation.navigate("assignment") }}>
                {route.name === "assignment" ? <AssignmentSelected /> : <Assignment />}
            </IconButton>
            <IconButton style={styles.Image} onClick={() => //@ts-ignore
            { navigation.navigate("profile") }}>
                {route.name === "profile" ? <SettingsSelected /> : <Settings />}
            </IconButton>
        </View>
    );
}