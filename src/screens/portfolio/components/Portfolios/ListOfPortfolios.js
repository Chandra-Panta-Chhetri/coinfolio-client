import { Text, useTheme } from "react-native-paper";
import { TouchableNativeFeedback, Skeleton, Swipeable, SwipeableActions } from "../../../../components";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { View, StyleSheet } from "react-native";
import { isNullOrUndefined } from "../../../../utils";
import { TYPOGRAPHY } from "../../../../styles";

const NUM_SKELETON_LOADERS = 4;

function ListOfPortfolios({ portfolios, onEdit, onDelete, onSelect, selectedPortfolio, isLoading, swipeableRefsMap }) {
  const { colors, dark: isDarkMode } = useTheme();

  const onPortfolioSelect = (selectedPortfolio) => {
    if (!isNullOrUndefined(selectedPortfolio) && !isNullOrUndefined(onSelect)) {
      onSelect(selectedPortfolio);
    }
  };

  if (isLoading) {
    return <Skeleton count={NUM_SKELETON_LOADERS} style={STYLES.skeleton} />;
  }

  return (portfolios ?? [])?.map((p) => (
    <Swipeable
      key={p?.id}
      rightActions={(progress, dragX) => <SwipeableActions callbackParams={[p]} onEdit={onEdit} onDelete={onDelete} />}
      childrenContainerStyle={[
        STYLES.swipeableChildrenContainer,
        {
          backgroundColor: p?.id === selectedPortfolio?.id ? colors?.primary : colors?.surface
        }
      ]}
      ref={(ref) => {
        swipeableRefsMap.current.set(p?.id, isNullOrUndefined(ref) ? undefined : ref);
      }}
      containerStyle={STYLES.swipeableContainer}
    >
      <TouchableNativeFeedback onPress={() => onPortfolioSelect(p)}>
        <View style={STYLES.portfolioContainer}>
          <Text
            style={[
              STYLES.portfolioNickname,
              {
                color: p?.id === selectedPortfolio?.id ? (isDarkMode ? colors?.text : colors?.card) : colors?.text
              }
            ]}
          >
            {p?.nickname}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </Swipeable>
  ));
}

const STYLES = StyleSheet.create({
  swipeableChildrenContainer: {
    height: 45,
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  },
  swipeableContainer: {
    height: 45
  },
  portfolioContainer: {
    height: "100%",
    flexDirection: "row",
    display: "flex"
  },
  portfolioNickname: {
    ...TYPOGRAPHY.subheading,
    marginLeft: GLOBAL_CONSTANTS.MD_MARGIN,
    alignSelf: "center"
  },
  skeleton: {
    height: 45,
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  }
});

export default ListOfPortfolios;
