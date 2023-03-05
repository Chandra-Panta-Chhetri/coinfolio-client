import { createDrawerNavigator } from "@react-navigation/drawer";
import { PortfolioScreen } from "../../../screens";
import { UserPortfolios } from "../../../screens/portfolio/components";
import Header from "./Header";

const Drawer = createDrawerNavigator();
const PortfolioDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={() => <UserPortfolios />} screenOptions={{ swipeEnabled: false }}>
      <Drawer.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          header: Header
        }}
      />
    </Drawer.Navigator>
  );
};

export default PortfolioDrawer;
