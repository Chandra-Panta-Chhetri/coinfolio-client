import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import * as Linking from "expo-linking";
import { EvilIcons } from "@expo/vector-icons";
import { GLOBAL_CONSTANTS } from "../../constants";
import { PressableView } from "../../shared-components";

const links = [
  {
    label: "Website",
    value: "https://www.ethereum.org"
  },
  {
    label: "Source Code",
    value: "https://www.ethereum.org"
  },
  {
    label: "Block Explorer",
    value: "https://www.ethereum.org"
  },
  {
    label: "Reddit",
    value: "https://www.ethereum.org"
  },
  {
    label: "Facebook",
    value: "https://www.ethereum.org"
  },
  {
    label: "Twitter",
    value: "https://www.ethereum.org"
  }
];

const AssetDetailAboutScreen = () => {
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={STYLES.container}>
      <Card style={{ marginBottom: GLOBAL_CONSTANTS.LG_MARGIN }}>
        <Card.Content>
          {links.map((l, i) => (
            <PressableView
              onPress={() => Linking.openURL(l.value)}
              key={l.label}
              viewStyle={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                borderColor: colors.border,
                flex: 1,
                borderBottomWidth: i === links.length - 1 ? 0 : GLOBAL_CONSTANTS.TABLE_BORDER_WIDTH
              }}
            >
              <Text style={[TYPOGRAPHY.body2, { flex: 1 }]}>{l.label}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <Text style={[TYPOGRAPHY.body1, { marginRight: GLOBAL_CONSTANTS.SM_MARGIN, flex: 1 }]}>{l.value}</Text>
                <EvilIcons name="external-link" size={GLOBAL_CONSTANTS.ICON_SIZE} color={colors.text} />
              </View>
            </PressableView>
          ))}
        </Card.Content>
      </Card>
      <Text style={TYPOGRAPHY.body1}>
        Ethereum is a global, open-source platform for decentralized applications. In other words, the vision is to
        create a world computer that anyone can build applications in a decentralized manner; while all states and data
        are distributed and publicly accessible. Ethereum supports smart contracts in which developers can write code in
        order to program digital value. Examples of decentralized apps (dapps) that are built on Ethereum includes
        token, non-fungible tokens, decentralized finance apps, lending protocol, decentralized exchanges, and much
        more.
      </Text>
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  }
});

export default AssetDetailAboutScreen;
