import { Text, useTheme } from "react-native-paper";
import { TouchableNativeFeedback, Button } from "../../../../shared-components";
import Typography from "../../../../styles/Typography";
import { COLORS, GLOBAL_CONSTANTS } from "../../../../constants";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

const EditDeleteActions = ({ portfolio, onEdit, onDelete }) => {
  const onEditPress = () => {
    if (onEdit !== undefined) {
      onEdit(portfolio);
    }
  };

  const onDeletePress = () => {
    if (onDelete !== undefined) {
      onDelete(portfolio);
    }
  };

  return (
    <View style={STYLES.swipeableActions}>
      <Button mode="contained" style={STYLES.editPortfolioButton} onPress={onEditPress}>
        <AntDesign name="edit" size={GLOBAL_CONSTANTS.ICON_SIZE} />
      </Button>
      <Button mode="contained" style={STYLES.deletePortfolioButton} buttonColor={COLORS.ERROR} onPress={onDeletePress}>
        <AntDesign name="delete" size={GLOBAL_CONSTANTS.ICON_SIZE} />
      </Button>
    </View>
  );
};

function ListOfPortfolios({ portfolios, onEdit, onDelete, onSelect, selectedPortfolio }) {
  const { colors, dark: isDarkMode } = useTheme();

  const onPortfolioSelect = (selectedPortfolio) => {
    if (onSelect !== undefined) {
      onSelect(selectedPortfolio);
    }
  };

  return portfolios.map((p) => (
    <Swipeable
      key={p.id}
      renderRightActions={() => <EditDeleteActions portfolio={p} onEdit={onEdit} onDelete={onDelete} />}
      renderLeftActions={() => <EditDeleteActions portfolio={p} onEdit={onEdit} onDelete={onDelete} />}
      overshootRight={false}
      overshootLeft={false}
      childrenContainerStyle={[
        STYLES.swipeableChildrenContainer,
        {
          backgroundColor: p?.id === selectedPortfolio?.id ? colors?.primary : "transparent"
        }
      ]}
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
    ...Typography.subheading,
    marginLeft: GLOBAL_CONSTANTS.MD_MARGIN,
    alignSelf: "center"
  },
  swipeableActions: { display: "flex", flexDirection: "row" },
  editPortfolioButton: {
    borderRadius: 0
  },
  deletePortfolioButton: {
    borderRadius: 0
  }
});

export default ListOfPortfolios;
