import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeNotification as changeNotificationAction } from 'actions';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const Icon = styled(FontAwesomeIcon)`
  margin-right: 6px;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  margin-top: 108px;
  margin-left: 18px;
  align-self: center;
`;

const Notification = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  > span {
    padding-right: 6px;
  }
`;

const Switch = styled(Toggle)`
  position: relative;
  top: 6px;
  &:hover {
    &:not(.react-toggle--disabled) {
      > .react-toggle-track {
        background-color: #ffd82a;
      }
    }
  }
  > .react-toggle-track {
    background-color: #e6e6e6;
    &:hover {
      background-color: #ffd82a;
    }
  }
  > .react-toggle-thumb {
    border: none;
    box-shadow: none !important;
  }
`;

class Settings extends Component {
  state = {
    isChecked: false,
  };

  handleChange = () => {
    const { changeNotification, notification } = this.props;
    const { isChecked } = this.state;
    this.setState(
      (prevState) => ({
        isChecked: !prevState.isChecked,
      }),
      () => {
        changeNotification({
          isOpen: isChecked,
          day: notification.day,
        });
      },
    );
  };

  render() {
    return (
      <>
        <HeaderTitle>
          <Icon icon={faCogs} size="1x" /> Settings
        </HeaderTitle>

        <Notification>
          <span>Notification:</span>
          <Switch icons={false} onChange={this.handleChange} defaultChecked />
        </Notification>
      </>
    );
  }
}

Settings.propTypes = {
  notification: PropTypes.shape({ isOpen: PropTypes.bool, day: PropTypes.number }).isRequired,
  changeNotification: PropTypes.func.isRequired,
};

const mapStateToProps = ({ notification }) => ({ notification });

const mapDispatchToProps = (dispatch) => ({
  changeNotification: (notification) => dispatch(changeNotificationAction(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
