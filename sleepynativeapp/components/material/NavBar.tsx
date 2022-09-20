import React from "react";
import { View, StyleSheet} from "react-native";
import Tools from "../../assets/tools.svg";
import Home from "../../assets/home.svg";
import Stats from "../../assets/statistics.svg";
import Assignment from "../../assets/assignment.svg";
import Settings from "../../assets/settings.svg";
import { colors } from "../../styles/styles";
import { IconButton } from "./IconButton";

export function NavBar() {

    const styles = StyleSheet.create ({
        NavBar: {
            height: 75,
            width: "100%",
            backgroundColor: colors.primary,
            display: "flex",
            flexDirection: "row",
           
        },
        Image: {
            height: 50,
            width: 50,
            padding: 37,
            flexDirection: "row",
        },
    });

    return (
        <View style={styles.NavBar}>
           <IconButton style={styles.Image}>
           <Home />
            </IconButton>
            <IconButton style={styles.Image}>
            <Tools />
            </IconButton>
            <IconButton style={styles.Image}>
            <Stats />
            </IconButton>
            <IconButton style={styles.Image}>
            <Assignment />
            </IconButton>
            <IconButton style={styles.Image}>
            <Settings />
            </IconButton>
        </View>
    );
}