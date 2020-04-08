import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Input from 'components/atoms/Input/Input';
import Param from 'components/atoms/List/Param';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSearch as getSearchAction } from 'actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

const MenuWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-height: 90px;
  max-width: 1024px;
  margin: 0 auto;
  background-color: #88d7f4;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  display: grid;
  grid-template-columns: 230px auto 250px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 6px;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  align-self: center;
`;

const Menu = styled.div`
  @media (max-width: 580px) {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }
`;

const Item = styled(Param)`
  padding: 10px 20px;
  color: black;
  &:first-child {
    padding-left: 0;
  }
  @media (max-width: 580px) {
    padding: 0;
    margin: 0;
    height: auto;
    line-height: 20px;
  }
`;

const Search = styled(Input)`
  margin: 6px 0;
`;

class Nav extends Component {
  handleChange = debounce((search = `${this.props.weather.season} ${this.props.weather.part}`) => {
    const { getSearch } = this.props;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ search }, () => getSearch(search));
    setTimeout(() => {
      this.search.current.value = '';
    }, 100);
  }, 1000);

  constructor(props) {
    super(props);

    this.search = React.createRef();
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { getSearch, weather } = this.props;

    // eslint-disable-next-line react/prop-types
    if (weather) {
      getSearch(`${weather.season} ${weather.part}`);
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line react/prop-types
    const { weather } = this.props;
    return (
      <MenuWrapper>
        <HeaderTitle>
          <Icon icon={faCameraRetro} size="1x" /> WallpaperApp
        </HeaderTitle>
        <Menu>
          <Item as={Link} to="/main">
            Main
          </Item>
          <Item as={Link} to="/favourite">
            Favourite
          </Item>
        </Menu>
        <Search
          type="text"
          // eslint-disable-next-line react/prop-types
          // placeholder={`${weather.season} ${weather.part}`}
          placeholder="Search"
          onChange={(e) => this.handleChange(e.target.value)}
          ref={this.search}
          // eslint-disable-next-line react/prop-types
        />
      </MenuWrapper>
    );
  }
}

Nav.propTypes = {
  getSearch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ search, weather }) => ({ search, weather });

const mapDispatchToProps = (dispatch) => ({
  getSearch: (search) => dispatch(getSearchAction(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
