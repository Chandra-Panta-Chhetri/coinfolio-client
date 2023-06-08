import React, { useEffect } from "react";
import { View } from "react-native";
import SeeAllHeading from "./SeeAllHeading";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectNewsSummary, fetchNewsSummary, selectIsLoadingNewsSummary } from "../../../redux/summary";
import NewsItem from "../../../components/News/NewsItem";
import { GLOBAL_STYLES } from "../../../styles";
import SCREEN_NAMES from "../../../navigators/screen-names";
import { isNullOrUndefined } from "../../../utils";

const NUM_SKELETON_LOADERS = 4;
const DUMMY_SKELETON_LOADERS_ARRAY = Array(NUM_SKELETON_LOADERS).fill("1");

const NewsSummaries = ({ news, isLoadingNewsSummaries, fetchNewsSummary }) => {
  const navigation = useNavigation();
  const goToNewsScreen = () => navigation?.navigate(SCREEN_NAMES.DISCOVER, { screen: SCREEN_NAMES.NEWS });

  useEffect(() => {
    fetchNewsSummary(NUM_SKELETON_LOADERS);
  }, []);

  return (
    <View>
      <SeeAllHeading title="News" onSeeAllPress={goToNewsScreen} />
      <View>
        {isLoadingNewsSummaries || isNullOrUndefined(news) || news?.length === 0
          ? DUMMY_SKELETON_LOADERS_ARRAY.map((_, i) => (
              <NewsItem.Skeleton key={i} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
            ))
          : news.map((n, i) => (
              <NewsItem news={n} key={n?.title} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
            ))}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  news: selectNewsSummary(state),
  isLoadingNewsSummaries: selectIsLoadingNewsSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewsSummary: (limit) => dispatch(fetchNewsSummary(limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsSummaries);
