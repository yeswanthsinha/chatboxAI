import { TrendingUp, AlertCircle, AlertTriangle, Briefcase, Globe, ChevronDown, Zap } from 'lucide-react';

interface OverviewTabProps {
  emailMetrics: {
    totalSent: number;
    totalReceived: number;
    totalPriority: number;
    avgResponseRate: number;
    avgSentiment: number;
  };
  documentMetrics: {
    totalAccessed: number;
    totalCreated: number;
    totalModified: number;
    totalShared: number;
  };
  meetingMetrics: {
    totalMeetings: number;
    avgDuration: number;
    avgAttendees: number;
    sentimentBreakdown: { positive: number; neutral: number };
  };
  analyticsMetrics: {
    avgProductivity: number;
    avgCollaboration: number;
    avgEfficiency: number;
  };
  dateRange: {
    start: Date;
    end: Date;
  };
}

export default function OverviewTab({
  emailMetrics,
  documentMetrics,
  meetingMetrics,
  analyticsMetrics,
}: OverviewTabProps) {
  const totalEmailActivity = emailMetrics.totalSent + emailMetrics.totalReceived;

  const metrics = [
    {
      label: 'Total Emails (Sent + Received)',
      value: totalEmailActivity.toLocaleString(),
      comparison: `Priority: ${emailMetrics.totalPriority}`,
      change: `${emailMetrics.totalSent} sent`,
      isNegative: false,
    },
    {
      label: 'Documents Accessed',
      value: documentMetrics.totalAccessed.toLocaleString(),
      comparison: `Created: ${documentMetrics.totalCreated}`,
      change: `${documentMetrics.totalModified} modified`,
      isNegative: false,
    },
    {
      label: 'Total Meetings',
      value: meetingMetrics.totalMeetings.toString(),
      comparison: `Avg Duration: ${meetingMetrics.avgDuration}min`,
      change: `${meetingMetrics.avgAttendees} avg attendees`,
      isNegative: false,
    },
    {
      label: 'Documents Shared',
      value: documentMetrics.totalShared.toLocaleString(),
      comparison: `Modified: ${documentMetrics.totalModified}`,
      change: `${Math.round((documentMetrics.totalShared / documentMetrics.totalAccessed) * 100)}% share rate`,
      isNegative: false,
    },
  ];

  const scoreMetrics = [
    {
      label: 'Productivity Score',
      value: `${analyticsMetrics.avgProductivity}%`,
      comparison: `Efficiency: ${analyticsMetrics.avgEfficiency}%`,
      change: analyticsMetrics.avgProductivity >= 85 ? 'Excellent' : 'Good',
      isNegative: false,
    },
    {
      label: 'Collaboration Score',
      value: `${analyticsMetrics.avgCollaboration}%`,
      comparison: `Meetings: ${meetingMetrics.totalMeetings}`,
      change: `${meetingMetrics.sentimentBreakdown.positive} positive`,
      isNegative: false,
    },
    {
      label: 'Email Sentiment',
      value: `${emailMetrics.avgSentiment}%`,
      comparison: `Response: ${emailMetrics.avgResponseRate}%`,
      change: emailMetrics.avgSentiment >= 85 ? '+High' : '+Moderate',
      isNegative: false,
    },
    {
      label: 'Response Rate',
      value: `${emailMetrics.avgResponseRate}%`,
      comparison: `Total: ${totalEmailActivity}`,
      change: emailMetrics.avgResponseRate >= 90 ? '+Excellent' : '+Good',
      isNegative: false,
    },
  ];

  const actionItems = [
    {
      icon: AlertCircle,
      title: 'High-Priority Emails Require Response',
      badge: 'Email Intelligence',
      description: '8 critical emails from executives and clients need immediate attention',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      icon: AlertTriangle,
      title: 'Security Alert: Unusual File Access',
      badge: 'Security Intelligence',
      description: '3 suspicious file access patterns detected requiring review',
      badgeColor: 'bg-purple-100 text-purple-700',
    },
    {
      icon: Briefcase,
      title: 'Strategic Investment Opportunity',
      badge: 'Strategic Intelligence',
      description: 'AI identified high-potential acquisition target with 92% strategic fit',
      badgeColor: 'bg-indigo-100 text-indigo-700',
    },
    {
      icon: Globe,
      title: 'Market Expansion Opportunity',
      badge: 'Growth Intelligence',
      description: 'European market analysis shows $8M revenue potential with 67% success probability',
      badgeColor: 'bg-green-100 text-green-700',
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
            J
          </div>
          <div>
            <h3 className="text-sm md:text-base font-semibold text-gray-900">Welcome back, John CEO!</h3>
            <p className="text-xs md:text-sm text-gray-600 mt-0.5">You have full access to all organizational metrics and insights.</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
            <div className="text-xs text-gray-600 mb-2">{metric.label}</div>
            <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="text-gray-500">{metric.comparison}</span>
              <span className={`font-medium ${metric.isNegative ? 'text-red-600' : 'text-green-600'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Score Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {scoreMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
            <div className="text-xs text-gray-600 mb-2">{metric.label}</div>
            <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="text-gray-500">{metric.comparison}</span>
              <span className={`font-medium ${metric.isNegative ? 'text-red-600' : 'text-green-600'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI-Powered Action Items */}
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">AI-Powered Action Items (4)</h3>
          <span className="text-xs md:text-sm text-gray-500">Executive • ceo</span>
        </div>

        <div className="space-y-3">
          {actionItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2 md:gap-3 flex-1">
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start md:items-center gap-2 mb-1 flex-wrap">
                        <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <h4 className="text-sm md:text-base font-semibold text-gray-900">{item.title}</h4>
                        <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded ${item.badgeColor} font-medium whitespace-nowrap`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                  <button className="flex items-center gap-1 text-xs md:text-sm text-gray-600 hover:text-gray-900">
                    <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                    View Details
                  </button>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded text-xs md:text-sm font-medium hover:bg-blue-700">
                    <Zap className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Trigger AI Action</span>
                    <span className="sm:hidden">Action</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Executive Performance Trends */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Executive Performance Trends</h3>
          <div className="relative h-48 md:h-64 overflow-x-auto">
            <svg viewBox="0 0 400 240" className="w-full h-full">
              {/* Grid lines */}
              <line x1="40" y1="200" x2="380" y2="200" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="150" x2="380" y2="150" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="100" x2="380" y2="100" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="50" x2="380" y2="50" stroke="#e5e7eb" strokeWidth="1" />

              {/* Y-axis labels */}
              <text x="20" y="205" fontSize="12" fill="#6b7280">0</text>
              <text x="20" y="155" fontSize="12" fill="#6b7280">30</text>
              <text x="20" y="105" fontSize="12" fill="#6b7280">60</text>
              <text x="20" y="55" fontSize="12" fill="#6b7280">90</text>
              <text x="10" y="15" fontSize="12" fill="#6b7280">120</text>

              {/* X-axis labels */}
              <text x="60" y="225" fontSize="12" fill="#6b7280">Oct</text>
              <text x="160" y="225" fontSize="12" fill="#6b7280">Nov</text>
              <text x="260" y="225" fontSize="12" fill="#6b7280">Dec</text>
              <text x="360" y="225" fontSize="12" fill="#6b7280">Jan</text>

              {/* Blue line */}
              <polyline
                points="70,50 170,40 270,35 370,45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <circle cx="70" cy="50" r="3" fill="#3b82f6" />
              <circle cx="170" cy="40" r="3" fill="#3b82f6" />
              <circle cx="270" cy="35" r="3" fill="#3b82f6" />
              <circle cx="370" cy="45" r="3" fill="#3b82f6" />

              {/* Orange line */}
              <polyline
                points="70,120 170,110 270,105 370,100"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
              />
              <circle cx="70" cy="120" r="3" fill="#f97316" />
              <circle cx="170" cy="110" r="3" fill="#f97316" />
              <circle cx="270" cy="105" r="3" fill="#f97316" />
              <circle cx="370" cy="100" r="3" fill="#f97316" />

              {/* Green line */}
              <polyline
                points="70,180 170,175 270,180 370,175"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
              <circle cx="70" cy="180" r="3" fill="#10b981" />
              <circle cx="170" cy="175" r="3" fill="#10b981" />
              <circle cx="270" cy="180" r="3" fill="#10b981" />
              <circle cx="370" cy="175" r="3" fill="#10b981" />
            </svg>
          </div>
        </div>

        {/* Weekly Activity Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Weekly Activity Distribution</h3>
          <div className="relative h-48 md:h-64 overflow-x-auto">
            <svg viewBox="0 0 400 240" className="w-full h-full">
              {/* Grid lines */}
              <line x1="40" y1="200" x2="380" y2="200" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="150" x2="380" y2="150" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="100" x2="380" y2="100" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="50" x2="380" y2="50" stroke="#e5e7eb" strokeWidth="1" />

              {/* Y-axis labels */}
              <text x="20" y="205" fontSize="12" fill="#6b7280">0</text>
              <text x="20" y="155" fontSize="12" fill="#6b7280">4</text>
              <text x="20" y="105" fontSize="12" fill="#6b7280">8</text>
              <text x="20" y="55" fontSize="12" fill="#6b7280">12</text>
              <text x="10" y="15" fontSize="12" fill="#6b7280">16</text>

              {/* W1 bars */}
              <rect x="60" y="175" width="15" height="25" fill="#3b82f6" />
              <rect x="80" y="130" width="15" height="70" fill="#f97316" />
              <rect x="100" y="160" width="15" height="40" fill="#10b981" />

              {/* W2 bars */}
              <rect x="140" y="180" width="15" height="20" fill="#3b82f6" />
              <rect x="160" y="100" width="15" height="100" fill="#f97316" />
              <rect x="180" y="125" width="15" height="75" fill="#10b981" />

              {/* W3 bars */}
              <rect x="220" y="170" width="15" height="30" fill="#3b82f6" />
              <rect x="240" y="120" width="15" height="80" fill="#f97316" />
              <rect x="260" y="135" width="15" height="65" fill="#10b981" />

              {/* W4 bars */}
              <rect x="300" y="175" width="15" height="25" fill="#3b82f6" />
              <rect x="320" y="60" width="15" height="140" fill="#f97316" />
              <rect x="340" y="115" width="15" height="85" fill="#10b981" />

              {/* X-axis labels */}
              <text x="75" y="225" fontSize="12" fill="#6b7280">W1</text>
              <text x="155" y="225" fontSize="12" fill="#6b7280">W2</text>
              <text x="235" y="225" fontSize="12" fill="#6b7280">W3</text>
              <text x="315" y="225" fontSize="12" fill="#6b7280">W4</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Productivity Score */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Productivity Score</h3>
          <div className="relative h-48 flex items-center justify-center">
            <svg viewBox="0 0 240 200" className="w-full h-full">
              {/* Donut segments - Excellent (Green) 48% */}
              <path
                d="M 120 20 A 80 80 0 0 1 198 95 L 120 95 Z"
                fill="#10b981"
              />

              {/* Good (Blue) 35% */}
              <path
                d="M 198 95 A 80 80 0 0 1 130 175 L 120 95 Z"
                fill="#3b82f6"
              />

              {/* Average (Orange) 15% */}
              <path
                d="M 130 175 A 80 80 0 0 1 77 162 L 120 95 Z"
                fill="#f97316"
              />

              {/* Needs Improvement (Red) - remaining */}
              <path
                d="M 77 162 A 80 80 0 0 1 42 95 L 120 95 Z"
                fill="#ef4444"
              />

              {/* Complete the circle */}
              <path
                d="M 42 95 A 80 80 0 0 1 120 20 L 120 95 Z"
                fill="#ef4444"
              />

              {/* Inner white circle for donut effect */}
              <circle cx="120" cy="95" r="50" fill="white" />
            </svg>

            {/* Labels positioned around the donut */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2">
              <div className="text-[10px] text-green-600 font-medium whitespace-nowrap">Excellent 48%</div>
            </div>
            <div className="absolute bottom-6 right-4">
              <div className="text-[10px] text-blue-600 font-medium whitespace-nowrap">Good 35%</div>
            </div>
            <div className="absolute bottom-8 left-1">
              <div className="text-[10px] text-orange-600 font-medium whitespace-nowrap">Average 15%</div>
            </div>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2">
              <div className="text-[10px] text-red-600 font-medium whitespace-nowrap">Needs Improvement</div>
            </div>
          </div>
        </div>

        {/* Communication Efficiency */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Communication Efficiency</h3>
          <div className="relative h-48">
            <svg viewBox="0 0 300 180" className="w-full h-full">
              {/* Grid */}
              <line x1="40" y1="150" x2="280" y2="150" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="100" x2="280" y2="100" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="50" x2="280" y2="50" stroke="#e5e7eb" strokeWidth="1" />

              {/* Y-axis */}
              <text x="20" y="155" fontSize="10" fill="#6b7280">0</text>
              <text x="15" y="105" fontSize="10" fill="#6b7280">40</text>
              <text x="15" y="55" fontSize="10" fill="#6b7280">80</text>

              {/* Area chart */}
              <path
                d="M 50 110 Q 90 100 110 95 T 170 105 Q 210 95 230 110 L 230 150 L 50 150 Z"
                fill="#93c5fd"
                opacity="0.6"
              />
              <path
                d="M 50 110 Q 90 100 110 95 T 170 105 Q 210 95 230 110"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              />

              {/* X-axis labels */}
              <text x="45" y="170" fontSize="10" fill="#6b7280">Mon</text>
              <text x="90" y="170" fontSize="10" fill="#6b7280">Tue</text>
              <text x="130" y="170" fontSize="10" fill="#6b7280">Wed</text>
              <text x="170" y="170" fontSize="10" fill="#6b7280">Thu</text>
              <text x="220" y="170" fontSize="10" fill="#6b7280">Fri</text>
            </svg>
          </div>
        </div>

        {/* Team Collaboration */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-4">Team Collaboration</h3>
          <div className="relative h-48">
            <svg viewBox="0 0 300 180" className="w-full h-full">
              {/* Grid */}
              <line x1="40" y1="150" x2="280" y2="150" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="100" x2="280" y2="100" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="50" x2="280" y2="50" stroke="#e5e7eb" strokeWidth="1" />

              {/* Y-axis */}
              <text x="20" y="155" fontSize="10" fill="#6b7280">0</text>
              <text x="15" y="105" fontSize="10" fill="#6b7280">50</text>
              <text x="10" y="55" fontSize="10" fill="#6b7280">100</text>

              {/* Bars */}
              <rect x="70" y="60" width="35" height="90" fill="#8b5cf6" rx="2" />
              <rect x="130" y="55" width="35" height="95" fill="#8b5cf6" rx="2" />
              <rect x="190" y="75" width="35" height="75" fill="#8b5cf6" rx="2" />
              <rect x="250" y="55" width="35" height="95" fill="#8b5cf6" rx="2" />

              {/* X-axis labels */}
              <text x="65" y="170" fontSize="10" fill="#6b7280">Internal</text>
              <text x="125" y="170" fontSize="10" fill="#6b7280">External</text>
              <text x="185" y="170" fontSize="10" fill="#6b7280">Remote</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
