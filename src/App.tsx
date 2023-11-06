import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeView } from './views/HomeView/HomeView';
import { MinifigSelectionView } from './views/MinifigSelectionView/MinifigSelectionView';
import { OrderFormView } from './views/OrderFormView/OrderFormView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeView />} path='/' />
        <Route element={<MinifigSelectionView />} path='/figure-selection' />
        <Route element={<OrderFormView />} path='/order-form' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
