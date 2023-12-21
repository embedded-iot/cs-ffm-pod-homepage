import React from 'react';
import PlainText from 'components/Common/PlainText';
import { RESPONSIVE_MEDIAS} from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import ReactHtmlParser from 'react-html-parser';

import './style.scss';

export default function BlogDetailBox({ blog }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);

  return (
    <div className={`${!isMobile && 'blog-detail-box__wrapper'}`}>
      { !!blog.headerTitle && (
        <div className='blog-detail-box__header-title'>{blog.headerTitle}</div>
      )}
      { !!blog.headerTitle && (
        <div className='blog-detail-box__title'>{blog.title}</div>
      )}
      { !!blog.headerTitle && (
        <div className='blog-detail-box__description'>{blog.description}</div>
      )}
      { !!blog.image && (
        <div className='blog-detail-box__image'>
          <img src={blog.image} alt={blog.title} />
        </div>
      ) }
      <div className='blog-detail-box__content'>
        <PlainText type='TextArea'>
          {ReactHtmlParser(blog.content || '-')}
        </PlainText>
      </div>
    </div>
  );
}
