import React from 'react';
import FrontUserCategoriesPage from 'containers/CategoriesPage';
import {WEBSITE_NAME} from "components/contants";

export const metadata = {
  title: `All Products - ${WEBSITE_NAME}`,
}

const HomePage = (props) => {
  return (
    <FrontUserCategoriesPage />
  )
}

export default HomePage;
