import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MetricWidget } from './MetricWidget';
import { ContactInfoCard } from './ContactInfoCard';
import { ActivityLog } from './ActivityLog';

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data fetching
  useEffect(() => {
    // In a real app, this would be an API call using the id parameter
    console.log(`Fetching customer data for ID: ${id}`);
    
    setTimeout(() => {
      setCustomer({
        id: id || 'CUST-1001',
        name: 'Acme Corporation',
        email: 'contact@acmecorp.com',
        phone: '(555) 123-4567',
        shippingAddress: {
          street: '123 Business Ave',
          city: 'Enterprise City',
          state: 'CA',
          zip: '94105',
          country: 'USA'
        },
        billingAddress: {
          street: '123 Business Ave, Suite 500',
          city: 'Enterprise City',
          state: 'CA',
          zip: '94105',
          country: 'USA'
        },
        metrics: {
          totalSpend: 125750,
          orderCount: 27,
          avgOrderValue: 4657,
          daysAsCustomer: 347
        }
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <h1 className="h-8 bg-slate-700 rounded w-1/3 mb-6"></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-700 rounded-lg"></div>
          ))}
        </div>
        <div className="h-64 bg-slate-700 rounded-lg mb-6"></div>
        <div className="h-96 bg-slate-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-6">Customer: {customer.name}</h1>
      
      {/* Metrics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricWidget 
          title="Total Spend" 
          value={`$${customer.metrics.totalSpend.toLocaleString()}`} 
          icon="dollar" 
          trend="up" 
          percent="12" 
        />
        <MetricWidget 
          title="Order Count" 
          value={customer.metrics.orderCount} 
          icon="shopping-cart" 
          trend="up" 
          percent="8" 
        />
        <MetricWidget 
          title="Avg Order Value" 
          value={`$${customer.metrics.avgOrderValue.toLocaleString()}`} 
          icon="chart-bar" 
          trend="down" 
          percent="3" 
        />
        <MetricWidget 
          title="Days as Customer" 
          value={customer.metrics.daysAsCustomer} 
          icon="calendar" 
          trend="neutral" 
        />
      </div>
      
      {/* Contact Information */}
      <ContactInfoCard customer={customer} className="mb-6" />
      
      {/* Activity Log */}
      <ActivityLog customerId={customer.id} />
    </>
  );
}

export { CustomerDetails };
