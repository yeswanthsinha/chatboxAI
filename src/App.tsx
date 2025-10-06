import { useState, useMemo, useEffect } from 'react';
import { BarChart3, Mail, FileText, Video, TrendingUp, Sparkles, Building2 } from 'lucide-react';
import OverviewTab from './components/OverviewTab';
import EmailSummaryTab from './components/EmailSummaryTab';
import DocumentSummaryTab from './components/DocumentSummaryTab';
import MeetingSummaryTab from './components/MeetingSummaryTab';
import AnalyticsTab from './components/AnalyticsTab';
import DateRangeSelector from './components/DateRangeSelector';
import {
  generateEmailData,
  generateDocumentData,
  generateMeetingData,
  generateAnalyticsData,
  filterDataByDateRange,
  aggregateEmailData,
  aggregateDocumentData,
  aggregateMeetingData,
  aggregateAnalyticsData,
  type EmailData,
  type DocumentData,
  type MeetingData,
  type AnalyticsData,
} from './utils/mockDataGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  // Initialize date range (last 30 days by default)
  const [endDate] = useState(new Date());
  const [startDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  });

  const [currentStartDate, setCurrentStartDate] = useState(startDate);
  const [currentEndDate, setCurrentEndDate] = useState(endDate);
  const [isLoading, setIsLoading] = useState(false);

  // Generate all data for 60 days (to allow flexible filtering)
  const allEmailData = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() - 60);
    return generateEmailData(start, new Date());
  }, []);

  const allDocumentData = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() - 60);
    return generateDocumentData(start, new Date());
  }, []);

  const allMeetingData = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() - 60);
    return generateMeetingData(start, new Date());
  }, []);

  const allAnalyticsData = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() - 60);
    return generateAnalyticsData(start, new Date());
  }, []);

  // Filter data based on current date range
  const filteredEmailData = useMemo(
    () => filterDataByDateRange(allEmailData, currentStartDate, currentEndDate),
    [allEmailData, currentStartDate, currentEndDate]
  );

  const filteredDocumentData = useMemo(
    () => filterDataByDateRange(allDocumentData, currentStartDate, currentEndDate),
    [allDocumentData, currentStartDate, currentEndDate]
  );

  const filteredMeetingData = useMemo(
    () => filterDataByDateRange(allMeetingData, currentStartDate, currentEndDate),
    [allMeetingData, currentStartDate, currentEndDate]
  );

  const filteredAnalyticsData = useMemo(
    () => filterDataByDateRange(allAnalyticsData, currentStartDate, currentEndDate),
    [allAnalyticsData, currentStartDate, currentEndDate]
  );

  // Aggregate filtered data
  const emailMetrics = useMemo(() => aggregateEmailData(filteredEmailData), [filteredEmailData]);
  const documentMetrics = useMemo(() => aggregateDocumentData(filteredDocumentData), [filteredDocumentData]);
  const meetingMetrics = useMemo(() => aggregateMeetingData(filteredMeetingData), [filteredMeetingData]);
  const analyticsMetrics = useMemo(() => aggregateAnalyticsData(filteredAnalyticsData), [filteredAnalyticsData]);

  // Handle date range change with loading state
  const handleDateRangeChange = (newStartDate: Date, newEndDate: Date) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentStartDate(newStartDate);
      setCurrentEndDate(newEndDate);
      setIsLoading(false);
    }, 300);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'email', label: 'Email Summary', icon: Mail },
    { id: 'document', label: 'Document Summary', icon: FileText },
    { id: 'meeting', label: 'Meeting Summary', icon: Video },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 text-white px-4 sm:px-6 md:px-8 py-4 md:py-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <Building2 className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <div>
              <h1 className="text-base md:text-xl font-semibold">Executive Command Center</h1>
              <p className="text-xs md:text-sm text-white/90 hidden sm:block">Strategic insights and company-wide analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <div>
              <div className="text-xs md:text-sm font-semibold">AI-Powered</div>
              <div className="text-[10px] md:text-xs text-white/90 hidden md:block">Real-time intelligence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="bg-white border-b">
        <div className="px-4 sm:px-6 md:px-8 py-4 md:py-6">
          <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-3">
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-blue-700">Executive Dashboard</h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">Complete organizational overview and strategic insights</p>
            </div>
            <DateRangeSelector
              startDate={currentStartDate}
              endDate={currentEndDate}
              onDateRangeChange={handleDateRangeChange}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 sm:px-6 md:px-8">
          <div className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-blue-600 bg-blue-50'
                      : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.id === 'overview' ? 'Overview' : tab.id === 'email' ? 'Email' : tab.id === 'document' ? 'Docs' : tab.id === 'meeting' ? 'Meetings' : 'Analytics'}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 sm:px-6 md:px-8 py-4 md:py-6">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-xl flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-gray-700 font-medium">Updating dashboard...</span>
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <OverviewTab
            emailMetrics={emailMetrics}
            documentMetrics={documentMetrics}
            meetingMetrics={meetingMetrics}
            analyticsMetrics={analyticsMetrics}
            dateRange={{ start: currentStartDate, end: currentEndDate }}
          />
        )}
        {activeTab === 'email' && (
          <EmailSummaryTab
            metrics={emailMetrics}
            data={filteredEmailData}
            dateRange={{ start: currentStartDate, end: currentEndDate }}
          />
        )}
        {activeTab === 'document' && (
          <DocumentSummaryTab
            metrics={documentMetrics}
            data={filteredDocumentData}
            dateRange={{ start: currentStartDate, end: currentEndDate }}
          />
        )}
        {activeTab === 'meeting' && (
          <MeetingSummaryTab
            metrics={meetingMetrics}
            data={filteredMeetingData}
            dateRange={{ start: currentStartDate, end: currentEndDate }}
          />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsTab
            metrics={analyticsMetrics}
            data={filteredAnalyticsData}
            emailData={filteredEmailData}
            documentData={filteredDocumentData}
            meetingData={filteredMeetingData}
            dateRange={{ start: currentStartDate, end: currentEndDate }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
