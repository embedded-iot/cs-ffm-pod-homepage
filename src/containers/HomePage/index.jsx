'use client';

import React from 'react';
import { Helmet } from 'react-helmet';
import {
  BannerBox,
  BannerBox1,
  BannerBox2,
  BannerBox3,
  BannerBox4,
  BannerBox5,
  BannerBox6,
  BannerBox7,
  BannerBox8,
  BannerBox9,
} from 'components/FrontUser/HomeBoxs';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import {useRouter} from "next/navigation";
import './style.scss';

function HomePage(props) {
  const isDesktop = useMediaQuery(RESPONSIVE_MEDIAS.DESKTOP);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const router = useRouter();
  // eslint-disable-next-line
  const customClass = !!isMobile && 'home-box__wrapper--mobile' || !!isTablet && 'home-box__wrapper--tablet' || !!isDesktop && 'home-box__wrapper--desktop';
  return (
    <div className="page-wrapper--full-width home-page__wrapper">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="page-contents">
        <BannerBox
          customClass={customClass}
          redirectTo={router.push}
        />
        <BannerBox1
          customClass={customClass}
          redirectTo={router.push}
        />
        <BannerBox2
          customClass={customClass}
          redirectTo={router.push}
        />
        <BannerBox3
          customClass={customClass}
          redirectTo={router.push}
        />
        <BannerBox4
          customClass={customClass}
          redirectTo={router.push}
        />
        {/*<BannerBox5*/}
        {/*  customClass={customClass}*/}
        {/*  redirectTo={router.push}*/}
        {/*/>*/}
        <BannerBox6
          customClass={customClass}
          redirectTo={router.push}
        />
        <BannerBox7
          customClass={customClass}
        />
        <BannerBox8
          customClass={customClass}
          redirectTo={router.push}
        />
        {/*<BannerBox9*/}
        {/*  customClass={customClass}*/}
        {/*  redirectTo={router.push}*/}
        {/*/>*/}
      </div>
    </div>
  );
}

export default HomePage;
