import React, {useMemo} from 'react';
import { Col, Row } from 'antd';
import { ROUTERS } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import BlogSlideItem from 'components/FrontUser/BlogSlideItem';
import BlogCategoriesFilter from 'components/FrontUser/BlogsGrid/BlogCategoriesFilter';
import { events } from 'utils';
import "./style.scss";
import {useAppSelector} from "store/hooks";

const gridItemTemplate = ({ item, imageHeight }) => {
  return <BlogSlideItem data={item} imageHeight={imageHeight}/>
}

export default function BlogsGrid({ blogsResponse, blogsCategoriesResponse, redirectTo, blogCategoryId }) {
  const { items = [], totalCount = 0 } = blogsResponse || {};
  const [firstBlog, ...restBlogs] = items;
  const isMobile = useAppSelector(state => state.data.isMobile);
  const isTablet = useAppSelector(state => state.data.isTablet);
  const isDesktop = useAppSelector(state => state.data.isDesktop);
  const RELOAD_EVENT_KEY = 'RELOAD_BLOG_TABLE_EVENT_KEY';
  const blogCategories= useMemo(() => [
    {
      label: 'Latest',
      value: '',
    },
    ...((blogsCategoriesResponse?.items || []).map(category => ({
      ...category,
      label: category?.name || '',
      value: category?.id || '',
    })))
  ], []);

  const handleCLick = (data) => {
    const { blogId } = data;
    redirectTo(ROUTERS.FRONT_USER_BLOGS + '/detail/' + blogId)
  }
  // eslint-disable-next-line
  const imageHeight = isMobile && 'auto' || isTablet && 245 || isDesktop && 216 ||  270;

  const gridConfig = {
    gutter: isMobile ? [0, 16] : [32, 48],
    className: isMobile && 'box-card--mobile',
    // eslint-disable-next-line
    colSpan: {
      xs: 24, xl: 12, xxl: 8
    },
    gridItemTemplate: (props) => gridItemTemplate({ ...props, imageHeight }),
    getDataFunc: (params, successCallback, failureCallback) => {

    },
    successCallback: (response) => {

    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const paginationConfig = {
    simple: true
  };

  const onSelectedItemsChange = (selectedKeys) => {

  }

  const onSelectGridItem = (selectItem) => {
    handleCLick(selectItem)
  }

  const handleSelectCategory = (value) => {
    const selectedCategory = blogCategories.find(category => category.id === value);
    if (selectedCategory) {
      const { blogCategoryId, blogCategorySlug, } = selectedCategory;
      redirectTo(ROUTERS.FRONT_USER_BLOGS + '/category/' + blogCategoryId + '/' + blogCategorySlug)
    } else {
      redirectTo(ROUTERS.FRONT_USER_BLOGS)
    }
  }

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const defaultParams = {
    blogCategoryId
  }

  const defaultData = useMemo(() => ({
    totalCount: totalCount - 1,
    items: restBlogs,
  }))
  return (
    <Row gutter={isMobile ? [0, 0] : [0, 48]} className="blogs-grid__wrapper">
      <Col span={24}>
        <BlogCategoriesFilter
          value={blogCategoryId}
          buttonList={blogCategories}
          onChange={handleSelectCategory}
        />
      </Col>
      {
        !!firstBlog && (
          <Col span={24}>
            <BlogSlideItem data={firstBlog}
                           hasWrap={isMobile}
                           className={isMobile && 'box-card--mobile'}
                           onClick={handleCLick}
            />
          </Col>
        )
      }
      <Col span={24}>
        <TableGrid type='grid'
                   className={totalCount == 1 && 'display-none'}
                   configs={gridConfig}
                   paginationConfig={paginationConfig}
                   actionButtonList={{}}
                   defaultParams={defaultParams}
                   defaultData={defaultData}
                   headerActionsConfig={{}}
                   isShowPagination={true}
                   isAllowUpdateDefaultData={true}
                   onSelectedItemsChange={onSelectedItemsChange}
                   onSelectGridItem={onSelectGridItem}
                   RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
        />
        <br/>
      </Col>
    </Row>
  );
}
