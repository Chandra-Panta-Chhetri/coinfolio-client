import React from "react";
import { FlatList, View } from "react-native";
import GlobalStyles from "../GlobalStyles";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { startLogOut } from "../redux/user/user.actions";
import Preferences from "../components/settings/Preferences";
import About from "../components/settings/About";
import Account from "../components/settings/Account";
import Security from "../components/settings/Security";
import SettingOption from "../components/shared/SettingOption";
import CONSTANTS from "../Constants";
import MoreOptions from "../components/shared/MoreOptions";
import { MaterialIcons } from "@expo/vector-icons";

const LogOut = ({ logOut }) => (
  <SettingOption
    label="Logout"
    iconComponent={
      <MaterialIcons name="logout" size={CONSTANTS.SETTINGS.ICON_SIZE} />
    }
    iconBackgroundColor={CONSTANTS.SETTINGS.LOG_OUT_BACKGROUND_COLOR}
    endComponent={<MoreOptions />}
    onPress={logOut}
  />
);

function SettingsScreen({ logOut, currentUser }) {
  return (
    <FlatList
      contentContainerStyle={GlobalStyles.screenContainer}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          {currentUser && <Account />}
          <Preferences />
          <Security />
          <About />
          {currentUser && <LogOut logOut={logOut} />}
        </>
      }
      listKey="SettingsScreenList"
    />
  );
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(startLogOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
