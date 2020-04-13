import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'api/Api';
import { getUnsplash as getUnsplashAction, getFavourite as getFavouriteAction } from 'actions';
import PropTypes from 'prop-types';
import PhotoGrid from 'components/molecules/PhotoGrid';

class Main extends Component {
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    const { search } = this.props;
    // eslint-disable-next-line react/prop-types
    if (prevProps.search !== search) {
      this.getData();
    }
  }

  getData = () => {
    // eslint-disable-next-line react/prop-types
    const { getUnsplash, search } = this.props;

    const BASE_URL = `https://api.unsplash.com/search/photos?query=${search}&per_page=10&client_id=JUJUG3Twt95_7T4d0wFe3oVPXRAG2MzW5V6N6cIbWic`;
    Axios.getUnsplash(BASE_URL)
      .then((res) => getUnsplash(res))
      // eslint-disable-next-line no-console
      .catch((isError) => console.log(isError))
      // eslint-disable-next-line no-console
      .finally((isLoading) => console.log(isLoading));
  };

  handleFavourite = (idx) => {
    // eslint-disable-next-line react/prop-types
    const { getFavourite, unsplash } = this.props;
    // eslint-disable-next-line react/prop-types
    getFavourite(unsplash[idx].urls.regular);
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { unsplash } = this.props;
    return <PhotoGrid data={unsplash} handleFavourite={this.handleFavourite} />;
  }
}

Main.propTypes = {
  getUnsplash: PropTypes.func.isRequired,
  getFavourite: PropTypes.func.isRequired,
};

const mapStateToProps = ({ unsplash, search }) => ({ unsplash, search });

const mapDispatchToProps = (dispatch) => ({
  getUnsplash: (unsplash) => dispatch(getUnsplashAction(unsplash)),
  getFavourite: (favourite) => dispatch(getFavouriteAction(favourite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
