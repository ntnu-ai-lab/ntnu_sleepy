import * as React from "react";
import { StyleSheet } from "react-native";
import { Video } from "expo-av";

export default function VideoComponent({ uri }: { uri: string }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <Video
      ref={video}
      style={styles.video}
      source={{
        uri: uri,
      }}
      useNativeControls
      isLooping={true}
      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
    maxWidth: "100%",
    borderRadius: 20,
  },
});
