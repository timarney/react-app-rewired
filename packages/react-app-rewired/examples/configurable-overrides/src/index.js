import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function injectProps(target, name, descriptor) {
    const oldFunction = descriptor.value;
    descriptor.value = function propsInjectorFunction() {
      return oldFunction.bind(this)(this.props);
    };
    return descriptor;
}

class App extends Component {
  @injectProps
  render({welcome}) {
    return (
      <div>
        {welcome}
      </div>
    );
  }
}

ReactDOM.render(<App welcome="hello" />, document.getElementById('root'));
