import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {

  const hello = "hello"

  return (
    <div>
      {hello}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
