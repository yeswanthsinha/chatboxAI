import { TrendingUp, Sparkles, DollarSign, Target, Activity, BarChart3, PieChart } from 'lucide-react';
import type { AnalyticsData, EmailData, DocumentData, MeetingData } from '../utils/mockDataGenerator';

interface AnalyticsTabProps {
  metrics: {
    avgProductivity: number;
    avgCollaboration: number;
    avgEfficiency: number;
  };
  data: AnalyticsData[];
  emailData: EmailData[];
  documentData: DocumentData[];
  meetingData: MeetingData[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

export default function AnalyticsTab({ metrics, data, emailData, documentData, meetingData }: AnalyticsTabProps) {
  const totalActivity = emailData.length + documentData.length + meetingData.length;
  const avgEmailActivity = emailData.reduce((acc, day) => acc + day.sent + day.received, 0) / Math.max(emailData.length, 1);
  const avgDocActivity = documentData.reduce((acc, day) => acc + day.accessed, 0) / Math.max(documentData.length, 1);
  const recentActivities = [
    {
      title: 'Executive Leadership Team Meeting',
      subtitle: 'Strategic alignment confirmed',
      time: '2 hours ago',
    },
    {
      title: 'Approved $2.3M European expansion budget',
      subtitle: 'Growth initiative funded',
      time: '4 hours ago',
    },
    {
      title: 'Q4 financial results review',
      subtitle: '15.2% revenue growth confirmed',
      time: '6 hours ago',
    },
    {
      title: 'AI investment strategy discussion',
      subtitle: 'Technology roadmap approved',
      time: '1 day ago',
    },
  ];

  const aiInsights = [
    {
      icon: TrendingUp,
      text: 'Company valuation increased 12% this quarter to $156M',
    },
    {
      icon: Target,
      text: 'Digital transformation ROI reached 145%, exceeding projections',
    },
    {
      icon: DollarSign,
      text: 'Market share grew to 3.4%, positioning for industry leadership',
    },
    {
      icon: Sparkles,
      text: 'Employee engagement at 91%, supporting sustainable growth',
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Card */}
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            Analytics Overview
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mt-0.5">Comprehensive performance metrics and trends</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-600" />
            <div className="text-xs text-gray-600">Productivity Score</div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">{metrics.avgProductivity}%</div>
          <div className="mt-1 text-xs text-green-600 font-medium">
            {metrics.avgProductivity >= 85 ? 'Excellent Performance' : 'Good Performance'}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <div className="text-xs text-gray-600">Collaboration Score</div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">{metrics.avgCollaboration}%</div>
          <div className="mt-1 text-xs text-blue-600 font-medium">
            {meetingData.length} days tracked
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <div className="text-xs text-gray-600">Efficiency Score</div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">{metrics.avgEfficiency}%</div>
          <div className="mt-1 text-xs text-purple-600 font-medium">
            {metrics.avgEfficiency >= 80 ? 'Above Target' : 'On Target'}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-orange-600" />
            <div className="text-xs text-gray-600">Activity Days</div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">{data.length}</div>
          <div className="mt-1 text-xs text-orange-600 font-medium">
            {totalActivity} total activities
          </div>
        </div>
      </div>

      {/* Daily Activity Trend */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Daily Activity Trends</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Average Email Activity</span>
              <span className="text-sm font-semibold text-gray-900">{Math.round(avgEmailActivity)} per day</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((avgEmailActivity / 150) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Average Document Activity</span>
              <span className="text-sm font-semibold text-gray-900">{Math.round(avgDocActivity)} per day</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((avgDocActivity / 250) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Productivity Score</span>
              <span className="text-sm font-semibold text-gray-900">{metrics.avgProductivity}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.avgProductivity}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Collaboration Score</span>
              <span className="text-sm font-semibold text-gray-900">{metrics.avgCollaboration}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.avgCollaboration}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics and Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Performance Metrics */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="relative h-64 md:h-80 overflow-x-auto">
            <svg viewBox="0 0 400 320" className="w-full h-full">
              {/* Grid lines */}
              <line x1="80" y1="280" x2="380" y2="280" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="80" y1="210" x2="380" y2="210" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="80" y1="140" x2="380" y2="140" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="80" y1="70" x2="380" y2="70" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="80" y1="0" x2="380" y2="0" stroke="#e5e7eb" strokeWidth="1" />

              {/* Y-axis labels */}
              <text x="60" y="285" fontSize="11" fill="#6b7280">0</text>
              <text x="50" y="215" fontSize="11" fill="#6b7280">25</text>
              <text x="50" y="145" fontSize="11" fill="#6b7280">50</text>
              <text x="50" y="75" fontSize="11" fill="#6b7280">75</text>
              <text x="40" y="5" fontSize="11" fill="#6b7280">100</text>

              {/* Strategic Vision - Blue bars (current and previous) */}
              <rect x="100" y="30" width="35" height="250" fill="#3b82f6" rx="2" />
              <rect x="140" y="70" width="35" height="210" fill="#cbd5e1" rx="2" />

              {/* Market Position - Blue bars (current and previous) */}
              <rect x="200" y="10" width="35" height="270" fill="#3b82f6" rx="2" />
              <rect x="240" y="90" width="35" height="190" fill="#cbd5e1" rx="2" />

              {/* Stakeholder Relations - Blue bars (current and previous) */}
              <rect x="300" y="20" width="35" height="260" fill="#3b82f6" rx="2" />
              <rect x="340" y="80" width="35" height="200" fill="#cbd5e1" rx="2" />

              {/* X-axis labels */}
              <text x="90" y="305" fontSize="10" fill="#6b7280" textAnchor="middle">Strategic</text>
              <text x="90" y="318" fontSize="10" fill="#6b7280" textAnchor="middle">Vision</text>

              <text x="210" y="305" fontSize="10" fill="#6b7280" textAnchor="middle">Market</text>
              <text x="210" y="318" fontSize="10" fill="#6b7280" textAnchor="middle">Position</text>

              <text x="320" y="305" fontSize="10" fill="#6b7280" textAnchor="middle">Stakeholder</text>
              <text x="320" y="318" fontSize="10" fill="#6b7280" textAnchor="middle">Relations</text>
            </svg>
          </div>
        </div>

        {/* Activity Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Activity Overview</h3>
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Donut Chart with Center Text */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg viewBox="0 0 240 240" className="w-full h-full transform -rotate-90">
                {/* Strategic 21% - Blue */}
                <circle
                  cx="120"
                  cy="120"
                  r="80"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="35"
                  strokeDasharray="105.4 500"
                  strokeDashoffset="0"
                  className="transition-all duration-300 hover:opacity-80"
                />

                {/* Stakeholder 20% - Light Blue */}
                <circle
                  cx="120"
                  cy="120"
                  r="80"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="35"
                  strokeDasharray="100.5 500"
                  strokeDashoffset="-105.4"
                  className="transition-all duration-300 hover:opacity-80"
                />

                {/* Innovation 19% - Purple */}
                <circle
                  cx="120"
                  cy="120"
                  r="80"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="35"
                  strokeDasharray="95.5 500"
                  strokeDashoffset="-205.9"
                  className="transition-all duration-300 hover:opacity-80"
                />

                {/* Market 20% - Orange */}
                <circle
                  cx="120"
                  cy="120"
                  r="80"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="35"
                  strokeDasharray="100.5 500"
                  strokeDashoffset="-301.4"
                  className="transition-all duration-300 hover:opacity-80"
                />

                {/* Financial 20% - Green */}
                <circle
                  cx="120"
                  cy="120"
                  r="80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="35"
                  strokeDasharray="100.5 500"
                  strokeDashoffset="-401.9"
                  className="transition-all duration-300 hover:opacity-80"
                />
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Activity</div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm w-full max-w-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-600 flex-shrink-0"></div>
                <span className="text-gray-700 font-medium">Strategic 21%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-400 flex-shrink-0"></div>
                <span className="text-gray-700 font-medium">Stakeholder 20%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-600 flex-shrink-0"></div>
                <span className="text-gray-700 font-medium">Innovation 19%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-600 flex-shrink-0"></div>
                <span className="text-gray-700 font-medium">Market 20%</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 justify-center">
                <div className="w-4 h-4 rounded bg-green-600 flex-shrink-0"></div>
                <span className="text-gray-700 font-medium">Financial 20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & AI Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Recent Activities & AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Activities */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Activities</h4>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                      <div className="text-xs text-gray-600">{activity.subtitle}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{activity.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Insights */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">AI Insights</h4>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3 h-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{insight.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
