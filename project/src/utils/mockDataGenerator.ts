// Mock data generator for date-based dashboard filtering
// Generates realistic data variations across a 60-day period

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface EmailData {
  date: string;
  sent: number;
  received: number;
  priority: number;
  responseRate: number;
  sentiment: number;
}

export interface DocumentData {
  date: string;
  accessed: number;
  created: number;
  modified: number;
  shared: number;
}

export interface MeetingData {
  date: string;
  count: number;
  duration: number;
  attendees: number;
  sentiment: string;
}

export interface AnalyticsData {
  date: string;
  productivity: number;
  collaboration: number;
  efficiency: number;
}

// Generate email data for a date range
export const generateEmailData = (startDate: Date, endDate: Date): EmailData[] => {
  const data: EmailData[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Lower activity on weekends
    const baseActivity = isWeekend ? 0.3 : 1;

    data.push({
      date: currentDate.toISOString().split('T')[0],
      sent: Math.floor((Math.random() * 50 + 30) * baseActivity),
      received: Math.floor((Math.random() * 80 + 60) * baseActivity),
      priority: Math.floor((Math.random() * 15 + 5) * baseActivity),
      responseRate: Math.floor((85 + Math.random() * 15) * (isWeekend ? 0.7 : 1)),
      sentiment: Math.floor(75 + Math.random() * 20),
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

// Generate document data for a date range
export const generateDocumentData = (startDate: Date, endDate: Date): DocumentData[] => {
  const data: DocumentData[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseActivity = isWeekend ? 0.2 : 1;

    data.push({
      date: currentDate.toISOString().split('T')[0],
      accessed: Math.floor((Math.random() * 200 + 150) * baseActivity),
      created: Math.floor((Math.random() * 30 + 10) * baseActivity),
      modified: Math.floor((Math.random() * 80 + 40) * baseActivity),
      shared: Math.floor((Math.random() * 40 + 20) * baseActivity),
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

// Generate meeting data for a date range
export const generateMeetingData = (startDate: Date, endDate: Date): MeetingData[] => {
  const data: MeetingData[] = [];
  const currentDate = new Date(startDate);
  const sentiments = ['positive', 'neutral'];

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseActivity = isWeekend ? 0.1 : 1;

    data.push({
      date: currentDate.toISOString().split('T')[0],
      count: Math.floor((Math.random() * 8 + 3) * baseActivity),
      duration: Math.floor((Math.random() * 60 + 45) * baseActivity),
      attendees: Math.floor((Math.random() * 6 + 4) * baseActivity),
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

// Generate analytics data for a date range
export const generateAnalyticsData = (startDate: Date, endDate: Date): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    data.push({
      date: currentDate.toISOString().split('T')[0],
      productivity: Math.floor((80 + Math.random() * 20) * (isWeekend ? 0.6 : 1)),
      collaboration: Math.floor((70 + Math.random() * 25) * (isWeekend ? 0.5 : 1)),
      efficiency: Math.floor((75 + Math.random() * 20) * (isWeekend ? 0.6 : 1)),
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

// Aggregate data for a date range
export const aggregateEmailData = (data: EmailData[]): {
  totalSent: number;
  totalReceived: number;
  totalPriority: number;
  avgResponseRate: number;
  avgSentiment: number;
} => {
  if (data.length === 0) {
    return {
      totalSent: 0,
      totalReceived: 0,
      totalPriority: 0,
      avgResponseRate: 0,
      avgSentiment: 0,
    };
  }

  const totals = data.reduce((acc, day) => ({
    sent: acc.sent + day.sent,
    received: acc.received + day.received,
    priority: acc.priority + day.priority,
    responseRate: acc.responseRate + day.responseRate,
    sentiment: acc.sentiment + day.sentiment,
  }), { sent: 0, received: 0, priority: 0, responseRate: 0, sentiment: 0 });

  return {
    totalSent: totals.sent,
    totalReceived: totals.received,
    totalPriority: totals.priority,
    avgResponseRate: Math.round(totals.responseRate / data.length),
    avgSentiment: Math.round(totals.sentiment / data.length),
  };
};

export const aggregateDocumentData = (data: DocumentData[]): {
  totalAccessed: number;
  totalCreated: number;
  totalModified: number;
  totalShared: number;
} => {
  if (data.length === 0) {
    return {
      totalAccessed: 0,
      totalCreated: 0,
      totalModified: 0,
      totalShared: 0,
    };
  }

  return data.reduce((acc, day) => ({
    totalAccessed: acc.totalAccessed + day.accessed,
    totalCreated: acc.totalCreated + day.created,
    totalModified: acc.totalModified + day.modified,
    totalShared: acc.totalShared + day.shared,
  }), { totalAccessed: 0, totalCreated: 0, totalModified: 0, totalShared: 0 });
};

export const aggregateMeetingData = (data: MeetingData[]): {
  totalMeetings: number;
  avgDuration: number;
  avgAttendees: number;
  sentimentBreakdown: { positive: number; neutral: number };
} => {
  if (data.length === 0) {
    return {
      totalMeetings: 0,
      avgDuration: 0,
      avgAttendees: 0,
      sentimentBreakdown: { positive: 0, neutral: 0 },
    };
  }

  const totals = data.reduce((acc, day) => {
    const sentimentCount = day.sentiment === 'positive' ? { positive: 1, neutral: 0 } : { positive: 0, neutral: 1 };
    return {
      count: acc.count + day.count,
      duration: acc.duration + day.duration,
      attendees: acc.attendees + day.attendees,
      positive: acc.positive + sentimentCount.positive,
      neutral: acc.neutral + sentimentCount.neutral,
    };
  }, { count: 0, duration: 0, attendees: 0, positive: 0, neutral: 0 });

  return {
    totalMeetings: totals.count,
    avgDuration: Math.round(totals.duration / data.length),
    avgAttendees: Math.round(totals.attendees / data.length),
    sentimentBreakdown: {
      positive: totals.positive,
      neutral: totals.neutral,
    },
  };
};

export const aggregateAnalyticsData = (data: AnalyticsData[]): {
  avgProductivity: number;
  avgCollaboration: number;
  avgEfficiency: number;
} => {
  if (data.length === 0) {
    return {
      avgProductivity: 0,
      avgCollaboration: 0,
      avgEfficiency: 0,
    };
  }

  const totals = data.reduce((acc, day) => ({
    productivity: acc.productivity + day.productivity,
    collaboration: acc.collaboration + day.collaboration,
    efficiency: acc.efficiency + day.efficiency,
  }), { productivity: 0, collaboration: 0, efficiency: 0 });

  return {
    avgProductivity: Math.round(totals.productivity / data.length),
    avgCollaboration: Math.round(totals.collaboration / data.length),
    avgEfficiency: Math.round(totals.efficiency / data.length),
  };
};

// Filter data by date range
export const filterDataByDateRange = <T extends { date: string }>(
  data: T[],
  startDate: Date,
  endDate: Date
): T[] => {
  const start = startDate.toISOString().split('T')[0];
  const end = endDate.toISOString().split('T')[0];

  return data.filter(item => item.date >= start && item.date <= end);
};

// Format date for display
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit', year: '2-digit' };
  const start = startDate.toLocaleDateString('en-US', options);
  const end = endDate.toLocaleDateString('en-US', options);
  return `${start} - ${end}`;
};
