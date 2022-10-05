import React from "react";
import { View } from "react-native";
import { VideoSection } from "../../types/modules";
import TestVideo from "../TestVideo";

export function VideoSectionComponent(props: {
    section: VideoSection
}) {


    return (
        <TestVideo uri={props.section.uri} />
    )
}