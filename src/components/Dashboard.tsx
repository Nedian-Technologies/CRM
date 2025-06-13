import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign,
  ArrowUp,
  ArrowDown,
  Calendar,
  Activity
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Contacts',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Deals',
      value: '134',
      change: '+8%',
      trend: 'up',
      icon: Target,
      color: 'green'
    },
    {
      title: 'Revenue',
      value: '$84,230',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: '12.4%',
      change: '-2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const recentDeals = [
    { id: 1, company: 'Acme Corp', amount: '$12,500', stage: 'Proposal', probability: 80 },
    { id: 2, company: 'Tech Solutions', amount: '$8,200', stage: 'Negotiation', probability: 65 },
    { id: 3, company: 'Global Inc', amount: '$25,000', stage: 'Qualified', probability: 45 },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Follow up with Acme Corp', due: 'Today', priority: 'high' },
    { id: 2, task: 'Prepare proposal for Tech Solutions', due: 'Tomorrow', priority: 'medium' },
    { id: 3, task: 'Schedule demo with Global Inc', due: 'This Week', priority: 'low' },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your CRM.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 inline mr-2" />
            This Month
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-500 text-blue-600',
            green: 'bg-green-500 text-green-600',
            purple: 'bg-purple-500 text-purple-600',
            orange: 'bg-orange-500 text-orange-600'
          };

          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-opacity-10 ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className={`w-6 h-6 ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[1]}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Recent Deals</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentDeals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{deal.company}</p>
                  <p className="text-sm text-gray-600">{deal.stage}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{deal.amount}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-12 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${deal.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{deal.probability}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
          </div>
          <div className="p-6 space-y-4">
            {upcomingTasks.map((task) => {
              const priorityColors = {
                high: 'bg-red-100 text-red-800',
                medium: 'bg-yellow-100 text-yellow-800',
                low: 'bg-green-100 text-green-800'
              };

              return (
                <div key={task.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Activity className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.task}</p>
                    <p className="text-sm text-gray-600">Due: {task.due}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    priorityColors[task.priority as keyof typeof priorityColors]
                  }`}>
                    {task.priority}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">John Doe</span> added a new contact: Sarah Wilson
                </p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Deal closed:</span> Acme Corp - $12,500
                </p>
                <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Task completed:</span> Follow up with Tech Solutions
                </p>
                <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;