import React, { useEffect, useRef } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Page, Section } from "../../types/modules";
import { FormSectionComponent } from "./section/FormSectionComponent";
import { ImageSectionComponent } from "./section/ImageSectionComponent";
import { TextSectionComponent } from "./section/TextSectionComponent";
import { VideoSectionComponent } from "./section/VideoSectionComponent";
import { PageTemplate } from "../material/PageTemplate";
import { IconButton } from "../material/IconButton";
import ArrowForward from "../../assets/arrowForward.svg";
import ArrowBack from "../../assets/arrowBack.svg";
import { useNavigation } from "@react-navigation/native";
import { moduleProgression } from "../../state/atoms";
import { useRecoilState } from "recoil";
import { QuizSectionComponent } from "./section/QuizSectionComponent";

export function ModulePagePage(props: {
  page: Page;
  navigatePage: (arg1: number) => void;
  navigatePart: (arg1: number) => void;
  pageProgression: number;
}) {
  const { page, navigatePage, pageProgression, navigatePart } = props;
  const scrollRef = useRef(null);
  const navigation = useNavigation();

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
                case "quiz": {
                  return (
                    <View key={i}>
                      <QuizSectionComponent section={s} />
                    </View>
                  )
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
          {pageProgression === 0 ? (
            <View />
          ) : (
            <TouchableOpacity onPress={() => navigatePage(-1)}>
              <View
                style={{ flexDirection: "row-reverse", alignItems: "center" }}
              >
                <Text style={{ fontSize: 18 }}>Forrige</Text>
                <ArrowBack />
              </View>
            </TouchableOpacity>
          )}
          {pageProgression === 1 ? (
            <TouchableOpacity
              onPress={() => { 
                navigatePart(1)
                //@ts-ignore because navigation wack as fuck
                navigation.goBack();
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 18 }}>Fullfør</Text>
                <ArrowForward />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigatePage(1)}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 18 }}>Neste</Text>
                <ArrowForward />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
    </PageTemplate>
  );
}
