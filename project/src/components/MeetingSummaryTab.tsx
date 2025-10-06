import { Video, Clock, Users, ArrowUp, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { MeetingData } from '../utils/mockDataGenerator';

interface MeetingSummaryTabProps {
  metrics: {
    totalMeetings: number;
    avgDuration: number;
    avgAttendees: number;
    sentimentBreakdown: { positive: number; neutral: number };
  };
  data: MeetingData[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

export default function MeetingSummaryTab({ metrics }: MeetingSummaryTabProps) {
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [displayedSummary, setDisplayedSummary] = useState('');
  const [fullSummary, setFullSummary] = useState('');
  const meetingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const meetings = [
    {
      name: 'Executive Leadership Team Meeting',
      duration: '90 minutes',
      attendees: 6,
      time: 'Today, 10:00 AM',
      sentiment: 'positive',
    },
    {
      name: 'Board Strategy Session',
      duration: '120 minutes',
      attendees: 4,
      time: 'Yesterday, 2:00 PM',
      sentiment: 'positive',
    },
    {
      name: 'Product Roadmap Review',
      duration: '60 minutes',
      attendees: 8,
      time: 'Yesterday, 4:30 PM',
      sentiment: 'positive',
    },
    {
      name: 'Q4 Financial Planning',
      duration: '75 minutes',
      attendees: 5,
      time: '2 days ago, 9:00 AM',
      sentiment: 'neutral',
    },
    {
      name: 'Marketing Campaign Kickoff',
      duration: '45 minutes',
      attendees: 12,
      time: '3 days ago, 11:00 AM',
      sentiment: 'positive',
    },
    {
      name: 'Tech Architecture Discussion',
      duration: '90 minutes',
      attendees: 7,
      time: '3 days ago, 2:00 PM',
      sentiment: 'neutral',
    },
    {
      name: 'Customer Success Review',
      duration: '60 minutes',
      attendees: 6,
      time: '4 days ago, 3:00 PM',
      sentiment: 'positive',
    },
    {
      name: 'Sales Pipeline Analysis',
      duration: '50 minutes',
      attendees: 9,
      time: '5 days ago, 10:30 AM',
      sentiment: 'positive',
    },
    {
      name: 'HR Policy Updates',
      duration: '40 minutes',
      attendees: 5,
      time: '1 week ago, 1:00 PM',
      sentiment: 'neutral',
    },
    {
      name: 'Operations Efficiency Workshop',
      duration: '105 minutes',
      attendees: 10,
      time: '1 week ago, 9:00 AM',
      sentiment: 'positive',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        setShowScrollTop(scrollTop > 200);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMeetingIndex === null && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        setSelectedMeetingIndex(0);
        return;
      }

      if (selectedMeetingIndex !== null) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = Math.min(selectedMeetingIndex + 1, meetings.length - 1);
          setSelectedMeetingIndex(nextIndex);
          scrollToMeeting(nextIndex);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = Math.max(selectedMeetingIndex - 1, 0);
          setSelectedMeetingIndex(prevIndex);
          scrollToMeeting(prevIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMeetingIndex, meetings.length]);

  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  const scrollToMeeting = (index: number) => {
    meetingRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleMeetingClick = (index: number) => {
    setSelectedMeetingIndex(index);
    setDisplayedSummary('');
    setFullSummary('');
    setIsGeneratingSummary(false);
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
    }
  };

  const generateSummary = () => {
    if (selectedMeetingIndex === null) return;

    setIsGeneratingSummary(true);
    setDisplayedSummary('');
    setFullSummary('');

    const summaries: Record<number, string> = {
      0: "Executive Leadership Team Meeting Summary:\n\nKey Discussion Points:\n• Q4 strategic initiatives and execution progress\n• Revenue growth trajectory exceeding targets by 15%\n• Market expansion into three new regions approved\n• Digital transformation initiatives showing strong ROI\n\nDecisions Made:\n• Approved $2M additional budget for marketing campaigns\n• Authorized hiring of 12 new engineering positions\n• Greenlit the TechCorp acquisition due diligence process\n\nAction Items:\n• John CEO: Present board update by end of week\n• CFO: Prepare detailed financial projections for new markets\n• CTO: Submit technology roadmap by Friday\n• CMO: Launch campaign by month end\n\nOverall Sentiment: Positive and action-oriented with clear alignment on strategic priorities.",
      1: "Board Strategy Session Summary:\n\nStrategic Focus Areas:\n• Long-term growth strategy and market positioning\n• Competitive landscape analysis and opportunities\n• Investment priorities for 2025\n• Risk assessment and mitigation strategies\n\nKey Decisions:\n• Approved strategic investment in AI capabilities\n• Endorsed expansion into European markets\n• Authorized formation of Innovation Committee\n• Set quarterly review cadence for strategy execution\n\nAction Items:\n• Strategy Team: Develop detailed market entry plan\n• Finance: Model investment scenarios and ROI projections\n• Legal: Review regulatory requirements for new markets\n• Board Secretary: Schedule quarterly strategy reviews\n\nNext Steps: Detailed implementation roadmap to be presented at next board meeting.",
      2: "Product Roadmap Review Summary:\n\nProduct Priorities:\n• Feature releases planned for Q1 2025\n• Customer feedback integration and prioritization\n• Technical debt reduction initiatives\n• Platform scalability improvements\n\nHighlights:\n• AI-powered features showing high user engagement\n• Mobile app redesign receiving positive beta feedback\n• API performance improvements completed ahead of schedule\n\nDecisions:\n• Prioritize security enhancements for enterprise customers\n• Accelerate mobile feature parity timeline\n• Invest in developer tools and documentation\n\nAction Items:\n• Product Team: Finalize Q1 feature specifications\n• Engineering: Complete security audit by next week\n• Design: Deliver mobile UI updates\n• Customer Success: Gather enterprise feedback\n\nTimeline: Q1 releases on track for planned delivery dates.",
      3: "Q4 Financial Planning Summary:\n\nFinancial Overview:\n• Revenue projections: $45M for Q4 (18% YoY growth)\n• Operating expenses tracking below budget\n• Cash position strong with 18 months runway\n• Profitability targets achievable with current trajectory\n\nBudget Allocations:\n• Sales & Marketing: 35% of budget\n• Product Development: 30% of budget\n• Operations: 20% of budget\n• G&A: 15% of budget\n\nKey Decisions:\n• Approved contingency fund of $500K\n• Authorized capital expenditure for infrastructure\n• Endorsed hiring plan for 25 new positions\n\nAction Items:\n• Finance: Distribute detailed budget reports to departments\n• Department Heads: Submit quarterly spending plans\n• CFO: Present to board in two weeks\n\nRisk Factors: Currency fluctuations and market volatility being monitored.",
      4: "Marketing Campaign Kickoff Summary:\n\nCampaign Overview:\n• Multi-channel approach targeting enterprise customers\n• Budget: $2M over 6-month period\n• Expected ROI: 150% based on historical data\n• Launch date: End of current month\n\nStrategy:\n• Content marketing and thought leadership\n• Targeted digital advertising campaigns\n• Strategic partnerships and co-marketing\n• Customer success stories and case studies\n\nTeam Alignment:\n• Creative assets in final review stage\n• Media buying strategy approved\n• Analytics and tracking infrastructure ready\n• Sales enablement materials prepared\n\nAction Items:\n• Creative Team: Finalize all campaign assets\n• Digital Marketing: Launch paid media campaigns\n• PR Team: Coordinate press release distribution\n• Sales: Prepare for increased lead volume\n\nSuccess Metrics: Lead generation, conversion rates, and customer acquisition cost.",
      5: "Tech Architecture Discussion Summary:\n\nArchitecture Topics:\n• Cloud infrastructure optimization and cost reduction\n• Microservices migration strategy and timeline\n• Security architecture enhancements\n• Database scaling and performance improvements\n\nTechnical Decisions:\n• Proceed with Kubernetes migration in Q1 2025\n• Implement zero-trust security framework\n• Adopt GraphQL for new API development\n• Establish architecture review board\n\nChallenges Discussed:\n• Legacy system dependencies and technical debt\n• Team skill development for new technologies\n• Balancing feature velocity with architectural improvements\n\nAction Items:\n• Architecture Team: Document migration plan\n• DevOps: Prepare infrastructure provisioning\n• Security: Conduct architecture security review\n• Engineering Leads: Identify training needs\n\nTimeline: Phased approach over 6 months with quarterly milestones.",
      6: "Customer Success Review Summary:\n\nCustomer Health Metrics:\n• Net Promoter Score: 72 (industry leading)\n• Customer retention rate: 94%\n• Average customer satisfaction: 4.6/5\n• Support ticket resolution time: 12 hours average\n\nHighlights:\n• Successful implementation of proactive outreach program\n• Reduced churn by 15% through early intervention\n• Enterprise customer expansion revenue up 25%\n\nChallenges:\n• Onboarding time for complex implementations\n• Need for improved self-service documentation\n• Resource constraints during peak support periods\n\nAction Items:\n• CS Team: Launch improved onboarding program\n• Product: Enhance in-app guidance and tutorials\n• Operations: Hire 3 additional support engineers\n• Success Managers: Schedule quarterly business reviews\n\nGoals: Maintain NPS above 70 and improve onboarding efficiency by 30%.",
      7: "Sales Pipeline Analysis Summary:\n\nPipeline Overview:\n• Total pipeline value: $45M across 127 opportunities\n• Weighted pipeline: $18M with probability adjustments\n• Average deal size: $354K (up 12% from last quarter)\n• Sales cycle: 87 days average\n\nPerformance by Segment:\n• Enterprise: $28M pipeline, 35% win rate\n• Mid-Market: $12M pipeline, 52% win rate\n• SMB: $5M pipeline, 68% win rate\n\nKey Insights:\n• Strong momentum in healthcare and financial services\n• Competitive win rate improving with new positioning\n• Upsell opportunities identified in existing accounts\n\nAction Items:\n• Sales Team: Focus on top 20 enterprise deals\n• Sales Ops: Implement improved forecasting tools\n• Marketing: Develop vertical-specific content\n• Executives: Engage in strategic customer meetings\n\nForecast: On track to exceed Q4 revenue targets by 8%.",
      8: "HR Policy Updates Summary:\n\nPolicy Changes:\n• Updated remote work guidelines for greater flexibility\n• Enhanced parental leave benefits (16 weeks paid)\n• New professional development budget: $2K per employee\n• Revised performance review process and timeline\n\nEmployee Feedback:\n• Strong positive response to flexibility improvements\n• Requests for additional mental health resources\n• Interest in expanded learning and development programs\n\nCompliance Updates:\n• New labor regulations incorporated\n• Data privacy policy updates completed\n• Workplace safety protocols enhanced\n\nAction Items:\n• HR: Communicate policy changes to all employees\n• Managers: Review updated guidelines with teams\n• Legal: Complete compliance documentation\n• Benefits Team: Update employee handbook\n\nImplementation: New policies effective beginning of next month.",
      9: "Operations Efficiency Workshop Summary:\n\nWorkshop Focus:\n• Process optimization and automation opportunities\n• Cross-functional workflow improvements\n• Technology tools evaluation and selection\n• Cost reduction initiatives\n\nKey Findings:\n• 30% of manual tasks can be automated\n• Average process cycle time can be reduced by 25%\n• Communication bottlenecks identified in 5 key workflows\n• Opportunity for $500K annual cost savings\n\nImprovement Initiatives:\n• Implement workflow automation platform\n• Standardize cross-departmental processes\n• Establish efficiency metrics and dashboards\n• Create continuous improvement team\n\nAction Items:\n• Operations: Develop automation implementation plan\n• IT: Evaluate and procure workflow tools\n• Department Heads: Identify process improvement champions\n• Finance: Model cost-benefit analysis\n\nExpected Impact: 20% efficiency improvement within 6 months."
    };

    const summary = summaries[selectedMeetingIndex] || "Meeting Summary:\n\nThis meeting covered important topics relevant to business operations and strategic initiatives. Key discussion points included team alignment, decision-making on critical issues, and action item assignments. Participants engaged constructively and made progress on organizational objectives. Follow-up actions were documented and assigned to appropriate owners with clear deadlines.";

    setTimeout(() => {
      setIsGeneratingSummary(false);
      setFullSummary(summary);
      streamText(summary);
    }, 2000);
  };

  const streamText = (text: string) => {
    let currentIndex = 0;
    const streamInterval = 20;

    const stream = () => {
      if (currentIndex < text.length) {
        setDisplayedSummary(text.substring(0, currentIndex + 1));
        currentIndex++;
        streamingTimeoutRef.current = setTimeout(stream, streamInterval);
      }
    };

    stream();
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-700';
      case 'neutral':
        return 'bg-gray-100 text-gray-700';
      case 'negative':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Card */}
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
          <Video className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Video className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            Meeting Summary for John CEO
          </h3>
        </div>
      </div>

      {/* Agent Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Teams Meeting Summary Agent</h4>
            <p className="text-sm text-gray-600 mt-0.5">AI-powered meeting analysis for John CEO</p>
          </div>
          <div className="text-sm text-gray-500">
            {meetings.length} meetings available
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left Column - Your Recent Meetings with Scrolling */}
        <div className="flex flex-col relative">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-sm md:text-base font-semibold text-gray-900">Your Recent Meetings</h3>
            <span className="text-xs text-gray-500">{meetings.length} meetings</span>
          </div>

          {/* Scrollable container with fixed max-height */}
          <div
            ref={containerRef}
            className="space-y-3 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scroll-smooth"
            role="list"
            aria-label="Recent meetings list"
          >
            {meetings.map((meeting, index) => (
              <div
                key={index}
                ref={(el) => (meetingRefs.current[index] = el)}
                onClick={() => handleMeetingClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleMeetingClick(index);
                  }
                }}
                tabIndex={0}
                role="listitem"
                aria-selected={selectedMeetingIndex === index}
                className={`bg-white rounded-lg border p-3 md:p-4 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  selectedMeetingIndex === index
                    ? 'border-green-500 shadow-md scale-[1.02]'
                    : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Video className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900 truncate">{meeting.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ml-2 ${getSentimentColor(meeting.sentiment)}`}>
                    {meeting.sentiment}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {meeting.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {meeting.attendees} attendees
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-2">{meeting.time}</div>
              </div>
            ))}
          </div>

          {/* Scroll to Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="absolute bottom-4 right-4 w-10 h-10 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center z-10 animate-fade-in"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Right Column - Meeting Summary */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 flex flex-col p-6 min-h-[300px] max-h-[500px] overflow-y-auto scrollbar-thin">
          {selectedMeetingIndex !== null ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 rounded bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-gray-900 break-words">
                    {meetings[selectedMeetingIndex].name}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {meetings[selectedMeetingIndex].duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {meetings[selectedMeetingIndex].attendees} attendees
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {meetings[selectedMeetingIndex].time}
                  </div>
                </div>
              </div>

              {/* AI Summary Section */}
              {(isGeneratingSummary || displayedSummary || fullSummary) && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    AI-Generated Summary
                  </div>

                  {isGeneratingSummary ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">Analyzing meeting transcript...</span>
                      </div>
                      <div className="space-y-2 animate-pulse">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg border border-green-200 p-4">
                      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {displayedSummary}
                        {displayedSummary.length < fullSummary.length && (
                          <span className="inline-block w-1 h-4 bg-green-600 ml-0.5 animate-pulse"></span>
                        )}
                      </p>
                    </div>
                  )}

                  {!isGeneratingSummary && displayedSummary && displayedSummary.length === fullSummary.length && (
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                        Export Summary
                      </button>
                      <button
                        onClick={generateSummary}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                      >
                        Regenerate
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Generate Button */}
              {!isGeneratingSummary && !displayedSummary && !fullSummary && (
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={generateSummary}
                    disabled={isGeneratingSummary}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                    Generate AI Summary
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Video className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Select a meeting to view summary
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Use arrow keys or click to navigate
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
