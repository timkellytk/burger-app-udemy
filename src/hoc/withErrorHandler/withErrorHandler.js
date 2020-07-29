import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useError from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, errorConfirmedHandler] = useError(axios);

    return (
      <React.Fragment>
        <Modal show={error} removeModal={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
