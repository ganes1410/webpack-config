import React, { useState } from 'react';
import Logo from './logo.svg';

const NewComp = React.lazy(() => import('../components/NewComponent'));
const App = () => {
  // let [Component, loadNewComponent] = useState(null);
  let [showComponent, showNewComponent] = useState(false);
  let [count, setCount] = useState(0);

  // const loadComponent = () => {
  //   import('../components/NewComponent').then(component => {
  //     // console.log(component);
  //     loadNewComponent(component.default);
  //   });
  // };

  const show = () => {
    showNewComponent(showComponent => !showComponent);
  };

  const increment = () => setCount(count => count + 1);
  const decrement = () => setCount(count => count - 1);

  return (
    <div>
      <button onClick={increment}>+</button>
      <p>{count}</p>
      <button onClick={decrement}>-</button>
      <br />

      <button onClick={show}>Toggle new component</button>
      <React.Suspense fallback={null}>
        {showComponent ? <NewComp /> : null}
      </React.Suspense>

      {/* Dynamically load a component */}
      {/* {showComponent && <>{Component}</>} */}
      <img src={Logo} alt='logo' />
    </div>
  );
};

export default App;
