import { FileText, File, Clock, User, ArrowUp, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { DocumentData } from '../utils/mockDataGenerator';

interface DocumentSummaryTabProps {
  metrics: {
    totalAccessed: number;
    totalCreated: number;
    totalModified: number;
    totalShared: number;
  };
  data: DocumentData[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

export default function DocumentSummaryTab({ metrics }: DocumentSummaryTabProps) {
  const [selectedDocIndex, setSelectedDocIndex] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [displayedSummary, setDisplayedSummary] = useState('');
  const [fullSummary, setFullSummary] = useState('');
  const docRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const documents = [
    {
      name: 'Executive Summary Q4 2024.docx',
      size: '3.2 MB',
      owner: 'CEO Office',
      time: '1 hour ago',
      type: 'document',
    },
    {
      name: 'Strategic Investment Analysis.xlsx',
      size: '5.8 MB',
      owner: 'Strategy Team',
      time: '3 hours ago',
      type: 'spreadsheet',
    },
    {
      name: 'Board Presentation Q4.pptx',
      size: '12.4 MB',
      owner: 'CEO Office',
      time: '2 days ago',
      type: 'presentation',
    },
    {
      name: 'Annual Financial Report 2024.pdf',
      size: '8.3 MB',
      owner: 'Finance Department',
      time: '3 days ago',
      type: 'document',
    },
    {
      name: 'Marketing Strategy Proposal.docx',
      size: '2.1 MB',
      owner: 'Marketing Team',
      time: '5 days ago',
      type: 'document',
    },
    {
      name: 'Product Roadmap 2025.pptx',
      size: '15.7 MB',
      owner: 'Product Team',
      time: '1 week ago',
      type: 'presentation',
    },
    {
      name: 'Q3 Performance Metrics.xlsx',
      size: '4.2 MB',
      owner: 'Analytics Team',
      time: '1 week ago',
      type: 'spreadsheet',
    },
    {
      name: 'Employee Handbook 2024.pdf',
      size: '6.5 MB',
      owner: 'HR Department',
      time: '2 weeks ago',
      type: 'document',
    },
    {
      name: 'Competitive Analysis Report.docx',
      size: '3.9 MB',
      owner: 'Strategy Team',
      time: '2 weeks ago',
      type: 'document',
    },
    {
      name: 'IT Infrastructure Plan.pptx',
      size: '18.2 MB',
      owner: 'IT Department',
      time: '3 weeks ago',
      type: 'presentation',
    },
    {
      name: 'Sales Pipeline Q4.xlsx',
      size: '7.1 MB',
      owner: 'Sales Team',
      time: '3 weeks ago',
      type: 'spreadsheet',
    },
    {
      name: 'Legal Compliance Review.pdf',
      size: '5.4 MB',
      owner: 'Legal Department',
      time: '1 month ago',
      type: 'document',
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
      if (selectedDocIndex === null && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        setSelectedDocIndex(0);
        return;
      }

      if (selectedDocIndex !== null) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = Math.min(selectedDocIndex + 1, documents.length - 1);
          setSelectedDocIndex(nextIndex);
          scrollToDocument(nextIndex);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = Math.max(selectedDocIndex - 1, 0);
          setSelectedDocIndex(prevIndex);
          scrollToDocument(prevIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDocIndex, documents.length]);

  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  const scrollToDocument = (index: number) => {
    docRefs.current[index]?.scrollIntoView({
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

  const handleDocumentClick = (index: number) => {
    setSelectedDocIndex(index);
    setDisplayedSummary('');
    setFullSummary('');
    setIsGeneratingSummary(false);
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
    }
  };

  const generateSummary = () => {
    if (selectedDocIndex === null) return;

    setIsGeneratingSummary(true);
    setDisplayedSummary('');
    setFullSummary('');

    const summaries: Record<number, string> = {
      0: "Executive Summary Q4 2024 - This comprehensive document outlines the company's strategic performance for Q4. Key highlights include 15% revenue growth, successful market expansion into three new regions, and significant operational improvements. The summary emphasizes digital transformation initiatives that resulted in 22% cost reduction. Strategic priorities for the upcoming quarter include scaling successful marketing campaigns, advancing AI integration projects, and strengthening partnerships with key industry players.",
      1: "Strategic Investment Analysis - Detailed evaluation of potential acquisition and investment opportunities. The analysis covers TechCorp acquisition with $145M valuation, market positioning assessment, competitive landscape review, and financial projections showing 92% strategic fit score. Recommendations include proceeding with due diligence, developing integration roadmap, and securing board approval for capital allocation.",
      2: "Board Presentation Q4 - Comprehensive presentation for board meeting covering executive summary, financial performance with 15% YoY growth, strategic initiatives progress, market expansion results, operational metrics, risk assessment, and forward-looking strategy for 2025. Includes detailed slides on customer acquisition, revenue projections, and competitive positioning.",
      3: "Annual Financial Report 2024 - Complete financial overview including income statements, balance sheets, cash flow analysis, and comprehensive notes. Highlights 18% revenue growth, improved profit margins, successful cost management initiatives, and strong cash position. Includes auditor's report, management discussion and analysis, and future financial outlook.",
      4: "Marketing Strategy Proposal - Forward-looking marketing plan focusing on digital channels, content marketing, brand positioning, and customer engagement strategies. Proposes $2M budget allocation for multi-channel campaigns with projected 150% ROI. Includes target audience analysis, competitive positioning, and detailed execution timeline.",
      5: "Product Roadmap 2025 - Strategic product development plan outlining new features, platform enhancements, AI integration opportunities, and customer-requested improvements. Timeline spans Q1-Q4 2025 with phased rollout approach. Includes resource requirements, technical dependencies, and expected business impact for each initiative.",
      6: "Q3 Performance Metrics - Comprehensive analytics report covering KPIs across all business units. Shows strong performance in sales (23% increase), customer satisfaction (Net Promoter Score: 72), operational efficiency (8% improvement), and employee engagement (85% satisfaction rate). Includes trend analysis and recommendations for continuous improvement.",
      7: "Employee Handbook 2024 - Updated company policies, procedures, benefits information, and workplace guidelines. Covers organizational culture, code of conduct, compensation and benefits, professional development opportunities, work-life balance initiatives, and compliance requirements. Includes resources for employee support and career growth.",
      8: "Competitive Analysis Report - In-depth market research examining key competitors, market trends, competitive advantages, and strategic positioning. Analyzes pricing strategies, product differentiation, market share dynamics, and emerging threats. Provides strategic recommendations for maintaining competitive edge and identifying growth opportunities.",
      9: "IT Infrastructure Plan - Technology roadmap detailing cloud migration strategy, cybersecurity enhancements, network optimization, and system modernization initiatives. Includes budget projections, implementation timeline, risk mitigation strategies, and expected improvements in system reliability, security posture, and operational efficiency.",
      10: "Sales Pipeline Q4 - Detailed analysis of sales opportunities across all regions and product lines. Total pipeline value: $45M with weighted probability analysis. Breaks down opportunities by stage, expected close dates, deal size, and competitive positioning. Includes win/loss analysis and recommendations for pipeline acceleration.",
      11: "Legal Compliance Review - Comprehensive assessment of regulatory compliance status across all jurisdictions. Covers data privacy (GDPR, CCPA), financial regulations, employment law, intellectual property protection, and contractual obligations. Identifies compliance gaps, provides remediation recommendations, and outlines ongoing compliance monitoring framework."
    };

    const summary = summaries[selectedDocIndex] || "This document contains important information and analysis relevant to strategic decision-making. Key sections include executive overview, detailed findings, data analysis, recommendations, and implementation considerations. The document provides valuable insights for informed business decisions and strategic planning.";

    setTimeout(() => {
      setIsGeneratingSummary(false);
      setFullSummary(summary);
      streamText(summary);
    }, 2000);
  };

  const streamText = (text: string) => {
    let currentIndex = 0;
    const streamInterval = 25;

    const stream = () => {
      if (currentIndex < text.length) {
        setDisplayedSummary(text.substring(0, currentIndex + 1));
        currentIndex++;
        streamingTimeoutRef.current = setTimeout(stream, streamInterval);
      }
    };

    stream();
  };

  const getFileIcon = (type: string) => {
    return <File className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Card */}
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            Document Summary for John CEO
          </h3>
        </div>
      </div>

      {/* Agent Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Document Summary Agent</h4>
            <p className="text-sm text-gray-600 mt-0.5">AI-powered document analysis for John CEO</p>
          </div>
          <div className="text-sm text-gray-500">
            {documents.length} documents available
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left Column - Your Documents */}
        <div className="flex flex-col relative">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-sm md:text-base font-semibold text-gray-900">Your Documents</h3>
            <span className="text-xs text-gray-500">{documents.length} files</span>
          </div>
          <div
            ref={containerRef}
            className="space-y-3 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scroll-smooth"
            role="list"
            aria-label="Document list"
          >
            {documents.map((doc, index) => (
              <div
                key={index}
                ref={(el) => (docRefs.current[index] = el)}
                onClick={() => handleDocumentClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleDocumentClick(index);
                  }
                }}
                tabIndex={0}
                role="listitem"
                aria-selected={selectedDocIndex === index}
                className={`bg-white rounded-lg border p-3 md:p-4 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  selectedDocIndex === index
                    ? 'border-green-500 shadow-md scale-[1.02]'
                    : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate mb-1">{doc.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{doc.size}</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {doc.owner}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3" />
                      {doc.time}
                    </div>
                  </div>
                </div>
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

        {/* Right Column - Document Preview */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 flex flex-col p-6 min-h-[300px] max-h-[600px] overflow-y-auto scrollbar-thin">
          {selectedDocIndex !== null ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                  {getFileIcon(documents[selectedDocIndex].type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-gray-900 break-words">
                    {documents[selectedDocIndex].name}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>{documents[selectedDocIndex].size}</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {documents[selectedDocIndex].owner}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3" />
                    {documents[selectedDocIndex].time}
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
                        <span className="text-sm text-gray-600">Analyzing document...</span>
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
                        Download Summary
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
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Select a document to view summary
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
