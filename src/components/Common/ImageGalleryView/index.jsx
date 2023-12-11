import React, {useMemo} from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import "./style.scss";
import {Button} from "antd";
import ImageView from 'components/Common/ImageView';

const ImageGalleryView = ({ images }) => {
  const items = useMemo(() => {
    return images.map(image => ({
      original: image,
      thumbnail: image,
      originalClass: 'image-gallery-view__origin-pic',
      thumbnailClass: 'image-gallery-view__thumb-nail',
    }))
  }, []);
  const renderLeftNav = (onClick, disabled) => (
    <Button className="image-gallery-view__nav left" onClick={onClick} disabled={disabled}>
      <LeftOutlined style={{ fontSize: 20 }}/>
    </Button>
  );
  const renderRightNav = (onClick, disabled) => (
    <Button className="image-gallery-view__nav right" onClick={onClick} disabled={disabled}>
      <RightOutlined style={{ fontSize: 20 }}/>
    </Button>
  );
  const renderItem = (item) => (
    <div className='image-gallery-image'>
      {/*<img src={item.original} alt={item.description} />*/}
      <ImageView img={item.original} />
    </div>
  );
  return (
    <ImageGallery
      items={items}
      thumbnailPosition={"left"}
      className="image-gallery-view__wrapper"
      showFullscreenButton={false}
      showPlayButton={false}
      renderLeftNav={renderLeftNav}
      renderRightNav={renderRightNav}
      renderItem={renderItem}
    />
  );
};

export default ImageGalleryView;
