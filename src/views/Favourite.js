import React from 'react';
import { connect } from 'react-redux';
import PhotoGrid from 'components/molecules/PhotoGrid';

// eslint-disable-next-line react/prop-types
const Favourite = ({ favourite }) => {
  return <PhotoGrid favourite={favourite} />;
};

const mapStateToProps = ({ favourite }) => ({ favourite });

export default connect(mapStateToProps)(Favourite);
