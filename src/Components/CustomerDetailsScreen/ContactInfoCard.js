import { clsx } from 'clsx';

function ContactInfoCard({ customer, className }) {
  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`;
  };

  return (
    <div className={clsx("bg-slate-800 rounded-lg shadow-md p-6 border border-slate-700", className)}>
      <h2 className="text-lg font-semibold border-b border-slate-700 pb-3 mb-4 text-white">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-300 mb-1">Email</h3>
            <p className="flex items-center">
              <span className="mr-2">📧</span>
              <a href={`mailto:${customer.email}`} className="text-indigo-400 hover:text-indigo-300 hover:underline">
                {customer.email}
              </a>
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-1">Phone</h3>
            <p className="flex items-center">
              <span className="mr-2">📞</span>
              <a href={`tel:${customer.phone}`} className="text-indigo-400 hover:text-indigo-300 hover:underline">
                {customer.phone}
              </a>
            </p>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-300 mb-1">Shipping Address</h3>
            <p className="flex text-slate-200">
              <span className="mr-2">🚚</span>
              <span>{formatAddress(customer.shippingAddress)}</span>
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-1">Billing Address</h3>
            <p className="flex text-slate-200">
              <span className="mr-2">📝</span>
              <span>{formatAddress(customer.billingAddress)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ContactInfoCard };
