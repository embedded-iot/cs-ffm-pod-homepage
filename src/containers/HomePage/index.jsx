'use client';

import React from 'react';
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
import {useRouter} from "next/navigation";
import './style.scss';
import {useAppSelector} from "store/hooks";

function HomePage({ topCategories }) {
  const isMobile = useAppSelector(state => state.data.isMobile);
  const isTablet = useAppSelector(state => state.data.isTablet);
  const isDesktop = useAppSelector(state => state.data.isDesktop);
  const router = useRouter();
  // eslint-disable-next-line
  const customClass = !!isMobile && 'home-box__wrapper--mobile' || !!isTablet && 'home-box__wrapper--tablet' || !!isDesktop && 'home-box__wrapper--desktop';
  return (
    <div className="page-wrapper--full-width home-page__wrapper">
      <div className="page-contents">
        <BannerBox
          isMobile={isMobile}
          customClass={customClass}
          redirectTo={router.push}
        />
        <BannerBox1
          isMobile={isMobile}
          customClass={customClass}
          redirectTo={router.push}
        />
        <BannerBox2
          isMobile={isMobile}
          customClass={customClass}
          redirectTo={router.push}
        />
        <BannerBox3
          isMobile={isMobile}
          customClass={customClass}
          redirectTo={router.push}
        />
        <BannerBox4
          isMobile={isMobile}
          customClass={customClass}
          redirectTo={router.push}
        />
        {/*<BannerBox5*/}
        {/*  customClass={customClass}*/}
        {/*  redirectTo={router.push}*/}
        {/*/>*/}
        <BannerBox6
          isMobile={isMobile}
          customClass={customClass}
          redirectTo={router.push}
        />
        <BannerBox7
          isMobile={isMobile}
          customClass={customClass}
        />
        <BannerBox8
          isMobile={isMobile}
          topCategories={topCategories}
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
