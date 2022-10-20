import React, { useState } from "react";
import { Text, View } from "react-native";
import { Part } from "../../types/modules";
import { PageTemplate } from "../material/PageTemplate";
import { ProgressBar } from "../material/ProgressBar";
import { ModulePagePage } from "./ModulePagePage";
import { IconButton } from "../material/IconButton";

export function ModulePartPage(props: { part: Part }) {
  const { part } = props;
  const [currentPage, setCurrentPage] = useState<number>(0);
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
        <ProgressBar percentage={((currentPage + 1) / numberOfPages) * 100} />
      </View>
      <View>
        <ModulePagePage page={part.pages[currentPage]} navigatePage={navigatePage}/>
      </View>
    </PageTemplate>
  );
}
