import './App.css';
import { Provider } from 'react-redux';
import { Header } from './components/Header';
import { Main } from './Main';
import { store } from './store/store';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </div>
  );
}

export default App;
