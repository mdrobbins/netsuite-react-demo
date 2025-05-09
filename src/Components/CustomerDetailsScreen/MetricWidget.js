import { clsx } from 'clsx';

function MetricWidget({ title, value, trend, percent, className }) {
  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className={clsx(
      "bg-slate-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border border-slate-700",
      className
    )}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-white">{value}</p>
        {percent && (
          <div className={clsx("flex items-center", getTrendColor())}>
            <span className="font-medium">{getTrendIcon()}</span>
            <span className="ml-1 text-sm">{percent}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

export { MetricWidget };
