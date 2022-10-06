import React, { useEffect, useState } from "react";
import { getAllModules, getModule } from "../api/modulesApi";
import { View, Text } from "react-native";
import { Module } from "../types/modules";

export function TestGetModules() {
  const [module, setModule] = useState<Module | undefined>(undefined);
  console.log(module);

  async function handleGetModules() {
    const modules = await getAllModules();
    modules && setModule(await getModule(modules[0].id));
  }

  useEffect(() => {
    handleGetModules();
  }, []);

  useEffect(() => console.log(module));

  return (
    <View>
      {module?.pages[0].sections.map((section) => {
        switch (section.type) {
          case "text":
            return <Text>{section.heading}</Text>;
        }
      })}
    </View>
  );
}
