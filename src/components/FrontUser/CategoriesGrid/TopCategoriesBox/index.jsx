import React from "react";
import {Col, Row} from "antd";
import "./style.scss";
import {RESPONSIVE_MEDIAS, ROUTERS} from "components/contants";
import {useMediaQuery} from "react-responsive";

export default function TopCategoriesBox({ isMobile, categories, redirectTo = () => {}, }) {
  const height = isMobile && 200 || 320;
  const handleClick = (category) => {
    const { categorySlug, categoryId } = category;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/category/${categorySlug}/${categoryId}`);
  }
  const topCategories = categories.filter((category, index) => index < 3);
  return (
    <Row gutter={isMobile ? [16, 16] : [32, 32]} className="top-categories__wrapper" style={{ height }}>
      {
        topCategories.map(category => (
          <Col key={category.categoryId} span={8}  className="top-categories__item" onClick={() => handleClick(category)}>
            <img alt={category.name} src={category.avatar}  className="top-categories__img" />
            <div className="top-categories__label">{category.name}</div>
          </Col>
        ))
      }
    </Row>
  )
}
