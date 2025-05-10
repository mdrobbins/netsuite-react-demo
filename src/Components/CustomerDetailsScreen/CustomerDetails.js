import { useParams } from 'react-router-dom';
import { MetricWidget } from './MetricWidget';
import { ContactInfoCard } from './ContactInfoCard';
import { ActivityLog } from './ActivityLog';
import {useQuery} from "@tanstack/react-query";
import api from "../../api";

function CustomerDetails() {
  const { id } = useParams();

  const { isPending, data } = useQuery({
    queryKey: ['getCustomerDetails', [id]],
    queryFn: () => api.getCustomerDetails(id),
    retry: false,
  });

  const customer = data?.result;

  if (isPending || !customer) {
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
        <div>
          <h1 className="inline text-2xl font-bold text-white mb-6">
              Customer:
              <a href={`/app/common/entity/custjob.nl?id=${customer.id}`} target="_blank" className="hover:underline text-indigo-400 ml-2">
                  {customer.companyName}
              </a>
          </h1>
        </div>
      
      {/* Metrics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricWidget 
          title="Total Spend" 
          value={`$${customer.metrics.totalSpend.toLocaleString()}`} 
        />
        <MetricWidget 
          title="Order Count" 
          value={customer.metrics.orderCount} 
        />
        <MetricWidget 
          title="Open Balance"
          value={`$${customer.metrics.openBalance.toLocaleString()}`}
        />
        <MetricWidget 
          title="Past Due Balance"
          value={`$${customer.metrics.pastDueBalance.toLocaleString()}`}
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
