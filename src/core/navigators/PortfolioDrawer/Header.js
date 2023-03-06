import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { connect } from "react-redux";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { selectActivePortfolio } from "../../../redux/portfolio";
import { TYPOGRAPHY } from "../../../styles";

const PortfolioDrawerHeader = ({ navigation, activePortfolio }) => (
  <Appbar.Header elevated statusBarHeight={0}>
    <Appbar.Action icon="menu-open" size={GLOBAL_CONSTANTS.ICON_SIZE} onPress={() => navigation.openDrawer()} />
    <Appbar.Content
      title={activePortfolio?.nickname !== undefined ? activePortfolio?.nickname : "Menu"}
      style={STYLES.headerTitle}
      titleStyle={TYPOGRAPHY.subheading}
    />
  </Appbar.Header>
);

const STYLES = StyleSheet.create({
  headerTitle: {
    marginLeft: 0,
    paddingHorizontal: 0
  }
});

const mapStateToProps = (state) => ({
  activePortfolio: selectActivePortfolio(state)
});

export default connect(mapStateToProps)(PortfolioDrawerHeader);
