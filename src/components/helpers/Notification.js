import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeNotification as changeNotificationAction } from 'actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';

const Alert = styled.div`
  position: fixed;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  bottom: 10px;
  padding: 5px 10px;
  border-radius: 8px;
  border: 2px dashed black;
  background-color: #ffd82a;
`;

class Notification extends Component {
  componentDidMount() {
    setInterval(() => {
      const { changeNotification, notification } = this.props;
      const date = new Date();

      if (date.getDay() === notification.day) {
        changeNotification({ isOpen: true, day: notification.day });
      }
    }, 300000);
  }

  pushNotification = () => {
    const { changeNotification } = this.props;

    const today = new Date();
    const tomorrow = new Date(today);
    const newDay = tomorrow.setDate(tomorrow.getDate() + 3);
    const update = new Date(newDay);
    const res = update.getDay();

    changeNotification({ isOpen: false, day: res });
  };

  render() {
    const { notification } = this.props;

    return (
      <>
        {notification.isOpen && (
          <Alert>
            When was the last time you updated the state?{' '}
            <Button type="button" onClick={this.pushNotification}>
              close
            </Button>
          </Alert>
        )}
      </>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.shape({ isOpen: PropTypes.bool, day: PropTypes.number }).isRequired,
  changeNotification: PropTypes.func.isRequired,
};

const mapStateToProps = ({ notification }) => ({ notification });

const mapDispatchToProps = (dispatch) => ({
  changeNotification: (notification) => dispatch(changeNotificationAction(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
