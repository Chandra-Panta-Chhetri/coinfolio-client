import React from "react";
import { ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { connect } from "react-redux";
import { selectCurrentUser, selectIsChangingAuthState, logout } from "../../redux/user";
import { Preferences, About, Account, Security, LogInOrCreateAccount, UserDetails, Logout } from "./components";
import { isNullOrUndefined } from "../../utils";

const SettingsScreen = ({ logOut, currentUser, isLoggingOut, navigation }) => {
  return (
    <ScrollView contentContainerStyle={GLOBAL_STYLES.screenContainer} showsVerticalScrollIndicator={false}>
      {isNullOrUndefined(currentUser) ? <LogInOrCreateAccount navigation={navigation} /> : null}
      {!isNullOrUndefined(currentUser) ? <UserDetails currentUser={currentUser} /> : null}
      {!isNullOrUndefined(currentUser) ? <Account /> : null}
      <Preferences />
      <Security />
      <About includeContainerStyle={!isNullOrUndefined(currentUser)} />
      {!isNullOrUndefined(currentUser) ? <Logout logOut={logOut} isLoggingOut={isLoggingOut} /> : null}
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  isLoggingOut: selectIsChangingAuthState(state)
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
