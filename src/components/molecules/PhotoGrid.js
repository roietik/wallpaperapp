import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { delFavourite as delFavouriteAction } from 'actions';

const Icon = styled.button`
  background: none;
  margin: 0;
  padding: 0;
  width: 100%;
  outline: none;
  padding-right: 5px;
`;

const Title = styled.p`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(13, 1fr);
  grid-column-gap: 6px;
  grid-row-gap: 6px;

  > div {
    position: relative;
    > div {
      margin: 0;
      padding: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.4s;
    }

    &:hover {
      background: #88d7f4;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      > div {
        opacity: 1;
        transition: opacity 0.8s;
      }
      > img {
        opacity: 0.1;
        transition: opacity 0.8s;
      }
    }

    &:nth-child(1) {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 3;
    }
    &:nth-child(2) {
      grid-column-start: 3;
      grid-column-end: 5;
      grid-row-start: 1;
      grid-row-end: 3;
    }
    &:nth-child(3) {
      grid-column-start: 5;
      grid-column-end: 9;
      grid-row-start: 1;
      grid-row-end: 6;
    }
    &:nth-child(4) {
      grid-column-start: 1;
      grid-column-end: 5;
      grid-row-start: 3;
      grid-row-end: 6;
    }
    &:nth-child(5) {
      grid-column-start: 1;
      grid-column-end: 5;
      grid-row-start: 6;
      grid-row-end: 9;
    }
    &:nth-child(6) {
      grid-column-start: 5;
      grid-column-end: 9;
      grid-row-start: 6;
      grid-row-end: 9;
    }
    &:nth-child(7) {
      grid-column-start: 1;
      grid-column-end: 5;
      grid-row-start: 9;
      grid-row-end: 14;
    }
    &:nth-child(8) {
      grid-column-start: 5;
      grid-column-end: 7;
      grid-row-start: 9;
      grid-row-end: 11;
    }
    &:nth-child(9) {
      grid-column-start: 7;
      grid-column-end: 9;
      grid-row-start: 9;
      grid-row-end: 11;
    }
    &:nth-child(10) {
      grid-column-start: 5;
      grid-column-end: 9;
      grid-row-start: 11;
      grid-row-end: 14;
    }
  }

  > div > img {
    border-radius: 6px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 2s;
  }
`;

// eslint-disable-next-line react/prop-types
const PhotoGrid = ({ data, handleFavourite, favourite, delFavourite }) => {
  const handleDelete = (idx) => {
    delFavourite(idx);
  };
  return (
    <Grid>
      {data &&
        // eslint-disable-next-line react/prop-types
        data.map((item, idx) => {
          return (
            <div key={item.id}>
              <img src={item.urls.regular} alt="img" />
              <div>
                <Title>{item.tags[0].title}</Title>
                <Icon type="button" onClick={() => handleFavourite(idx)}>
                  <FontAwesomeIcon icon={faHeart} size="2x" />
                </Icon>
              </div>
            </div>
          );
        })}
      {favourite &&
        // eslint-disable-next-line react/prop-types
        favourite.map((img, idx) => {
          return (
            <div key={img}>
              <img src={img} alt="img" />
              <div>
                <Title>Delete</Title>
                <Icon type="button" onClick={() => handleDelete(idx)}>
                  <FontAwesomeIcon icon={faHeart} size="2x" />
                </Icon>
              </div>
            </div>
          );
        })}
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  delFavourite: (id) => dispatch(delFavouriteAction(id)),
});

export default connect(null, mapDispatchToProps)(PhotoGrid);
