import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import TableGrid from 'components/Common/TableGrid';
import { FrontUserPostsService } from 'services';
import BlogSlideItem from 'components/FrontUser/BlogSlideItem';
import BlogCategoriesFilter from 'components/FrontUser/BlogsGrid/BlogCategoriesFilter';
import { cui, events } from 'utils';
import "./style.scss";

const gridItemTemplate = ({ item, imageHeight }) => {
  return <BlogSlideItem data={item} imageHeight={imageHeight}/>
}

export default function BlogsGrid({ redirectTo, blogCategoryId }) {
  const [firstBlog, setFirstBlog] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const isExTablet = useMediaQuery(RESPONSIVE_MEDIAS.EX_TABLET);
  const RELOAD_EVENT_KEY = 'RELOAD_BLOG_TABLE_EVENT_KEY';
  const [blogCategories, setBlogCategories] = useState([]);
  const ref = useRef({ blogCategoryId });

  const handleCLick = (data) => {
    const { blogId } = data;
    redirectTo(ROUTERS.FRONT_USER_BLOGS + '/detail/' + blogId)
  }
  // eslint-disable-next-line
  const imageHeight = isMobile && 'auto' || isTablet && 245 || isExTablet && 216 ||  270;

  const gridConfig = {
    gutter: isMobile ? [0, 16] : [32, 48],
    className: isMobile && 'box-card--mobile',
    // eslint-disable-next-line
    colSpan: isMobile && 24 || isTablet && 12 || 8,
    gridItemTemplate: (props) => gridItemTemplate({ ...props, imageHeight }),
    getDataFunc: (params, successCallback, failureCallback) => {
      FrontUserPostsService.getBlogs(cui.removeEmpty({
        sortBy: "displayOrder",
        sortDirection: "asc",
        blogCategoryId: params?.blogCategoryId || -1
      }), response => {
        const { items = [], totalCount = 0 } = response || {};
        const [firstItem, ...restItems] = items;
        if (totalCount) {
          setFirstBlog(firstItem);
        }
        setTotalCount(totalCount);
        successCallback({ items: restItems, totalCount });
      }, failureCallback, )
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

  const getBlogCategories = () => {
    FrontUserPostsService.getBlogsCategories(
      { pageSize: 1000, pageNum: 1},
      response => {
        setBlogCategories([
          {
            label: 'Latest',
            value: '',
          },
          ...(response.items.map(category => ({
            ...category,
            label: category?.name || '',
            value: category?.id || '',
          })))
        ]);
      }
    )
  };


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

  useEffect(() => {
    if (ref.current.blogCategoryId !== blogCategoryId) {
      ref.current.blogCategoryId = blogCategoryId;
      reloadTable({
        blogCategoryId
      })
    }
  }, [blogCategoryId])

  useEffect(() => {
    getBlogCategories();
  }, [])

  const defaultParams = {
    blogCategoryId
  }

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
                   defaultData={{}}
                   headerActionsConfig={{}}
                   isShowPagination={true}
                   onSelectedItemsChange={onSelectedItemsChange}
                   onSelectGridItem={onSelectGridItem}
                   RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
        />
        <br/>
      </Col>
    </Row>
  );
}
