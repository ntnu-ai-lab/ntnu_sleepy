import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Page, Section } from "../../types/modules";
import { FormSectionComponent } from "./section/FormSectionComponent";
import { ImageSectionComponent } from "./section/ImageSectionComponent";
import { TextSectionComponent } from "./section/TextSectionComponent";
import { VideoSectionComponent } from "./section/VideoSectionComponent";
import { PageTemplate } from "../material/PageTemplate";
import { IconButton } from "../material/IconButton";
import ArrowForward from "../../assets/arrowForward.svg";
import ArrowBack from "../../assets/arrowBack.svg";

export function ModulePagePage(props: {
  page: Page;
  navigatePage: (arg1: number) => void;
}) {
  const { page, navigatePage } = props;
  const scrollRef = useRef(null);

  useEffect(() => {
    //@ts-ignore
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [page]);

  return (
    <PageTemplate>
      <ScrollView ref={scrollRef}>
        {page ? (
          <View>
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
          </View>
        ) : (
          <View />
        )}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            height: 50,
            paddingHorizontal: 20,
          }}
        >
          <IconButton onClick={() => navigatePage(-1)}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={() => navigatePage(1)}>
            <ArrowForward />
          </IconButton>
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
    </PageTemplate>
  );
}
