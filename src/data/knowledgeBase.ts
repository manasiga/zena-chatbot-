export interface MenuItem {
  label: string;
  key: string;
}

export interface KBEntry {
  m: string[];
  a: string;
}

export const MENU: MenuItem[] = [
  { label: '🛠 Explore Services', key: 'services' },
  { label: '🎓 Training Programs', key: 'training' },
  { label: '🤝 Business Collaboration', key: 'collab' },
  { label: '💬 Other Enquiries', key: 'enquiry' },
];

export const FALLBACK_WORDS: string[] = [
  'eat', 'food', 'drink', 'weather', 'joke', 'movie', 'game', 'sport',
  'football', 'cricket', 'love', 'marry', 'baby', 'pet', 'sleep',
  'what time', 'who are you',
];

export const KB: KBEntry[] = [
  {
    m: ['price', 'pricing', 'cost', 'fee', 'charge', 'budget'],
    a: "Our pricing is tailored to each project's scope and complexity. We offer fixed-price, T&M, and dedicated team models. Please connect with our team for a free consultation.",
  },
  {
    m: ['contact', 'reach', 'call', 'email', 'phone'],
    a: 'You can reach ZeAI Soft via email at <strong>hello@zeaisoft.com</strong> or WhatsApp at <strong>+91-XXXXXXXXXX</strong>. Our team responds within 2 business hours.',
  },
  {
    m: ['location', 'office', 'city', 'based', 'headquarters', 'address'],
    a: 'ZeAI Soft is headquartered in India with delivery centres in Chennai and Bengaluru. We serve clients across 25+ countries globally.',
  },
  {
    m: ['timeline', 'long', 'fast', 'quick', 'deliver', 'duration', 'time'],
    a: 'MVPs typically take 4–8 weeks, enterprise platforms 4–6 months. We use agile sprints so you see progress every 2 weeks.',
  },
  {
    m: ['support', 'maintain', 'after', 'post', 'help', 'issue'],
    a: 'We offer 24/7 support for enterprise clients and business-hours support for startup plans. All projects include a 3-month post-launch support window.',
  },
  {
    m: ['tech', 'stack', 'technology', 'language', 'framework', 'tool'],
    a: 'We work with React, Next.js, Node.js, Python, Go, Flutter, AWS, Azure, GCP, Kubernetes, and cutting-edge AI frameworks.',
  },
  {
    m: ['ai', 'machine learning', 'llm', 'gpt', 'artificial intelligence'],
    a: 'Our AI practice covers LLM integration, fine-tuning, computer vision, NLP pipelines, and MLOps across healthcare, fintech, and manufacturing.',
  },
  {
    m: ['intern', 'internship', 'job', 'career', 'hiring', 'opening'],
    a: 'ZeAI Soft regularly offers internship and job opportunities across engineering, AI, and design. Please connect with our team and share your resume for the latest openings.',
  },
  {
    m: ['about', 'company', 'zeai', 'who are'],
    a: 'ZeAI Soft is an AI & technology company specializing in custom software, EdTech, BeautyTech, AI services, and product engineering. We help businesses and students achieve their technology goals.',
  },
  {
    m: ['service', 'offer', 'provide', 'solution'],
    a: 'ZeAI Soft offers: Custom Software Development, Product Engineering, EdTech Solutions, BeautyTech Solutions, AI Services & Manufacturing, and IT & AI Infrastructure Support.',
  },
];
