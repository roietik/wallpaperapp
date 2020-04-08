import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'api/Api';
import { getUnsplash as getUnsplashAction, getFavourite as getFavouriteAction } from 'actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

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

class Main extends Component {
  state = { isRender: false };

  componentDidMount() {
    const { getUnsplash, search } = this.props;

    console.log(search);
    const BASE_URL = `https://api.unsplash.com/search/photos?query=${
      search || 'warsaw'
    }&per_page=10&client_id=JUJUG3Twt95_7T4d0wFe3oVPXRAG2MzW5V6N6cIbWic`;
    Axios.getUnsplash(BASE_URL)
      .then((res) => getUnsplash(res))
      .catch((isError) => console.log(isError))
      .finally((isLoading) => console.log(isLoading));
  }

  // componentDidUpdate(prevProps) {
  //   const { search } = this.props;
  //   if (prevProps.search !== search) {
  //     console.log('isRender');

  //     const { getUnsplash, search } = this.props;

  //     console.log(search);

  //     const BASE_URL = `https://api.unsplash.com/search/photos?query=${
  //       search || 'london'
  //     }&per_page=10&client_id=JUJUG3Twt95_7T4d0wFe3oVPXRAG2MzW5V6N6cIbWic`;
  //     Axios.getUnsplash(BASE_URL)
  //       .then((res) => getUnsplash(res))
  //       .catch((isError) => console.log(isError))
  //       .finally((isLoading) => console.log(isLoading));
  //     console.log('componentDidUpdate');
  //   }
  // }

  handleFavourite = (idx) => {
    const { getFavourite, unsplash } = this.props;
    console.log('favourite', idx);
    getFavourite(unsplash.results[idx].urls.regular);
  };

  render() {
    const { unsplash } = this.props;

    return (
      <>
        <Grid>
          {/* {unsplash.map((item, idx) => {
            return (
              <div key={item.id}>
                <img src={item.urls.regular} alt="img" />
                <div>
                  <Title>{item.tags[0].title}</Title>
                  <Icon type="button" onClick={() => this.handleFavourite(idx)}>
                    <FontAwesomeIcon icon={faHeart} size="2x" />
                  </Icon>
                </div>
              </div>
            );
          })} */}
          {/* {console.log(unsplash.results)} */}
          {console.log('suuuper', this.props.search)}
          {console.log('done')}
          {console.log(this.props.unsplash)}
        </Grid>
      </>
    );
  }
}

Main.propTypes = {
  unsplash: PropTypes.arrayOf().isRequired,
  getUnsplash: PropTypes.func.isRequired,
};

const mapStateToProps = ({ unsplash, search }) => ({ unsplash, search });

const mapDispatchToProps = (dispatch) => ({
  getUnsplash: (unsplash) => dispatch(getUnsplashAction(unsplash)),
  getFavourite: (favourite) => dispatch(getFavouriteAction(favourite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
