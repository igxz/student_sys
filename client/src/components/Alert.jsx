import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, alert }) => (
  <div
    className={['alert', 'alert-dismissible', 'alert-' + type].join(' ')}
    role='alert'
  >
    <button
      type='button'
      className='close'
      data-dismiss='alert'
      aria-label='Close'
    >
      <span aria-hidden='true'>&times;</span>
    </button>
        {alert}
  </div>
);

Alert.propTypes = {
  type: PropTypes.string,
  alert: PropTypes.string,
};

export default Alert;
