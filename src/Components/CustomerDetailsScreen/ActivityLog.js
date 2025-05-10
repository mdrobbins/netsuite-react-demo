import { useState, useEffect } from 'react';
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { clsx } from 'clsx';
import { Note } from '../icons/Note';
import { Envelope } from '../icons/Envelope';
import { Phone } from '../icons/Phone';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../api';

function ActivityLog({ customerId }) {
    const { id } = useParams();

    const { isPending, data } = useQuery({
        queryKey: ['getCustomerActivity', [id]],
        queryFn: () => api.getCustomerActivity(id),
        retry: false,
    });

    const activities = data?.result;

    const getActivityIcon = type => {
        switch (type) {
            case 'NOTE':
                return <Note />;
            case 'EMAIL':
                return <Envelope />;
            case 'CALL':
                return <Phone />;
            default:
                return '📌';
        }
    };

    if (isPending) {
        return (
            <div className="bg-slate-800 rounded-lg shadow-md p-6 border border-slate-700">
                <h2 className="text-lg font-semibold border-b border-slate-700 pb-3 mb-4 text-white">
                    Recent CRM Activity
                </h2>
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
            <h2 className="text-lg font-semibold border-b border-slate-700 pb-3 mb-4 text-white">
                Recent CRM Activity
            </h2>

            <div className="space-y-6">
                {activities.map(activity => (
                    <div key={activity.id} className="flex gap-4">
                        <div
                            className={clsx(
                                'flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 text-white',
                            )}
                        >
                            <span className="text-lg p-2 rounded-full bg-gray-700">
                                {getActivityIcon(activity.type)}
                            </span>
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h3 className="text-sm font-medium capitalize text-white">
                                    {activity.title}
                                </h3>
                                <span className="text-xs text-slate-400">
                                    {formatDistanceToNowStrict(new Date(activity.date), {
                                        addSuffix: true,
                                    })}
                                </span>
                            </div>

                            <p className="text-sm mt-1 text-slate-300 line-clamp-2" dangerouslySetInnerHTML={{ __html: activity.message }}>
                                {/*{activity.message}*/}
                            </p>

                            <div className="flex justify-between mt-2 text-xs text-slate-400">
                                <span>By: {activity.ownerName}</span>
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
