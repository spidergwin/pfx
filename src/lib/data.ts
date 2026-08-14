export interface CourseData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  enrolledCount: number;
  durationHours: number;
  totalChapters: number;
  totalQuizzes: number;
  totalExams: number;
  bestseller: boolean;
  skillsGained: string[];
  chapters: {
    title: string;
    lessons: {
      title: string;
      durationMins: number;
      isFreePreview: boolean;
    }[];
  }[];
}

export const PFX_COURSE: CourseData = {
  id: "nfi-masterclass-30-days",
  slug: "new-forex-industry-masterclass",
  title: "New Forex Industry Masterclass in 30 Days for Beginners",
  subtitle: "Master Price Action, Institutional Risk Management & Profitability",
  description:
    "This Specialization is an introduction to mastering the global foreign exchange market. Learn price action, risk management, market structure, candlestick patterns, and trade execution strategies directly from New Forex Industry (NFI). The course will be delivered directly to your email upon purchase.",
  price: 50.0,
  originalPrice: 80.0,
  rating: 4.8,
  enrolledCount: 5458,
  durationHours: 10,
  totalChapters: 30,
  totalQuizzes: 50,
  totalExams: 2,
  bestseller: true,
  skillsGained: [
    "Technical Analysis",
    "Risk Management",
    "Price Action Strategy",
    "Market Structure",
    "Risk-to-Reward Ratio",
    "Candlestick Patterns",
    "Lot Size Calculation",
    "Trading Psychology",
  ],
  chapters: [
    {
      title: "Module 1: Foundations of Forex Trading",
      lessons: [
        { title: "Introduction to Financial Markets & Currency Pairs", durationMins: 15, isFreePreview: true },
        { title: "Understanding Pips, Spread & Market Quotes", durationMins: 20, isFreePreview: true },
        { title: "Lot Sizes, Leverage & Capital Protection", durationMins: 25, isFreePreview: false },
      ],
    },
    {
      title: "Module 2: Technical Analysis & Price Action",
      lessons: [
        { title: "Identifying Key Support & Resistance Zones", durationMins: 30, isFreePreview: false },
        { title: "Market Structure: Uptrends, Downtrends & Consolidation", durationMins: 35, isFreePreview: false },
        { title: "High-Probability Candlestick Signal Candles", durationMins: 40, isFreePreview: false },
      ],
    },
    {
      title: "Module 3: Advanced Risk & Position Sizing",
      lessons: [
        { title: "The Golden 1% Capital Preservation Rule", durationMins: 20, isFreePreview: false },
        { title: "Using the NFI Lot Size Calculator", durationMins: 25, isFreePreview: false },
        { title: "Managing Drawdown & Preserving Capital", durationMins: 30, isFreePreview: false },
      ],
    },
    {
      title: "Module 4: Trade Execution & Strategy Blueprint",
      lessons: [
        { title: "The New Forex Industry Core Entry Setup", durationMins: 45, isFreePreview: false },
        { title: "Live Trade Breakdown & Real-Time Logic", durationMins: 50, isFreePreview: false },
        { title: "Final Blueprint & Graduation Roadmap", durationMins: 30, isFreePreview: false },
      ],
    },
  ],
};

export const INITIAL_COURSES: CourseData[] = [PFX_COURSE];

export const PFX_REVIEWS = [
  {
    name: "Alex Vance",
    role: "Verified Student",
    comment: "The New Forex Industry Masterclass completely changed how I view market structure. The risk management module alone saved my trading account!",
    rating: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Full-Time Trader",
    comment: "Clear, concise, and straight to the point. No fluff, just pure price action logic.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Intermediate Trader",
    comment: "The Lot Size Calculator and Risk Rules are indispensable. Best course investment I have made.",
    rating: 5,
  },
];

export const FAQ_ITEMS = [
  {
    q: "Who is New Forex Industry (NFI)?",
    a: "New Forex Industry (NFI) is a professional trading brand and education academy dedicated to helping students achieve long-term market profitability through disciplined risk management and price action logic.",
  },
  {
    q: "Is this course suitable for complete beginners?",
    a: "Yes! The course begins with fundamental concepts—explaining currency pairs, pips, leverage, and lot sizes—before advancing to complex market structure and price action setups.",
  },
  {
    q: "Do I get lifetime access to the course content?",
    a: "Yes! Once enrolled, you get unlimited lifetime access to all 30 chapters, video lessons, quizzes, and future updates.",
  },
  {
    q: "How will the course be delivered?",
    a: "The course will be delivered directly to your email address and WhatsApp immediately upon enrollment confirmation.",
  },
  {
    q: "How do I access the NFI Lot Size Calculator?",
    a: "The NFI Lot Size Calculator is accessible directly from the navigation bar on our website. It is a free tool to calculate exact standard, mini, and micro lot sizes.",
  },
];

export const BLOG_POSTS = [
  {
    slug: "new-forex-industry-price-action-guide",
    title: "Mastering Price Action: The New Forex Industry Core Framework",
    excerpt: "Learn how to identify high-confluence support and resistance zones without relying on lagging indicators.",
    date: "August 14, 2026",
    author: "New Forex Industry Team",
  },
  {
    slug: "the-1-percent-risk-rule",
    title: "The 1% Risk Rule: How Professional Traders Preserve Capital",
    excerpt: "Discover why position sizing is the single most important factor determining long-term trading survival.",
    date: "August 05, 2026",
    author: "NFI Risk Management",
  },
  {
    slug: "candlestick-anatomy-breakdown",
    title: "Deconstructing Candlestick Anatomy for Entry Precision",
    excerpt: "Understand what pin bars, engulfing candles, and rejection wicks reveal about buyer and seller pressure.",
    date: "July 22, 2026",
    author: "New Forex Industry Team",
  },
];
