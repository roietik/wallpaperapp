import React, { Component } from 'react';
import { routes } from 'routes';
import CrudTemplate from 'templates/CrudTemplate';
import Button from 'components/atoms/Button/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItem as removeItemAction } from 'actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const HeaderTitle = styled.h2`
  margin: 0;
  margin-top: 108px;
`;

const Trigger = styled(Button)`
  height: 42px;
  width: 246px;
  font-size: 16px;
  line-height: 40px;
  margin-right: 6px;
  outline: none;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 6px;
`;

class DeletePage extends Component {
  state = {
    page: 'pantry',
    item: [],
    limited: '',
    limitedRes: '',
  };

  componentDidMount() {
    const { match, data } = this.props;
    const [pantryRes] = data.filter((item) => Number(item.id) === Number(match.params.id));
    const limited = data.filter((item) => item.quantity < item.limit / 2);
    this.setState(
      {
        limited,
      },
      () => {
        const { limited: limit } = this.state;
        const [limitedRes] = limit.splice(match.params.id, 1);
        this.setState({ limitedRes });
      },
    );

    const { limitedRes } = this.state;

    switch (match.path) {
      case routes.pantryDelete:
        this.setState({ item: pantryRes });
        break;
      case routes.shoppingListDelete:
        this.setState({
          item: limitedRes,
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { item, limitedRes } = this.state;
    const { match, removeItem } = this.props;

    return (
      <>
        <CrudTemplate>
          <HeaderTitle>
            <Icon icon={faTrashAlt} size="1x" />
            Delete Item
          </HeaderTitle>
          {match.path === routes.shoppingListDelete ? (
            <>
              <pre>
                {limitedRes.name} {limitedRes.quantity} {limitedRes.category} {limitedRes.limit}
              </pre>
              <Trigger as={Link} to="/shopping-list" onClick={() => removeItem(limitedRes.id)}>
                Confirm
              </Trigger>
              <Trigger as={Link} to="/shopping-list" secondary={1}>
                Cancel
              </Trigger>
            </>
          ) : (
            <>
              <pre>
                {item.name} {item.quantity} {item.category} {item.limit}
              </pre>
              <Trigger as={Link} to="/pantry" onClick={() => removeItem(item.id)}>
                Confirm
              </Trigger>
              <Trigger as={Link} to="/pantry" secondary={1}>
                Cancel
              </Trigger>
            </>
          )}
        </CrudTemplate>
      </>
    );
  }
}

DeletePage.defaultProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: null,
      quantity: null,
      category: null,
      limit: null,
    }),
  ),
};

DeletePage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.number,
      category: PropTypes.string,
      limit: PropTypes.number,
    }),
  ),
  removeItem: PropTypes.func.isRequired,
};

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => dispatch(removeItemAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletePage);
