import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Page, Section } from "../../types/modules";
import { FormSectionComponent } from "./FormSectionComponent";
import { ImageSectionComponent } from "./ImageSectionComponent";
import { TextSectionComponent } from "./TextSectionComponent";
import { VideoSectionComponent } from "./VideoSectionComponent";
import { PageTemplate } from "../PageTemplate";
import { getAllModules, useModule } from "../../api/modulesApi";
import { testData } from "../../helpers/testdata";

export function ModulePagePage(props: {
  page: Page;
}) {

  /*
  const [moduleId, setModuleId] = useState<string | undefined>(undefined);
  const { module, loading, error } = useModule(moduleId);

  useEffect(() => {
    getAllModules().then((m) => {
      m && setModuleId(m[0].id);
    });
  }, []);
  if (loading) {
    return <Text>Loading...</Text>;
  }
 */
  // module?.pages[0] ||
  const {page} = props
  
  return (
    <PageTemplate>
      <ScrollView>
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
      </ScrollView>
    </PageTemplate>
  );
}
