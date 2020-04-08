import React, { Component } from 'react';
import CrudTemplate from 'templates/CrudTemplate';
import PropTypes from 'prop-types';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addItem as addItemAction } from 'actions';
import { Redirect, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Select from 'components/atoms/Select/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

const Submit = styled(Button)`
  justify-self: right;
  align-self: center;
  height: 42px;
  width: 246px;
  font-size: 16px;
  outline: none;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 6px;
  line-height: 67px;
`;

const Back = styled(Link)`
  justify-self: left;
  align-self: center;
  width: 50px;
  height: 50px;
  line-height: 67px;
  font-weight: 300;
  border-radius: 50%;
  margin: 0;
`;

const SubmitWrapper = styled.div`
  text-align: right;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  margin-top: 108px;
`;

const FormWrapper = styled(Form)`
  padding-top: 15px;
  display: grid;
`;

const InputAddItem = styled(Input)`
  margin: 6px 0;
`;

const Center = styled(CrudTemplate)`
  text-align: center;
`;

class AddPage extends Component {
  state = {
    redirectToPantry: false,
  };

  handleRedirect = () => {
    this.setState({ redirectToPantry: true });
  };

  render() {
    const { redirectToPantry } = this.state;
    const { addItem } = this.props;

    if (redirectToPantry === true) {
      return <Redirect to="/pantry" />;
    }
    return (
      <>
        <Center>
          <HeaderTitle>
            <Icon icon={faFolderPlus} size="1x" />
            Add Item
          </HeaderTitle>
          <Formik
            initialValues={{ name: '', quantity: '', category: '', limit: '', j: '' }}
            onSubmit={(values, { setSubmitting }) => {
              addItem(values);
              setSubmitting(false);
              this.handleRedirect();
            }}
          >
            {({ values, handleChange, handleBlur, isSubmitting }) => (
              <FormWrapper>
                <InputAddItem
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  required
                />
                <InputAddItem
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantity}
                  required
                />
                <InputAddItem
                  type="text"
                  name="category"
                  placeholder="Category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category}
                  required
                />
                <InputAddItem
                  type="text"
                  name="limit"
                  placeholder="Limit"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.limit}
                  required
                />
                <Select
                  name="j"
                  values={values.j}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <SubmitWrapper>
                  <Back to="/">
                    <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                  </Back>
                  <Submit type="submit" secondary={1} disabled={isSubmitting}>
                    Submit
                  </Submit>
                </SubmitWrapper>
              </FormWrapper>
            )}
          </Formik>
        </Center>
      </>
    );
  }
}

AddPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItemAction(item)),
});

export default connect(null, mapDispatchToProps)(AddPage);
