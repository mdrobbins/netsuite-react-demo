import { PageHeader } from './Components/PageHeader';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { SearchScreen } from './Components/SearchScreen/SearchScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {CrmScreen} from "./Components/CrmScreen/CrmScreen";
import {InventoryScreen} from "./Components/InventoryScreen/InventoryScreen";
import {PurchasingScreen} from "./Components/PurchasingScreen/PurchasingScreen";

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
                            <Route path="/inventory" element={<InventoryScreen />} />
                            <Route path="/purchasing" element={<PurchasingScreen />} />
                            <Route path="/crm" element={<CrmScreen />} />
                        </Routes>
                    </div>
                </HashRouter>
            </QueryClientProvider>
        </div>
    );
}

export default App;
