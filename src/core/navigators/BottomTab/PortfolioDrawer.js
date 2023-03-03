import { createDrawerNavigator } from "@react-navigation/drawer";
import { PortfolioScreen } from "../../../screens";
import { Appbar } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { TYPOGRAPHY } from "../../../styles";
import UserPortfolios from "./UserPortfolios";

const Drawer = createDrawerNavigator();
const PortfolioDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={() => <UserPortfolios />} screenOptions={{ swipeEnabled: false }}>
      <Drawer.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          header: ({ navigation }) => (
            <Appbar.Header elevated statusBarHeight={0}>
              <Appbar.Action
                icon="menu-open"
                size={GLOBAL_CONSTANTS.ICON_SIZE}
                onPress={() => navigation.openDrawer()}
              />
              <Appbar.Content
                title={"Portfolio"}
                style={{ marginLeft: 0, paddingHorizontal: 0 }}
                titleStyle={TYPOGRAPHY.subheading}
              />
            </Appbar.Header>
          )
        }}
      />
    </Drawer.Navigator>
  );
};

export default PortfolioDrawer;
