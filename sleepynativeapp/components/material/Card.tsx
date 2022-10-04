import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../styles/styles";

export function Card(props: {
    children: ReactNode[] | ReactNode,
    style?: any
}) {

    const {children, style} = props

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.secondary,
            borderRadius: 20,
            margin: 10,
            padding: 10
        }
    })

    return (
        <View style={[styles.card, style]}>
            { children }
        </View>
    )
}