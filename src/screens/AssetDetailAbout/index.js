import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { connect } from "react-redux";
import { selectAssetAbout, selectIsLoadingAssetAbout, fetchAssetAbout } from "../../redux/asset-detail";
import { AboutSkeleton, Links } from "./components";

const AssetDetailAboutScreen = ({ about, isLoadingAbout, fetchAbout, route }) => {
  const { links, description } = about ?? {};
  const { params } = route;

  useEffect(() => {
    fetchAbout(params?.id);
  }, []);

  return (
    <ScrollView contentContainerStyle={STYLES.container}>
      {isLoadingAbout ? (
        <AboutSkeleton />
      ) : (
        <>
          <Links links={links} />
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
  }
});

const mapStateToProps = (state) => ({
  about: selectAssetAbout(state),
  isLoadingAbout: selectIsLoadingAssetAbout(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchAbout: (id) => dispatch(fetchAssetAbout(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailAboutScreen);
