import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { TYPOGRAPHY } from "../../../styles";

const PortfolioDrawerHeader = ({ navigation }) => (
  <Appbar.Header elevated statusBarHeight={0}>
    <Appbar.Action icon="menu-open" size={GLOBAL_CONSTANTS.ICON_SIZE} onPress={() => navigation.openDrawer()} />
    <Appbar.Content title={"Portfolio"} style={STYLES.headerTitle} titleStyle={TYPOGRAPHY.subheading} />
  </Appbar.Header>
);

const STYLES = StyleSheet.create({
  headerTitle: {
    marginLeft: 0,
    paddingHorizontal: 0
  }
});

export default PortfolioDrawerHeader;
