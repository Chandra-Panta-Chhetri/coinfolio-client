import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { EvilIcons } from "@expo/vector-icons";
import { GLOBAL_CONSTANTS } from "../../constants";
import { ExternalLink } from "../../shared-components";
import { connect } from "react-redux";
import { selectAssetAbout, selectIsLoadingAssetAbout, startAssetAboutFetch } from "../../redux/asset-detail";
import { AboutSkeleton } from "./components";
import { objKeyToString } from "../../utils";

const AssetDetailAboutScreen = ({ about, isLoading, fetchAbout, route }) => {
  const { colors } = useTheme();
  const { links, description } = about;
  const { params } = route;

  useEffect(() => {
    fetchAbout(params.id, { symbol: params.symbol });
  }, []);

  return (
    <ScrollView contentContainerStyle={STYLES.container}>
      {isLoading ? (
        <AboutSkeleton />
      ) : (
        <>
          <Card style={STYLES.linksCard}>
            <Card.Content>
              {Object.keys(links).map((label, i) => (
                <View
                  key={label}
                  style={[
                    STYLES.linkContainer,
                    {
                      borderColor: colors.border,
                      borderBottomWidth: i === Object.keys(links).length - 1 ? 0 : GLOBAL_CONSTANTS.TABLE_BORDER_WIDTH
                    }
                  ]}
                >
                  <Text style={STYLES.linkLabel}>{objKeyToString(label)}</Text>
                  <View style={STYLES.links}>
                    {links[label].urls.map((url, i) => (
                      <ExternalLink key={url + i} url={url} textStyle={STYLES.url} numberOfLines={1}>
                        <EvilIcons name="external-link" size={GLOBAL_CONSTANTS.ICON_SIZE} color={colors.text} />
                      </ExternalLink>
                    ))}
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>
          <Text style={TYPOGRAPHY.body1}>{description}</Text>
        </>
      )}
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  },
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

const mapStateToProps = (state) => ({
  about: selectAssetAbout(state),
  isLoading: selectIsLoadingAssetAbout(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchAbout: (id, query) => dispatch(startAssetAboutFetch(id, query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailAboutScreen);
