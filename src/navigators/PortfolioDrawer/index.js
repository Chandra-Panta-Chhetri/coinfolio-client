import { createDrawerNavigator } from "@react-navigation/drawer";
import { PortfolioScreen } from "../../screens";
import { Portfolios } from "../../screens/Portfolio/components";
import Header from "./Header";
import SCREEN_NAMES from "../screen-names";

const Drawer = createDrawerNavigator();
const PortfolioDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Portfolios {...props} />} screenOptions={{ swipeEnabled: false }}>
      <Drawer.Screen
        name={SCREEN_NAMES.PORTFOLIO}
        component={PortfolioScreen}
        options={{
          header: (props) => <Header {...props} />
        }}
      />
    </Drawer.Navigator>
  );
};

export default PortfolioDrawer;
