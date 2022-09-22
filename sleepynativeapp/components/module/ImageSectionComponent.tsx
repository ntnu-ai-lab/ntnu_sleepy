import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../styles/styles";
import { ImageSection } from "../../types/modules";
import { Card } from "../material/Card";

export function ImageSectionComponent(props: {
    section: ImageSection
}) {

    const {section} = props

    const styles = StyleSheet.create({
        heading: {
            color: colors.text_white,
            fontSize: 20 
        },
        img: {

        }
    })

    return (
        <Card>
            
        </Card>
    )
}