import { clsx } from 'clsx';

function MetricWidget({ title, value, icon, trend, percent, className }) {
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

  const getIconComponent = () => {
    switch (icon) {
      case 'dollar':
        return <span className="text-xl">💲</span>;
      case 'shopping-cart':
        return <span className="text-xl">🛒</span>;
      case 'chart-bar':
        return <span className="text-xl">📊</span>;
      case 'calendar':
        return <span className="text-xl">📅</span>;
      default:
        return <span className="text-xl">📈</span>;
    }
  };

  return (
    <div className={clsx(
      "bg-slate-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border border-slate-700",
      className
    )}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>
        <div className="bg-slate-700 p-2 rounded-full">
          {getIconComponent()}
        </div>
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
