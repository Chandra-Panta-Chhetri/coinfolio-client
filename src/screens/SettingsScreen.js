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
import { Text, Button, Card } from "react-native-paper";
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

const LogInOrCreateAccount = ({ navigation }) => (
  <Card style={[GlobalStyles.componentContainer]}>
    <Card.Content>
      <Text style={GlobalStyles.title}>Get More Features!</Text>
      <Text style={GlobalStyles.body1}>
        Login or create an account to get access to features such as custom
        price alerts, watchlist, portfolio tracker & more!
      </Text>
      <View style={styles.logInCreateButtonContainer}>
        <Button
          labelStyle={GlobalStyles.button}
          onPress={() => navigation.navigate("Login")}
          mode="contained"
          style={styles.logInButton}
        >
          Login
        </Button>
        <Button
          labelStyle={GlobalStyles.button}
          onPress={() => navigation.navigate("SignUp")}
          mode="contained"
        >
          Create an account
        </Button>
      </View>
    </Card.Content>
  </Card>
);

const UserDetails = ({ currentUser }) => (
  <View style={[GlobalStyles.componentContainer, styles.userDetailsContainer]}>
    <Text style={GlobalStyles.title}>{currentUser.name}</Text>
    <Text style={GlobalStyles.body1}>{currentUser.email}</Text>
  </View>
);

function SettingsScreen({ logOut, currentUser, isLoggingOut, navigation }) {
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
          {!currentUser && <LogInOrCreateAccount navigation={navigation} />}
          {currentUser && <UserDetails currentUser={currentUser} />}
          {currentUser && <Account />}
          <Preferences />
          <Security />
          <About includeComponentContainerStyle={!!currentUser} />
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
  userDetailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 130
  },
  logInCreateButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },
  logInButton: { marginRight: 10, flex: 1 }
});

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  isLoggingOut: selectIsChangingAuthState(state)
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(startLogOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
