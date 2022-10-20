import React from "react";
import { View, Text, Modal, StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/styles";
import { Button } from "./Button";
import { Card } from "./Card";

export function Alert(props: {
  type: "confirmation" | "alert";
  content: string;
  open: boolean;
  setOpen: (arg1: boolean) => void;
  onConfirm?: () => void;
}) {
  const { type, content, open, setOpen, onConfirm } = props;

  const styles = StyleSheet.create({
    modalCard: {
      position: "absolute",
      top: Dimensions.get("window").height * 0.4,
      alignSelf: "center",
      width: "80%",
    },
    buttonText: {
      color: colors.text_primary,
    },
    contentText: {
      color: colors.text_white,
    },
    modalBackground: {
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
      backgroundColor: `${colors.primary}AA`,
    },
  });

  return (
    <Modal visible={open} transparent={true}>
      <View style={styles.modalBackground}>
        <Card style={styles.modalCard}>
          <Text style={styles.contentText}>{content}</Text>
          {type === "confirmation" ? (
            <View
              style={{
                flexDirection: "row-reverse",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                style={{ width: "30%" }}
                variant="contained"
                onClick={() => setOpen(false)}
              >
                <Text style={styles.buttonText}>Nei</Text>
              </Button>
              <Button
                style={{ width: "30%" }}
                variant="contained"
                onClick={() => {
                  onConfirm;
                  setOpen(false);
                }}
              >
                <Text style={styles.buttonText}>Ja</Text>
              </Button>
            </View>
          ) : (
            <View style={{ justifyContent: "center" }}>
              <Button onClick={() => setOpen(false)} variant={"contained"}>
                <Text style={styles.buttonText}>Ok</Text>
              </Button>
            </View>
          )}
        </Card>
      </View>
    </Modal>
  );
}
