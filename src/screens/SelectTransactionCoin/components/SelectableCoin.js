import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { ShortCoinDetails, Skeleton } from "../../../components";
import { TYPOGRAPHY } from "../../../styles";
import SCREEN_NAMES from "../../../navigators/screen-names";

function SelectableCoin({ coin }) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const onPress = () =>
    navigation?.navigate(SCREEN_NAMES.ADD_EDIT_TRANSACTION, {
      selectedCoin: coin,
      startingScreen: SCREEN_NAMES.SELECT_TRANSACTION_COIN
    });

  return (
    <ShortCoinDetails coin={coin} onPress={onPress}>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={GLOBAL_CONSTANTS.ICON_SIZE}
        color={colors?.primary}
        style={TYPOGRAPHY.textAlignCenter}
      />
    </ShortCoinDetails>
  );
}

SelectableCoin.Skeleton = ({ style }) => <Skeleton style={[STYLES.coinSkeleton, style]} />;

const STYLES = StyleSheet.create({
  coinSkeleton: {
    height: 60,
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN,
    width: "100%"
  }
});

export default SelectableCoin;
