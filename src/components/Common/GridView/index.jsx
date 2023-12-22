import React from 'react';
import { Col, Empty, Row } from 'antd';

const GridView = ({
                dataSource = [],
                gridItemTemplate = () => {},
                onSelectGridItem = () => {},
                isAllowSelection = true,
                gutter = [20, 20],
                colSpan = 6,
                className = ''
}) => {
  const colSpanProps = typeof colSpan === 'number' ? { span: colSpan } : colSpan;
  return (
    <Row gutter={gutter} className={`grid-view__wrapper ${className}`}>
      {
        dataSource.map((item, index) => (
          <Col {...colSpanProps} key={index} onClick={() => isAllowSelection && onSelectGridItem(item)} >
            {
              gridItemTemplate({ item, index })
            }
          </Col>
        ))
      }
      { !dataSource.length && (
        <Col span={24}>
          <Empty />
        </Col>
      ) }
    </Row>
  )
}


export default GridView;
