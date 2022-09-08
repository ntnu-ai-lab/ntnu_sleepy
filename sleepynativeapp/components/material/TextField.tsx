import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

export function TextField(props: {
    onChange?: (arg: string) => void,
    value: string,
    placeholderText?: string,
    editable?: boolean
}) {
    const {onChange, value, placeholderText} = props;

    const styles = StyleSheet.create({
        wrapper: {
            justifyContent: "center",
        }
    })

    return (
        <View>
            <TextInput value={value} onChangeText={onChange}/>
        </View>
    )
}