import { Link } from 'react-router-dom';

function PageHeader() {
  return (
    <header className="p-4 w-full bg-black text-white flex justify-between items-center">
      <h2 className="text-lg tracking-widest">DataTek React Starter Kit</h2>
      <div className="flex space-x-4">
        <Link to="/">Search Page</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/purchasing">Purchasing</Link>
        <Link to="/crm">CRM</Link>
      </div>
    </header>
  );
}

export { PageHeader };
