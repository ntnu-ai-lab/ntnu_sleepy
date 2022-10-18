import React from "react"
import { View, Text } from "react-native"
import { Button } from "./Button";
import { Card } from "./Card";

export function Alert( props: {
    type: "confirmation" | "alert";
    content: string
}) {
    
    const {type, content} = props

    return (
        <View> 
            <Card>
                <Text>{content}</Text>
                {
                    type === "confirmation" ? (
                        <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                            <Button><Text>No</Text></Button>
                            <Button><Text>Yes</Text></Button>
                        </View>
                    ) : (
                        <View style={{justifyContent: "center"}}>
                            <Button><Text>Ok</Text></Button>
                        </View>
                    )
                }
            </Card>
        </View>
    )
}