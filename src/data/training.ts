export interface TrainingProgram {
  label: string;
  key: string;
}

export interface LearningArea {
  label: string;
  key: string;
  body: string;
}

export const TRAINING_PROGS: TrainingProgram[] = [
  { label: '🚀 ZeAI Skill-Up – On Campus', key: 'skillup' },
  { label: '🌍 Global Immersion Program', key: 'gip' },
  { label: '🏆 Hackathon 2026', key: 'hack' },
  { label: '👩‍💼 Connect with Kirthika', key: 'kirthika' },
];

export const LEARN_AREAS: LearningArea[] = [
  {
    label: 'AI & Machine Learning',
    key: 'aiml',
    body: 'AI & Machine Learning learning area focuses on helping students understand intelligent technologies and build knowledge in Artificial Intelligence and Machine Learning concepts.<br><br><strong>Students can explore:</strong><br>• AI fundamentals<br>• Machine Learning concepts<br>• Data-driven solutions<br>• Intelligent application development',
  },
  {
    label: 'Full Stack Development',
    key: 'fsd',
    body: 'Full Stack Development learning area helps students understand the process of building complete web applications.<br><br><strong>Students can explore:</strong><br>• Front-end development<br>• Back-end development<br>• Database concepts<br>• Building web-based applications',
  },
  {
    label: 'QA Automation',
    key: 'qa',
    body: 'QA Automation learning area helps students understand software testing processes and automation concepts.<br><br><strong>Students can explore:</strong><br>• Software Testing Fundamentals<br>• Test Automation Concepts<br>• Quality Assurance Practices<br>• Automation-based testing approaches',
  },
  {
    label: 'Cloud & Infrastructure',
    key: 'cloud',
    body: 'Cloud & Infrastructure learning area helps students understand how modern applications are deployed, managed, and scaled using cloud technologies.<br><br><strong>Students can explore:</strong><br>• Basics of Cloud Computing<br>• Cloud Deployment Concepts<br>• Infrastructure Management<br>• Application Hosting & Scalability',
  },
];

export const HACK_DOMAINS: string[] = [
  'Artificial Intelligence & Automation',
  'Healthcare & MedTech',
  'Smart Education',
  'Women Safety & Social Impact',
  'Cybersecurity',
  'FinTech & Digital Economy',
  'Smart Mobility & Logistics',
  'Sustainability & Climate Tech',
  'Bharat & Regional Languages',
];
