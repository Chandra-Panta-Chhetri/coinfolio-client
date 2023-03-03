import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, useTheme } from "react-native-paper";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  selectIsLoadingUserPortfolios,
  selectUserPortfolios,
  startUserPortfoliosFetch
} from "../../../redux/portfolio";
import { TouchableNativeFeedback } from "../../../shared-components";
import Typography from "../../../styles/Typography";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { View } from "react-native";

const UserPortfolios = ({ userPortfolios, isLoading, fetchUserPortfolios, selectedPortfolio = 4 }) => {
  const { colors, dark: isDarkMode } = useTheme();

  useEffect(() => {
    fetchUserPortfolios();
  }, []);

  const changeSelectedPortfolio = (selectedPortfolioId) => {
    console.log(selectedPortfolioId);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <DrawerContentScrollView>
      <Text style={[Typography.title, { textAlign: "center", marginBottom: GLOBAL_CONSTANTS.LG_MARGIN }]}>
        Select a Portfolio
      </Text>
      {userPortfolios.map((p) => (
        <TouchableNativeFeedback key={p.id} onPress={() => changeSelectedPortfolio(p?.id)}>
          <View
            style={{
              height: 45,
              marginBottom: GLOBAL_CONSTANTS.SM_MARGIN,
              backgroundColor: p?.id === selectedPortfolio ? colors?.primary : "transparent",
              flexDirection: "row"
            }}
          >
            <Text
              style={[
                Typography.subheading,
                {
                  marginLeft: GLOBAL_CONSTANTS.MD_MARGIN,
                  alignSelf: "center",
                  color: p?.id === selectedPortfolio ? (isDarkMode ? colors?.text : colors?.card) : colors?.text
                }
              ]}
            >
              {p?.nickname}
            </Text>
          </View>
        </TouchableNativeFeedback>
      ))}
    </DrawerContentScrollView>
  );
};

const mapStateToProps = (state) => ({
  userPortfolios: selectUserPortfolios(state),
  isLoading: selectIsLoadingUserPortfolios(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserPortfolios: () => dispatch(startUserPortfoliosFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolios);
