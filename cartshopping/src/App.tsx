import Header from './components/Header/Header';
import InventoryList from './components/InventoryList/InventoryList';
import './styles/site.scss';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <InventoryList />      
      </div>
       <Footer />
    </div>
  );
}

export default App;