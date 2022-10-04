import React, { useState } from "react";
import { getModule } from "../api/modulesApi";
import { Text, View } from "react-native";
import { Module } from "../types/modules";
import { Card } from "react-native-paper";

export function TestGetModules() {
  const module = getModule("d37565e2-4241-46ed-985d-ca5c3755f2e1");
  console.log("module", module);

  return (
    <View>
      <Card>
        <Text>{module.toString()}</Text>
      </Card>
    </View>
  );
}
