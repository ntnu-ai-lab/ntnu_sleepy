import React from "react";
import { View } from "react-native";
import { testData, testPage } from "../../helpers/testdata";
import { Module, Page, Section } from "../../types/modules";
import { FormSectionComponent } from "./FormSectionComponent";
import { ImageSectionComponent } from "./ImageSectionComponent";
import { TextSectionComponent } from "./TextSectionComponent";
import { VideoSectionComponent } from "./VideoSectionComponent";
import { PageTemplate } from "../PageTemplate";
import { useRoute } from "@react-navigation/native";

export function ModulePagePage() {

  const route = useRoute() // @ts-ignore
  const page: Page = route.params?.page !== undefined ? route.params.page : testPage;

  return (
    <PageTemplate>
      {page.sections.map((s: Section, i) => {
        const type = s.type;
        switch (type) {
          case "img": {
            return (
              <View key={i}>
                <ImageSectionComponent section={s} />
              </View>
            );
          }
          case "video": {
            return (
              <View key={i}>
                <VideoSectionComponent section={s} />
              </View>
            );
          }
          case "form": {
            return (
              <View key={i}>
                <FormSectionComponent section={s} />
              </View>
            );
          }
          case "text": {
            return (
              <View key={i}>
                <TextSectionComponent section={s} />
              </View>
            );
          }
        }
      })}
    </PageTemplate>
  );
}
