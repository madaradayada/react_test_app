import React, { useState } from 'react';
import ClassCounter from './componets/ClassCounter';
import Counter from './componets/Counter';

function App() {
  const [value, setValue] = useState('Текст в инпуте');
   

  return (
    <div className="App">
      <ClassCounter/>
      <ClassCounter/>
      <ClassCounter/>
    </div>
  );
}

export default App;
