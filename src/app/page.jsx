import React from 'react';
import FrontUserHomePage from 'containers/HomePage';
import {WEBSITE_NAME} from "components/contants";
import {FrontUserCategoriesService, FrontUserPostsService} from "../services";

export const metadata = {
  title: `Home - ${WEBSITE_NAME}`,
}

const HomePage = async (props) => {
  const topCategories = await new Promise((resolve, reject) =>
    FrontUserCategoriesService.getTopCategories(resolve, reject)
  );
  return (
    <FrontUserHomePage
      topCategories={topCategories}
    />
  )
}

export default HomePage;
