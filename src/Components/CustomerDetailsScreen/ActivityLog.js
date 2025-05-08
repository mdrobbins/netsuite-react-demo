import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { clsx } from 'clsx';

function ActivityLog({ customerId }) {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data fetching
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setActivities([
        {
          id: 'act-001',
          type: 'note',
          content: 'Customer inquired about bulk discount options for their next order.',
          createdBy: 'Jane Smith',
          createdAt: new Date(2023, 6, 15, 14, 30),
        },
        {
          id: 'act-002',
          type: 'email',
          content: 'Sent quarterly catalog and personalized product recommendations.',
          createdBy: 'Marketing System',
          createdAt: new Date(2023, 6, 10, 9, 15),
        },
        {
          id: 'act-003',
          type: 'call',
          content: 'Follow-up call regarding implementation of new service package. Customer very satisfied with onboarding process.',
          createdBy: 'John Doe',
          duration: '23 min',
          createdAt: new Date(2023, 6, 5, 11, 0),
        },
        {
          id: 'act-004',
          type: 'note',
          content: 'Customer reported issues with latest shipment. Created support ticket #45982.',
          createdBy: 'Alex Johnson',
          createdAt: new Date(2023, 6, 1, 16, 45),
        },
        {
          id: 'act-005',
          type: 'email',
          content: 'Sent invoice #INV-2023-07-15 for recent order.',
          createdBy: 'Billing System',
          createdAt: new Date(2023, 5, 28, 8, 0),
        },
        {
          id: 'act-006',
          type: 'call',
          content: 'Quarterly business review call. Discussed expansion opportunities and introduced new product lines.',
          createdBy: 'Sarah Williams',
          duration: '45 min',
          createdAt: new Date(2023, 5, 20, 10, 30),
        },
      ]);
      setIsLoading(false);
    }, 1500);
  }, [customerId]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'note': return '📝';
      case 'email': return '📧';
      case 'call': return '📞';
      default: return '📌';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-md p-6 border border-slate-700">
        <h2 className="text-lg font-semibold border-b border-slate-700 pb-3 mb-4 text-white">Recent CRM Activity</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-700 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-slate-700 rounded w-full mb-1"></div>
                <div className="h-3 bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-md p-6 border border-slate-700">
      <h2 className="text-lg font-semibold border-b border-slate-700 pb-3 mb-4 text-white">Recent CRM Activity</h2>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className={clsx(
              "flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0",
              activity.type === 'note' && "bg-yellow-900",
              activity.type === 'email' && "bg-blue-900",
              activity.type === 'call' && "bg-green-900"
            )}>
              <span className="text-lg">{getActivityIcon(activity.type)}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium capitalize text-white">{activity.type}</h3>
                <span className="text-xs text-slate-400">
                  {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
                </span>
              </div>
              
              <p className="text-sm mt-1 text-slate-300">{activity.content}</p>
              
              <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>By: {activity.createdBy}</span>
                {activity.duration && <span>Duration: {activity.duration}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full py-2 bg-slate-700 text-slate-200 rounded-md hover:bg-slate-600 transition">
        Load More Activity
      </button>
    </div>
  );
}

export { ActivityLog };
