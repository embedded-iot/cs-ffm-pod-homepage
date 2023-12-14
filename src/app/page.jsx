import React from 'react';
import FrontUserHomePage from 'containers/HomePage';
import {WEBSITE_NAME} from "components/contants";

export const metadata = {
  title: `Home - ${WEBSITE_NAME}`,
}

const HomePage = (props) => {
  return (
    <FrontUserHomePage />
  )
}

export default HomePage;
