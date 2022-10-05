import React from "react";
import { View } from "react-native";
import { testData, testPage } from "../helpers/testdata";
import { Module, Page, Section } from "../types/modules";
import { FormSectionComponent } from "./module/FormSectionComponent";
import { ImageSectionComponent } from "./module/ImageSectionComponent";
import { TextSectionComponent } from "./module/TextSectionComponent";
import { VideoSectionComponent } from "./module/VideoSectionComponent";
import { PageTemplate } from "./PageTemplate";

export function TestModuleComponent() {
  const page: Page = testPage;

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
