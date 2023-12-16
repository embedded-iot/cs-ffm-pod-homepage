import React from 'react';
import FrontUserRegisterPage from 'containers/RegisterPage';
import {WEBSITE_NAME} from "components/contants";

export const metadata = {
  title: `Sign Up - ${WEBSITE_NAME}`,
}

const Register = (props) => {
  return (
    <FrontUserRegisterPage />
  )
}

export default Register;
