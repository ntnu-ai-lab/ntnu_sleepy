import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  LayoutRectangle,
  ScrollView,
  TouchableOpacity,
  Touchable,
} from "react-native";
//import { IconButton } from "./IconButton";
import { SvgXml } from "react-native-svg";
import { colors } from "../../styles/styles";
import { Card, Title, Paragraph, Button, TextInput, Text, IconButton } from 'react-native-paper'


export function Select(props: {
  placeholderText?: string;
  onChange?: (arg: any) => void;
  options: any[];
  value?: any;
  optionDisplay: (arg: any) => string;
  zIndex?: number;
}) {
  const { placeholderText, onChange, options, value, optionDisplay, zIndex } =
    props;
  const [selected, setSelected] = useState<any>(value);
  const [targeted, setTargeted] = useState<boolean>(false);
  const [displayLayout, setDisplayLayout] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected]);

  function toggleDropdown() {
    setTargeted(!targeted);
  }

  const angleXml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5303 9.53033L12.5303 15.5303C12.2374 15.8232 11.7626 15.8232 11.4697 15.5303L5.46968 9.53033L6.53033 8.46967L12 13.9393L17.4697 8.46967L18.5303 9.53033Z" fill="black"/>
  </svg>
  `;

  const styles = StyleSheet.create({
    wrapperDiv: {
      height: 56,
      borderRadius: 10,
      width: "100%",
      maxWidth: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      marginVertical: 5,
      borderColor: "rgba(0, 0, 0, 0.24)",
      borderWidth: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    textStyle: {
      fontWeight: "400",
      fontSize: 16,
      width: "80%",
      color: selected ? "#000" : colors.text_secondary,
    },
    dropdown: {
      display: targeted ? "flex" : "none",
      position: "absolute",
      top: displayLayout.y + displayLayout.height,
      left: displayLayout.x,
      width: displayLayout.width,
      backgroundColor: "#FFF",
      zIndex: 15000,
      borderRadius: 10,
      overflow: "hidden",
      borderColor: "rgba(0, 0, 0, 0.24)",
      borderWidth: 1,
      paddingTop: 5,
    },
    defaultOptionStyle: {
      width: "100%",
      marginBottom: 1,
      height: 40,
      justifyContent: "center",
      alignItems: "flex-start",
      paddingHorizontal: 20,
    },
  });

  return (
    <View style={{ zIndex: zIndex ? zIndex : 100 }}>
      <TouchableOpacity onPress={toggleDropdown}>
        <View
          style={styles.wrapperDiv}
          onLayout={(e) => {
            setDisplayLayout(e.nativeEvent.layout);
          }}
        >
          <Text style={styles.textStyle}>
            {selected ? optionDisplay(selected) : placeholderText}
          </Text>
          <IconButton icon="arrow-down-drop-circle-outline" />

        </View>
      </TouchableOpacity>

      <ScrollView style={styles.dropdown}>
        {options.map((option: any) => {
          return (
            <TouchableOpacity
              key={optionDisplay(option)}
              {...props}
              style={[styles.defaultOptionStyle]}
              onPress={() => {
                setSelected(option);
                setTargeted(false);
              }}
            >
              <Text style={{ fontSize: 16 }}>{optionDisplay(option)}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
