import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";
import { ExternalLink } from "../../../components";
import { objKeyToString } from "../../../utils";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { TYPOGRAPHY } from "../../../styles";

const Links = ({ links }) => {
  const { colors } = useTheme();

  return (
    <Card style={STYLES.linksCard}>
      <Card.Content>
        {Object.keys(links ?? {}).map((label, i) => (
          <View
            key={label}
            style={[
              STYLES.linkContainer,
              {
                borderColor: colors.border,
                borderBottomWidth: i === Object.keys(links ?? {})?.length - 1 ? 0 : GLOBAL_CONSTANTS.TABLE_BORDER_WIDTH
              }
            ]}
          >
            <Text style={STYLES.linkLabel}>{objKeyToString(label)}</Text>
            <View style={STYLES.links}>
              {(links ?? {})[label]?.urls?.map((url, i) => (
                <ExternalLink key={url + i} url={url} textStyle={STYLES.url} numberOfLines={1}>
                  <EvilIcons name="external-link" size={GLOBAL_CONSTANTS.ICON_SIZE} color={colors.text} />
                </ExternalLink>
              ))}
            </View>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

const STYLES = StyleSheet.create({
  linksCard: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    flex: 1,
    alignItems: "flex-start"
  },
  linkLabel: {
    ...TYPOGRAPHY.body2,
    textTransform: "capitalize",
    flex: 1
  },
  links: {
    flex: 1
  },
  url: {
    ...TYPOGRAPHY.body1,
    marginRight: GLOBAL_CONSTANTS.SM_MARGIN,
    flex: 1
  }
});

export default Links;
