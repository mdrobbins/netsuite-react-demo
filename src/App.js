import { PageHeader } from './Components/PageHeader';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { SearchScreen } from './Components/SearchScreen/SearchScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <div className="h-full bg-slate-900">
            <QueryClientProvider client={queryClient}>
                <HashRouter>
                    <PageHeader />

                    <div className="h-full">
                        <Routes>
                            <Route path="/" element={<SearchScreen />} />
                            {/*<Route path="/" element={<CustomerScreen />} />*/}
                        </Routes>
                    </div>
                </HashRouter>
            </QueryClientProvider>
        </div>
    );
}

export default App;
