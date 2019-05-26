import { identity, isPlainObject, mapValues, some, omit } from 'lodash';
import { compose, mapProps, getContext } from 'recompose';
import { connect as standardConnect } from 'react-redux';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
import { isFSA } from 'flux-standard-action';

import PropTypes from 'propTypes';
import { isGeneratorFunction } from 'utils';
import { composeSelector } from 'selectors';

export const omitProps = keys => mapProps(props => omit(props, keys));

export const withStore = () => getContext({ store: PropTypes.store });

function shallowEqualImmutableIgnoreKeys(keys) {
  return (a, b) => shallowEqualImmutable(omit(a, keys), omit(b, keys));
}

// enhanced connect high order component that supports sagas and declarative way to request data from redux store
// @query - object with selectors or selector
// @actions - object with actions/sagas or `(dispatch, [ownProps]): dispatchProps` function
// @mapProps - allows to make final
// @opts - other options of standard react-redux connect
export function connect(query, actions, mergeProps, { mapProps = identity, ...opts } = { mapProps: identity }) {
  const bindAction = (store, dispatch, value) =>
    isGeneratorFunction(value)
      ? (...args) => store.runSaga(value, ...args)
      : (...args) => {
          const action = value(...args);
          if (isFSA(action)) {
            dispatch(action);
          }
        };

  const mapActions = (dispatch, { store }) => mapValues(actions, v => bindAction(store, dispatch, v));
  const selector = isPlainObject(query) ? composeSelector(query, mapProps) : query;
  const makeCallbacks = isPlainObject(actions) ? mapActions : actions;

  const options = {
    areOwnPropsEqual: shallowEqualImmutable,
    areStatePropsEqual: shallowEqualImmutable,
    areMergedPropsEqual: isPlainObject(actions)
      ? shallowEqualImmutableIgnoreKeys(Object.keys(actions))
      : shallowEqualImmutable,
    ...opts,
  };

  const connectHOC = standardConnect(selector, makeCallbacks, mergeProps, options);

  if (isPlainObject(actions) && some(actions, isGeneratorFunction)) {
    return compose(
      withStore(),
      connectHOC,
      omitProps(['store']),
    );
  }

  return connectHOC;
}
