import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import * as Linking from "expo-linking";
import { EvilIcons } from "@expo/vector-icons";
import { GLOBAL_CONSTANTS } from "../../constants";
import { PressableView } from "../../shared-components";
import { connect } from "react-redux";
import { selectAssetAbout, selectIsLoadingAssetAbout, startAssetAboutFetch } from "../../redux/asset-detail";
import { AboutSkeleton } from "./components";

const AssetDetailAboutScreen = ({ about, isLoading, fetchAbout, route }) => {
  const { colors } = useTheme();
  const { links = [], description } = about;
  const { params } = route;

  useEffect(() => {
    fetchAbout(params.id, { symbol: params.symbol, name: params.name });
  }, []);

  return (
    <ScrollView contentContainerStyle={STYLES.container}>
      {isLoading ? (
        <AboutSkeleton />
      ) : (
        <>
          <Card style={STYLES.linksCard}>
            <Card.Content>
              {[].map((l, i) => (
                <PressableView
                  onPress={() => Linking.openURL(l.value)}
                  key={l.label}
                  viewStyle={[
                    STYLES.linkContainer,
                    {
                      borderColor: colors.border,
                      borderBottomWidth: i === links.length - 1 ? 0 : GLOBAL_CONSTANTS.TABLE_BORDER_WIDTH
                    }
                  ]}
                >
                  <Text style={STYLES.linkLabel}>{l.label}</Text>
                  <View style={STYLES.linkValueContainer}>
                    <Text style={STYLES.linkValue}>{l.value}</Text>
                    <EvilIcons name="external-link" size={GLOBAL_CONSTANTS.ICON_SIZE} color={colors.text} />
                  </View>
                </PressableView>
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
    flex: 1
  },
  linkLabel: {
    ...TYPOGRAPHY.body2,
    flex: 1
  },
  linkValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  linkValue: {
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
