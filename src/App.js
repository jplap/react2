import React  from 'react';
import Products from './Products.js';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import './App.css';

class App extends React.Component {

  render() {
      //const [gridApi, setGridApi] = useState(null);
      //const [gridColumnApi, setGridColumnApi] = useState(null);
/*
      var rowData= [

          {id: 'Toyota', name: 'Celica', category: 35000},
          {id: 'Ford', name: 'Mondeo', category: 32000},
          {id: 'Porsche', name: 'Boxter', category: 72000}


      ]

 */
    return (
        <div>

          <section>
            <Products ></Products>
          </section>



        </div>
    );
  }
}

export default App;