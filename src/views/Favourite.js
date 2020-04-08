import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhotoGrid from 'components/molecules/PhotoGrid';
import PropTypes from 'prop-types';

class Favourite extends Component {
  state = {
    data: '',
    limits: [],
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({ data }, () => {
      const { data: dataState } = this.state;
      const limits = dataState.filter((item) => item.quantity < item.limit / 2);
      this.setState({ limits });
    });
  }

  render() {
    const { limits } = this.state;
    return <PhotoGrid data={limits} page="favourite" />;
  }
}

const mapStateToProps = ({ data }) => ({ data });

Favourite.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      category: PropTypes.string,
      limit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Favourite);
