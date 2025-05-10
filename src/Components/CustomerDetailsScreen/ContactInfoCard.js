import { clsx } from 'clsx';
import { MapPin } from '../icons/MapPin';

function ContactInfoCard({ customer, className }) {

  const formatAddress = (address) => {
    return (
      <div className="space-y-1">
        <div>{address.address1}</div>
        <div>{address.city}, {address.state} {address.zip}</div>
        <div>{address.country}</div>
      </div>
    );
  };

  return (
    <div className={clsx("bg-slate-800 rounded-lg shadow-md p-6 border border-slate-700", className)}>
      <h2 className="text-lg font-semibold border-b border-slate-700 pb-3 mb-4 text-white">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Email and Phone */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-1">Email</h3>
            <p className="flex items-center">
              <a href={`mailto:${customer.email}`} className="text-indigo-400 hover:text-indigo-300 hover:underline">
                {customer.email}
              </a>
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-1">Phone</h3>
            <p className="flex items-center">
              <a href={`tel:${customer.phone}`} className="text-indigo-400 hover:text-indigo-300 hover:underline">
                {customer.phone}
              </a>
            </p>
          </div>
        </div>
        
        {/* Column 2: Billing Address */}
        <div>
          <h3 className="text-sm font-medium text-slate-300 mb-2 flex items-center">
            Billing Address
              <span className="ml-2"><MapPin/></span>
          </h3>
          <div className="text-slate-200">
            {formatAddress(customer.billingAddress)}
          </div>
        </div>
        
        {/* Column 3: Shipping Address */}
        <div>
          <h3 className="text-sm font-medium text-slate-300 mb-2 flex items-center">
            Shipping Address
              <span className="ml-2"><MapPin className="h-2 w-2"/></span>
          </h3>
          <div className="text-slate-200">
            {formatAddress(customer.shippingAddress)}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ContactInfoCard };
