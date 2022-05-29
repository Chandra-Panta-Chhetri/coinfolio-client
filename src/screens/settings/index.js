import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { connect } from "react-redux";
import { selectCurrentUser, selectIsChangingAuthState, startLogOut } from "../../redux/user";
import SETTINGS_CONSTANTS from "./Constants";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { useConfirmationDialog } from "../../hooks";
import {
  PreferencesSettings,
  AboutSettings,
  AccountSettings,
  SecuritySettings,
  SettingItem,
  MoreOptionsIndicator,
  LogInOrCreateAccount
} from "./components";

const UserDetails = ({ currentUser }) => (
  <View style={STYLES.userDetailsContainer}>
    <Text style={TYPOGRAPHY.title}>{currentUser.name}</Text>
    <Text style={TYPOGRAPHY.body1}>{currentUser.email}</Text>
  </View>
);

const SettingsScreen = ({ logOut, currentUser, isLoggingOut, navigation }) => {
  const { openDialog, ConfirmationDialog } = useConfirmationDialog(
    "Logout Confirmation",
    "Are you sure you want to log out?",
    logOut,
    isLoggingOut
  );

  return (
    <FlatList
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          {!currentUser && <LogInOrCreateAccount navigation={navigation} />}
          {currentUser && <UserDetails currentUser={currentUser} />}
          {currentUser && <AccountSettings />}
          <PreferencesSettings />
          <SecuritySettings />
          <AboutSettings includeContainerStyle={!!currentUser} />
          {currentUser && (
            <>
              <SettingItem
                label="Logout"
                iconComponent={<MaterialIcons name="logout" size={SETTINGS_CONSTANTS.ICON_SIZE} />}
                iconBackgroundColor={SETTINGS_CONSTANTS.LOG_OUT_BACKGROUND_COLOR}
                endComponent={<MoreOptionsIndicator />}
                onPress={openDialog}
              />
              <ConfirmationDialog />
            </>
          )}
        </>
      }
      listKey="SettingsScreenList"
    />
  );
};

const STYLES = StyleSheet.create({
  userDetailsContainer: {
    ...GLOBAL_STYLES.lgMarginBottom,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 130
  }
});

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  isLoggingOut: selectIsChangingAuthState(state)
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(startLogOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
