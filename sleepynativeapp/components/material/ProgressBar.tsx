import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../styles/styles";


export function ProgressBar (props: { percentage: number })  {
    const { percentage } = props;

    const styles = StyleSheet.create({
        outerView: {
            width: "100%",
            height: 30,
            backgroundColor: colors.secondary,
            borderRadius: 15,
            alignSelf: "center",
        },
        innerView: {
            width: percentage === 0 ? `${8}%` :`${percentage}%`,
            height: "100%",
            backgroundColor: colors.secondary_dark,
            borderRadius: 15,
        },
    });
    
    return (
        <View style={styles.outerView}>
            <View style={styles.innerView} />
        </View>
    );
}