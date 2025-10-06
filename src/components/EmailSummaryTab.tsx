import { Mail, Clock, User, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { EmailData } from '../utils/mockDataGenerator';

interface EmailSummaryTabProps {
  metrics: {
    totalSent: number;
    totalReceived: number;
    totalPriority: number;
    avgResponseRate: number;
    avgSentiment: number;
  };
  data: EmailData[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

export default function EmailSummaryTab({ metrics }: EmailSummaryTabProps) {
  const [selectedEmailIndex, setSelectedEmailIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReply, setGeneratedReply] = useState('');
  const [displayedReply, setDisplayedReply] = useState('');
  const emailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const emails = [
    {
      from: 'Board of Directors',
      subject: 'Q4 Board Meeting Preparation Required',
      preview: 'Dear CEO, we need to prepare for the upcoming Q4 board meeting. Please provide the executive summary, financial projections, and strategic initiatives...',
      time: '2 hours ago',
      priority: 'high',
    },
    {
      from: 'Investment Committee',
      subject: 'Strategic Investment Opportunity - TechCorp Acquisition',
      preview: 'We have identified a strategic acquisition opportunity with TechCorp. Their valuation is $145M with annual revenue of $12M. The strategic fit score is 92...',
      time: '4 hours ago',
      priority: 'high',
    },
    {
      from: 'CFO',
      subject: 'Budget Review and Financial Forecast Update',
      preview: 'Quarterly financial review shows 15% revenue growth. We need to discuss allocation for the upcoming expansion projects...',
      time: '5 hours ago',
      priority: 'medium',
    },
    {
      from: 'Head of Operations',
      subject: 'Supply Chain Optimization Initiative',
      preview: 'Our new supply chain management system has reduced costs by 8%. Proposing additional automation investments...',
      time: '6 hours ago',
      priority: 'medium',
    },
    {
      from: 'Marketing Director',
      subject: 'Q1 Marketing Campaign Results',
      preview: 'Campaign exceeded targets with 125% ROI. Customer acquisition cost decreased by 22%. Ready to scale...',
      time: '8 hours ago',
      priority: 'low',
    },
    {
      from: 'Legal Department',
      subject: 'Contract Review - Partnership Agreement',
      preview: 'The partnership agreement with Global Tech has been reviewed. A few minor amendments are recommended before signing...',
      time: '10 hours ago',
      priority: 'medium',
    },
    {
      from: 'HR Director',
      subject: 'Executive Leadership Development Program',
      preview: 'Proposing a new leadership development initiative for senior management. Investment required: $250K annually...',
      time: '1 day ago',
      priority: 'low',
    },
    {
      from: 'CTO',
      subject: 'Technology Roadmap 2025',
      preview: 'Prepared the comprehensive technology roadmap for next year. Focus areas: AI integration, cloud migration, cybersecurity...',
      time: '1 day ago',
      priority: 'high',
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedEmailIndex === null && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        setSelectedEmailIndex(0);
        return;
      }

      if (selectedEmailIndex !== null) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = Math.min(selectedEmailIndex + 1, emails.length - 1);
          setSelectedEmailIndex(nextIndex);
          scrollToEmail(nextIndex);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = Math.max(selectedEmailIndex - 1, 0);
          setSelectedEmailIndex(prevIndex);
          scrollToEmail(prevIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEmailIndex, emails.length]);

  const scrollToEmail = (index: number) => {
    emailRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  const handleEmailClick = (index: number) => {
    setSelectedEmailIndex(index);
    setGeneratedReply('');
    setDisplayedReply('');
    setIsGenerating(false);
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
    }
  };

  const generateAIReply = () => {
    if (selectedEmailIndex === null) return;

    setIsGenerating(true);
    setGeneratedReply('');
    setDisplayedReply('');

    const aiResponses: Record<number, string> = {
      0: "Thank you for the reminder regarding the Q4 board meeting preparation. I will ensure all materials are compiled and ready for review by end of week. The executive summary will include our strategic initiatives, updated financial projections with the 15% growth trajectory, and key performance metrics. I'll schedule a pre-meeting briefing with the leadership team to align on messaging and address any anticipated questions. Looking forward to presenting our progress and strategic direction.",
      1: "Thank you for bringing this strategic opportunity to my attention. The TechCorp acquisition presents compelling synergies with our growth strategy. A 92% strategic fit score and their revenue profile align well with our expansion goals. I'd like to schedule a deep-dive session with the Investment Committee next week to review the due diligence findings, integration roadmap, and ROI projections. Please prepare the detailed financial models and risk assessment for our discussion.",
      2: "Excellent work on the quarterly financial review. The 15% revenue growth demonstrates strong momentum across our business units. I'd like to discuss the allocation strategy for expansion projects in our next executive meeting. Please prepare scenarios for investment prioritization, including expected ROI timelines and resource requirements. Let's ensure we're balancing growth initiatives with operational efficiency targets.",
      3: "Congratulations on achieving an 8% cost reduction through the new supply chain system. This is a significant operational improvement. I'm interested in understanding the automation investment proposal in more detail. Please prepare a business case outlining the expected additional savings, implementation timeline, and any risks or dependencies. Let's schedule time to review this with the finance team to evaluate capital allocation.",
      4: "Outstanding results on the Q1 marketing campaign. A 125% ROI and 22% reduction in customer acquisition cost exceed our targets significantly. I fully support scaling this initiative. Please develop a comprehensive scaling plan that includes budget requirements, team resources, market expansion strategy, and expected growth projections. Let's discuss how we can replicate this success across other market segments.",
      5: "Thank you for the thorough contract review. Please send me the marked-up version with the recommended amendments for my review. I'd like to schedule a call with you and our business development team to discuss the implications and ensure alignment on the partnership terms. Once we've addressed the amendments, we can proceed with final approvals and signature.",
      6: "I appreciate the proposal for the Executive Leadership Development Program. Investing in our senior management team's growth is a strategic priority. The $250K annual investment is reasonable given the expected impact. Please prepare a detailed program outline including curriculum, expected outcomes, success metrics, and ROI framework. Let's discuss this in our next leadership planning session.",
      7: "Thank you for preparing the comprehensive technology roadmap for 2025. The focus on AI integration, cloud migration, and cybersecurity aligns perfectly with our digital transformation objectives. I'd like to schedule an in-depth review session with you and the executive team to discuss implementation priorities, resource allocation, and expected business impact. Please prepare a phased rollout plan with key milestones and dependencies."
    };

    const fullReply = aiResponses[selectedEmailIndex] || "Thank you for your email. I've reviewed the contents and will provide a detailed response shortly. Please let me know if you need any immediate clarification or have urgent concerns that require immediate attention.";

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReply(fullReply);
      streamText(fullReply);
    }, 2000);
  };

  const streamText = (text: string) => {
    let currentIndex = 0;
    const streamInterval = 30;

    const stream = () => {
      if (currentIndex < text.length) {
        setDisplayedReply(text.substring(0, currentIndex + 1));
        currentIndex++;
        streamingTimeoutRef.current = setTimeout(stream, streamInterval);
      }
    };

    stream();
  };

  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Card */}
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            Email Summary for John CEO
          </h3>
        </div>
      </div>

      {/* Agent Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Email Summary Agent</h4>
            <p className="text-sm text-gray-600 mt-0.5">AI-powered email management for John CEO</p>
          </div>
          <div className="text-sm text-gray-500">
            {metrics.totalPriority} priority • {metrics.avgResponseRate}% response rate
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left Column - Your Inbox */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-sm md:text-base font-semibold text-gray-900">Your Inbox</h3>
            <span className="text-xs text-gray-500">{emails.length} emails</span>
          </div>
          <div
            ref={containerRef}
            className="space-y-3 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scroll-smooth"
            role="list"
            aria-label="Email inbox"
          >
            {emails.map((email, index) => (
              <div
                key={index}
                ref={(el) => (emailRefs.current[index] = el)}
                onClick={() => handleEmailClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleEmailClick(index);
                  }
                }}
                tabIndex={0}
                role="listitem"
                aria-selected={selectedEmailIndex === index}
                className={`bg-white rounded-lg border p-3 md:p-4 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedEmailIndex === index
                    ? 'border-blue-500 shadow-md scale-[1.02]'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{email.from}</span>
                  </div>
                  {email.priority === 'high' && (
                    <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 font-medium">
                      high
                    </span>
                  )}
                  {email.priority === 'medium' && (
                    <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 font-medium">
                      medium
                    </span>
                  )}
                  {email.priority === 'low' && (
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium">
                      low
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{email.subject}</h4>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{email.preview}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {email.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Email Preview */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 flex flex-col p-6 min-h-[300px] max-h-[600px] overflow-y-auto scrollbar-thin">
          {selectedEmailIndex !== null ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-base font-semibold text-gray-900">
                      {emails[selectedEmailIndex].from}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {emails[selectedEmailIndex].subject}
                  </h2>
                </div>
                {emails[selectedEmailIndex].priority === 'high' && (
                  <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 font-medium flex-shrink-0">
                    high
                  </span>
                )}
                {emails[selectedEmailIndex].priority === 'medium' && (
                  <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-medium flex-shrink-0">
                    medium
                  </span>
                )}
                {emails[selectedEmailIndex].priority === 'low' && (
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 font-medium flex-shrink-0">
                    low
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {emails[selectedEmailIndex].time}
              </div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {emails[selectedEmailIndex].preview}
              </div>

              {/* AI Reply Section */}
              {(isGenerating || displayedReply || generatedReply) && (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    AI-Generated Reply
                  </div>

                  {isGenerating ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">Generating intelligent response...</span>
                      </div>
                      <div className="space-y-2 animate-pulse">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg border border-blue-200 p-4">
                      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {displayedReply}
                        {displayedReply.length < generatedReply.length && (
                          <span className="inline-block w-1 h-4 bg-blue-600 ml-0.5 animate-pulse"></span>
                        )}
                      </p>
                    </div>
                  )}

                  {!isGenerating && displayedReply && displayedReply.length === generatedReply.length && (
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                        Send Reply
                      </button>
                      <button className="flex-1 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                        Edit
                      </button>
                      <button
                        onClick={generateAIReply}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                      >
                        Regenerate
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Generate Button */}
              {!isGenerating && !displayedReply && !generatedReply && (
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={generateAIReply}
                    disabled={isGenerating}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                    Generate AI Reply
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Mail className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Select an email to view details
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
