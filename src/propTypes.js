import PropTypes from 'prop-types';

// from react-redux/src/utils/PropTypes
const store = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
});

export default {
  ...PropTypes,
  store,
};

export { PropTypes };
