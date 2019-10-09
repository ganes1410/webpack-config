import React from 'react';
import propTypes from 'prop-types';

export default class DefaultErrorBoundary extends React.Component {
  state = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  static propTypes = {
    children: propTypes.node.isRequired
  };

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    return errorInfo ? (
      <div>
        <h2>This is the error boundary!!!</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      </div>
    ) : (
      children
    );
  }
}
