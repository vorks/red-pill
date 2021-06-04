import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { theme } from "../constants";

import { MonoText } from "./styled-text";
import { ThemedText, ThemedView } from "./themed";

import type { WebBrowserResult } from "expo-web-browser";

export const EditScreenInfo = ({
  path,
}: {
  readonly path: string;
}): JSX.Element => (
  <ThemedView>
    <ThemedView style={styles.getStartedContainer}>
      <ThemedText
        style={styles.getStartedText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        {"Open up the code for this screen:"}
      </ThemedText>

      <ThemedView
        style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
        darkColor="rgba(255,255,255,0.05)"
        lightColor="rgba(0,0,0,0.05)"
      >
        <MonoText>{path}</MonoText>
      </ThemedView>

      <ThemedText
        style={styles.getStartedText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        {
          "Change any of the text, save the file, and your app will automatically update."
        }
      </ThemedText>
    </ThemedView>

    <ThemedView style={styles.helpContainer}>
      <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
        <ThemedText style={styles.helpLinkText} lightColor={theme.light.tint}>
          {
            "Tap here if your app doesn&apos;t automatically update after making changes"
          }
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  </ThemedView>
);

const handleHelpPress = (): Promise<WebBrowserResult> =>
  openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );

const styles = StyleSheet.create({
  codeHighlightContainer: { borderRadius: 3, paddingHorizontal: 4 },
  getStartedContainer: { alignItems: "center", marginHorizontal: 50 },
  getStartedText: { fontSize: 17, lineHeight: 24, textAlign: "center" },
  helpContainer: { alignItems: "center", marginHorizontal: 20, marginTop: 15 },
  helpLink: { paddingVertical: 15 },
  helpLinkText: { textAlign: "center" },
  homeScreenFilename: { marginVertical: 7 },
});