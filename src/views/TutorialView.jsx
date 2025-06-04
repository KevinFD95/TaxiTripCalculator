import { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

import tutorial from "../../assets/video/tutorial-taxi-calculator.mp4";
import { useTheme } from "../context/ThemeContext";
import { globalStyles } from "../styles/globalStyles";
import { useFocusEffect } from "@react-navigation/native";

export default function TutorialView({ navigation }) {
  const { theme } = useTheme();

  const themeStyles = globalStyles(theme);

  const player = useVideoPlayer(tutorial, (player) => {
    player.lopp = false;
    player.play();
  });

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        title: "Tutorial",
      });
    }, [navigation]),
  );

  return (
    <View style={themeStyles.mainContainer}>
      <VideoView
        contentFit="cover"
        style={styles.video}
        player={player}
        nativeControls
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: "auto",
    height: "100%",
  },
});
