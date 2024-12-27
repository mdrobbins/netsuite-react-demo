import { PageHeader } from './Components/PageHeader';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { SearchScreen } from './Components/SearchScreen/SearchScreen';

function App() {
  return (
    <div className="h-full">
      <HashRouter>
        <PageHeader />

        <div>
          <Routes>
            <Route path="/" element={<SearchScreen />} />
            {/*<Route path="/" element={<CustomerScreen />} />*/}
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
