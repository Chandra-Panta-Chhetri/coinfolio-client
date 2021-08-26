import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import GlobalStyles from "../GlobalStyles";
import { connect } from "react-redux";
import {
  selectCurrentUser,
  selectIsChangingAuthState
} from "../redux/user/user.selectors";
import { startLogOut } from "../redux/user/user.actions";
import Preferences from "../components/settings/Preferences";
import About from "../components/settings/About";
import Account from "../components/settings/Account";
import Security from "../components/settings/Security";
import SettingOption from "../components/shared/SettingOption";
import CONSTANTS from "../Constants";
import MoreOptions from "../components/shared/MoreOptions";
import { MaterialIcons } from "@expo/vector-icons";
import { Paragraph } from "react-native-paper";
import useConfirmationDialog from "../hooks/useConfirmationDialog";

const LogOutButton = ({ onPress }) => (
  <SettingOption
    label="Logout"
    iconComponent={
      <MaterialIcons name="logout" size={CONSTANTS.SETTINGS.ICON_SIZE} />
    }
    iconBackgroundColor={CONSTANTS.SETTINGS.LOG_OUT_BACKGROUND_COLOR}
    endComponent={<MoreOptions />}
    onPress={onPress}
  />
);

const UserDetails = ({ currentUser }) => (
  <View style={[GlobalStyles.componentContainer, styles.container]}>
    <Paragraph style={GlobalStyles.title}>{currentUser.name}</Paragraph>
    <Paragraph style={GlobalStyles.body1}>{currentUser.email}</Paragraph>
  </View>
);

function SettingsScreen({ logOut, currentUser, isLoggingOut }) {
  const { openDialog, dialogComponent } = useConfirmationDialog(
    "Logout Confirmation",
    "Are you sure you want to log out?",
    logOut,
    isLoggingOut
  );

  return (
    <FlatList
      contentContainerStyle={GlobalStyles.screenContainer}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          {currentUser && <UserDetails currentUser={currentUser} />}
          {currentUser && <Account />}
          <Preferences />
          <Security />
          <About />
          {currentUser && (
            <>
              <LogOutButton onPress={openDialog} />
              {dialogComponent}
            </>
          )}
        </>
      }
      listKey="SettingsScreenList"
    />
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", minHeight: 130 }
});

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  isLoggingOut: selectIsChangingAuthState(state)
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(startLogOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
