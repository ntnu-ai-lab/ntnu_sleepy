import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  LayoutRectangle,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { colors } from "../../styles/styles";
import AngleDown from "../../assets/angleDown.svg";
import AngleUp from "../../assets/angleUp.svg";

export function Select(props: {
  placeholderText?: string;
  onChange?: (arg: any) => void;
  options: any[];
  value?: any;
  optionDisplay: (arg: any) => string;
  zIndex?: number;
  editable?: boolean;
}) {
  const {
    placeholderText,
    onChange,
    options,
    value,
    optionDisplay,
    zIndex,
    editable,
  } = props;

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

  const styles = StyleSheet.create({
    wrapperDiv: {
      height: 56,
      borderRadius: 20,
      width: "100%",
      maxWidth: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      marginVertical: 5,
      backgroundColor: colors.primary,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    textStyle: {
      fontWeight: "400",
      fontSize: 16,
      width: "80%",
      color: editable === false ? colors.text_secondary : selected ? "#000" : colors.text_secondary,
    },
    dropdown: {
      display: targeted ? "flex" : "none",
      width: displayLayout.width,
      backgroundColor: colors.primary,
      zIndex: 15000,
      borderRadius: 10,
      overflow: "hidden",
      borderColor: "rgba(0, 0, 0, 0.24)",
      borderWidth: 1,
      paddingTop: 5,
      maxHeight: 210,
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
      <TouchableOpacity
        onPress={() => {
          if (editable !== false) toggleDropdown();
        }}
      >
        <View
          style={styles.wrapperDiv}
          onLayout={(e) => {
            setDisplayLayout(e.nativeEvent.layout);
          }}
        >
          <Text style={styles.textStyle}>
            {selected ? optionDisplay(selected) : placeholderText}
          </Text>
          {editable !== false ? (
            <View>{targeted ? <AngleUp /> : <AngleDown />}</View>
          ) : (
            <View />
          )}
        </View>
      </TouchableOpacity>
      {options.length < 5 ? (
        <View style={styles.dropdown}>
          {options.map((option: any, n) => {
            return (
              <TouchableOpacity
                key={optionDisplay(option) + n}
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
        </View>
      ) : (
        <ScrollView style={styles.dropdown} scrollToOverflowEnabled={true}>
          {options.map((option: any, n) => {
            return (
              <TouchableOpacity
                key={optionDisplay(option) + n}
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
      )}
    </View>
  );
}
