import React, { useContext } from 'react';
import Masonry from 'react-masonry-css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { AppContext } from './Provider';
import { download } from '../services/download-service';

import './masonry.scss';

const ImageGrid = ({ query }) => {
  const { state, fetchMore } = useContext(AppContext);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  if (state.photoItems.length === 0) {
    const { page, perPage } = state;
    fetchMore({ page: page + 1, perPage, query });
  }

  return (
    <Row>
      <Col>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {state.photoItems.map(({ id, created, description, altDescription, urls, links, likes, user }) => (
            <div key={id}>
              <a href={links.download} onClick={async e => await download(e, id)}>
                <Image src={urls.thumb} alt={description || altDescription || 'No description'} thumbnail />
              </a>
            </div>
          ))}
        </Masonry>
      </Col>
    </Row>
  );
}

export default ImageGrid;
