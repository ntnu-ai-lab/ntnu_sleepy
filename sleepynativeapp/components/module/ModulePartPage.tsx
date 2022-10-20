import React, { useState } from "react";
import { Text, View } from "react-native";
import { Part } from "../../types/modules";
import { PageTemplate } from "../material/PageTemplate";
import { ProgressBar } from "../material/ProgressBar";
import { ModulePagePage } from "./ModulePagePage";
import { IconButton } from "../material/IconButton";
import { useRoute } from "@react-navigation/native";

export function ModulePartPage() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const route = useRoute(); // @ts-ignore
  const part = route.params.part
  const numberOfPages = part.pages.length;
  

  function navigatePage(arg1: number) {
    console.log(currentPage, numberOfPages)
    if (currentPage === 0 && arg1 === -1) return
    if (currentPage === (numberOfPages - 1) && arg1 === 1) return 
    setCurrentPage(currentPage + arg1)
  }

  return (
    <PageTemplate>
      <View style={{ margin: 5 }}>
        <Text style={{ fontSize: 18, paddingBottom: 5 }}>
          Velkommen til denne delen!
        </Text>
        <ProgressBar percentage={(currentPage / (numberOfPages - 1) ) * 100} />
      </View>
      <View>
        <ModulePagePage page={part.pages[currentPage]} navigatePage={navigatePage}/>
      </View>
    </PageTemplate>
  );
}
