export interface Company {
  id: string;
  name: string;
  color: string;
  openRoles: number;
  avgMatchScore: number;
  topRole: string;
  hiringTrend: 'up' | 'down' | 'stable';
  recentHires: number;
  founded: number;
  size: string;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyColor: string;
  location: string;
  jobType: string;
  matchScore: number;
  matchReason: string;
  skillsMatched: string[];
  skillsMissing: string[];
  description: string;
  postedDate: string;
  salaryMin: number;
  salaryMax: number;
  experienceLevel: 'Junior' | 'Mid' | 'Senior' | 'Staff' | 'Principal';
  isRemote: boolean;
  techStack: string[];
  applicants: number;
}

export interface ActivityItem {
  id: string;
  type: 'new_job' | 'application' | 'match' | 'company_update';
  title: string;
  description: string;
  timestamp: string;
  relatedJobId?: string;
  relatedCompanyId?: string;
}

export const companies: Company[] = [
{
  id: 'c1',
  name: 'Google',
  color: '#4285F4',
  openRoles: 142,
  avgMatchScore: 82,
  topRole: 'Senior Frontend Engineer',
  hiringTrend: 'up',
  recentHires: 45,
  founded: 1998,
  size: '10,000+',
  description:
  "Organizing the world's information and making it universally accessible and useful."
},
{
  id: 'c2',
  name: 'Meta',
  color: '#0668E1',
  openRoles: 89,
  avgMatchScore: 75,
  topRole: 'React Native Developer',
  hiringTrend: 'stable',
  recentHires: 28,
  founded: 2004,
  size: '10,000+',
  description:
  'Giving people the power to build community and bring the world closer together.'
},
{
  id: 'c3',
  name: 'Stripe',
  color: '#635BFF',
  openRoles: 45,
  avgMatchScore: 91,
  topRole: 'Full Stack Engineer',
  hiringTrend: 'up',
  recentHires: 12,
  founded: 2010,
  size: '5,000-10,000',
  description: 'Financial infrastructure platform for the internet.'
},
{
  id: 'c4',
  name: 'Airbnb',
  color: '#FF5A5F',
  openRoles: 67,
  avgMatchScore: 68,
  topRole: 'UI/UX Engineer',
  hiringTrend: 'down',
  recentHires: 8,
  founded: 2008,
  size: '5,000-10,000',
  description:
  'Community based online platform for listing and renting local homes.'
},
{
  id: 'c5',
  name: 'Netflix',
  color: '#E50914',
  openRoles: 34,
  avgMatchScore: 55,
  topRole: 'Backend Engineer',
  hiringTrend: 'stable',
  recentHires: 15,
  founded: 1997,
  size: '10,000+',
  description:
  'Entertainment services including streaming media and video on demand.'
},
{
  id: 'c6',
  name: 'Shopify',
  color: '#95BF47',
  openRoles: 112,
  avgMatchScore: 88,
  topRole: 'Frontend Developer',
  hiringTrend: 'up',
  recentHires: 32,
  founded: 2006,
  size: '10,000+',
  description:
  'Global commerce company providing trusted tools to start, grow, market, and manage a retail business.'
},
{
  id: 'c7',
  name: 'Spotify',
  color: '#1DB954',
  openRoles: 56,
  avgMatchScore: 45,
  topRole: 'Data Scientist',
  hiringTrend: 'stable',
  recentHires: 18,
  founded: 2006,
  size: '5,000-10,000',
  description:
  'Digital music, podcast, and video service that gives you access to millions of songs and other content.'
},
{
  id: 'c8',
  name: 'Amazon',
  color: '#FF9900',
  openRoles: 320,
  avgMatchScore: 62,
  topRole: 'AWS Solutions Architect',
  hiringTrend: 'up',
  recentHires: 120,
  founded: 1994,
  size: '10,000+',
  description:
  'Multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.'
}];


export const jobs: Job[] = [
{
  id: 'j1',
  title: 'Senior Frontend Engineer',
  companyId: 'c1',
  companyName: 'Google',
  companyColor: '#4285F4',
  location: 'Mountain View, CA (Hybrid)',
  jobType: 'Full-time',
  matchScore: 92,
  matchReason:
  'Strong match on React, TypeScript, and 5+ years of experience.',
  skillsMatched: ['React', 'TypeScript', 'Performance Optimization'],
  skillsMissing: ['GraphQL', 'WebGL'],
  description:
  'We are looking for a Senior Frontend Engineer to join our core search team. You will be responsible for building highly performant, accessible, and beautiful user interfaces that serve billions of users daily.\n\nResponsibilities:\n- Architect and implement complex UI components.\n- Mentor junior engineers and lead technical discussions.\n- Collaborate with design and product teams to deliver exceptional user experiences.',
  postedDate: '2h ago',
  salaryMin: 180000,
  salaryMax: 250000,
  experienceLevel: 'Senior',
  isRemote: false,
  techStack: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
  applicants: 42
},
{
  id: 'j2',
  title: 'Full Stack Engineer',
  companyId: 'c3',
  companyName: 'Stripe',
  companyColor: '#635BFF',
  location: 'Remote',
  jobType: 'Full-time',
  matchScore: 88,
  matchReason: 'Excellent overlap with your Node.js and React background.',
  skillsMatched: ['React', 'Node.js', 'PostgreSQL'],
  skillsMissing: ['Ruby', 'AWS'],
  description:
  'Join Stripe to build the economic infrastructure of the internet. As a Full Stack Engineer, you will work on our core payment APIs and dashboard interfaces used by millions of businesses.\n\nRequirements:\n- 3+ years of experience building scalable web applications.\n- Strong proficiency in modern JavaScript/TypeScript.\n- Experience with relational databases and API design.',
  postedDate: '5h ago',
  salaryMin: 160000,
  salaryMax: 220000,
  experienceLevel: 'Mid',
  isRemote: true,
  techStack: ['React', 'Node.js', 'PostgreSQL', 'Ruby'],
  applicants: 128
},
{
  id: 'j3',
  title: 'Frontend Developer',
  companyId: 'c6',
  companyName: 'Shopify',
  companyColor: '#95BF47',
  location: 'Toronto, ON (Hybrid)',
  jobType: 'Full-time',
  matchScore: 85,
  matchReason: 'Great fit for your e-commerce and React experience.',
  skillsMatched: ['React', 'Redux', 'CSS/Sass'],
  skillsMissing: ['Ruby on Rails', 'Liquid'],
  description:
  'Help make commerce better for everyone. You will be working on the core Shopify admin dashboard, building tools that empower merchants to run their businesses effectively.\n\nWhat you will do:\n- Build robust and scalable frontend features.\n- Write clean, maintainable, and well-tested code.\n- Work closely with UX designers to implement pixel-perfect interfaces.',
  postedDate: '1d ago',
  salaryMin: 130000,
  salaryMax: 180000,
  experienceLevel: 'Mid',
  isRemote: false,
  techStack: ['React', 'Redux', 'Ruby on Rails', 'GraphQL'],
  applicants: 85
},
{
  id: 'j4',
  title: 'React Native Developer',
  companyId: 'c2',
  companyName: 'Meta',
  companyColor: '#0668E1',
  location: 'Menlo Park, CA',
  jobType: 'Full-time',
  matchScore: 76,
  matchReason:
  'Good React knowledge, but missing specific mobile deployment experience.',
  skillsMatched: ['React', 'JavaScript', 'UI/UX'],
  skillsMissing: ['React Native', 'iOS/Android Build Tools'],
  description:
  'Join the team that created React Native. You will be working on the core Facebook app, implementing new features and optimizing performance for billions of users worldwide.\n\nWe are looking for someone who is passionate about mobile development and pushing the boundaries of what is possible with React Native.',
  postedDate: '1d ago',
  salaryMin: 170000,
  salaryMax: 240000,
  experienceLevel: 'Senior',
  isRemote: false,
  techStack: ['React Native', 'JavaScript', 'Objective-C', 'Java'],
  applicants: 210
},
{
  id: 'j5',
  title: 'UI/UX Engineer',
  companyId: 'c4',
  companyName: 'Airbnb',
  companyColor: '#FF5A5F',
  location: 'San Francisco, CA',
  jobType: 'Contract',
  matchScore: 68,
  matchReason:
  'Strong UI skills, but lacking required animation library experience.',
  skillsMatched: ['CSS', 'React', 'Figma'],
  skillsMissing: ['Framer Motion', 'Three.js'],
  description:
  'Airbnb is seeking a UI/UX Engineer to bridge the gap between design and engineering. You will be responsible for creating highly interactive and visually stunning web experiences.\n\nIf you love crafting beautiful animations and have a keen eye for design details, this role is for you.',
  postedDate: '2d ago',
  salaryMin: 140000,
  salaryMax: 190000,
  experienceLevel: 'Mid',
  isRemote: false,
  techStack: ['React', 'CSS', 'Framer Motion', 'Figma'],
  applicants: 56
},
{
  id: 'j6',
  title: 'Backend Engineer',
  companyId: 'c5',
  companyName: 'Netflix',
  companyColor: '#E50914',
  location: 'Los Gatos, CA',
  jobType: 'Full-time',
  matchScore: 52,
  matchReason:
  'Partial match. You have Node.js, but they require Java/Spring Boot.',
  skillsMatched: ['Node.js', 'Microservices'],
  skillsMissing: ['Java', 'Spring Boot', 'Cassandra'],
  description:
  'Help us build the next generation of content delivery systems. As a Backend Engineer at Netflix, you will design and implement highly available, distributed systems that serve millions of concurrent streams.\n\nStrong experience with JVM languages and distributed architecture is required.',
  postedDate: '3d ago',
  salaryMin: 200000,
  salaryMax: 300000,
  experienceLevel: 'Senior',
  isRemote: false,
  techStack: ['Java', 'Spring Boot', 'Cassandra', 'AWS'],
  applicants: 340
},
{
  id: 'j7',
  title: 'Data Scientist',
  companyId: 'c7',
  companyName: 'Spotify',
  companyColor: '#1DB954',
  location: 'New York, NY',
  jobType: 'Full-time',
  matchScore: 35,
  matchReason: 'Weak match. Role requires heavy Python and ML background.',
  skillsMatched: ['SQL', 'Data Visualization'],
  skillsMissing: ['Python', 'Machine Learning', 'TensorFlow'],
  description:
  'Join our personalization team to build the algorithms that power Discover Weekly and Release Radar. You will analyze massive datasets to understand user listening habits and improve our recommendation engines.',
  postedDate: '3d ago',
  salaryMin: 150000,
  salaryMax: 210000,
  experienceLevel: 'Mid',
  isRemote: false,
  techStack: ['Python', 'TensorFlow', 'SQL', 'BigQuery'],
  applicants: 180
},
{
  id: 'j8',
  title: 'AWS Solutions Architect',
  companyId: 'c8',
  companyName: 'Amazon',
  companyColor: '#FF9900',
  location: 'Seattle, WA',
  jobType: 'Full-time',
  matchScore: 42,
  matchReason:
  'Missing core cloud architecture certifications and experience.',
  skillsMatched: ['System Design', 'API Design'],
  skillsMissing: ['AWS Certified', 'Terraform', 'Kubernetes'],
  description:
  'Help enterprise customers migrate to AWS. You will design cloud-native architectures, provide technical guidance, and ensure best practices for security and scalability.',
  postedDate: '4d ago',
  salaryMin: 190000,
  salaryMax: 280000,
  experienceLevel: 'Senior',
  isRemote: false,
  techStack: ['AWS', 'Terraform', 'Kubernetes', 'Python'],
  applicants: 95
},
{
  id: 'j9',
  title: 'Staff Frontend Engineer',
  companyId: 'c1',
  companyName: 'Google',
  companyColor: '#4285F4',
  location: 'Remote',
  jobType: 'Full-time',
  matchScore: 81,
  matchReason:
  'Strong technical fit, but requires more system design experience.',
  skillsMatched: ['React', 'TypeScript', 'Architecture'],
  skillsMissing: ['WebRTC', 'C++'],
  description:
  'Lead frontend architecture for Google Workspace applications. You will set technical direction, mentor senior engineers, and tackle our most complex UI challenges.',
  postedDate: '4d ago',
  salaryMin: 220000,
  salaryMax: 320000,
  experienceLevel: 'Staff',
  isRemote: true,
  techStack: ['React', 'TypeScript', 'WebRTC', 'System Design'],
  applicants: 65
},
{
  id: 'j10',
  title: 'Frontend Engineer, Growth',
  companyId: 'c3',
  companyName: 'Stripe',
  companyColor: '#635BFF',
  location: 'San Francisco, CA',
  jobType: 'Full-time',
  matchScore: 95,
  matchReason: 'Perfect match for your A/B testing and React skills.',
  skillsMatched: ['React', 'A/B Testing', 'Analytics'],
  skillsMissing: ['Figma'],
  description:
  'Join the Growth team to optimize our conversion funnels and onboarding flows. You will run experiments, analyze data, and implement high-impact UI changes.',
  postedDate: '5d ago',
  salaryMin: 150000,
  salaryMax: 210000,
  experienceLevel: 'Mid',
  isRemote: false,
  techStack: ['React', 'TypeScript', 'Optimizely', 'Amplitude'],
  applicants: 110
},
{
  id: 'j11',
  title: 'Web Developer',
  companyId: 'c6',
  companyName: 'Shopify',
  companyColor: '#95BF47',
  location: 'Remote',
  jobType: 'Contract',
  matchScore: 72,
  matchReason: 'Good match, but they use Vue.js for this specific team.',
  skillsMatched: ['JavaScript', 'HTML/CSS', 'Git'],
  skillsMissing: ['Vue.js', 'Nuxt'],
  description:
  'Build marketing pages and promotional campaigns for Shopify. Fast-paced environment requiring quick turnaround times and pixel-perfect implementation.',
  postedDate: '5d ago',
  salaryMin: 100000,
  salaryMax: 140000,
  experienceLevel: 'Junior',
  isRemote: true,
  techStack: ['Vue.js', 'Nuxt', 'HTML/CSS', 'JavaScript'],
  applicants: 250
},
{
  id: 'j12',
  title: 'Product Engineer',
  companyId: 'c4',
  companyName: 'Airbnb',
  companyColor: '#FF5A5F',
  location: 'Remote',
  jobType: 'Full-time',
  matchScore: 89,
  matchReason:
  'Excellent match for your product-minded engineering approach.',
  skillsMatched: ['React', 'TypeScript', 'Product Strategy'],
  skillsMissing: ['GraphQL'],
  description:
  'Work at the intersection of engineering, design, and product. You will own end-to-end feature development for our core booking flow.',
  postedDate: '6d ago',
  salaryMin: 160000,
  salaryMax: 230000,
  experienceLevel: 'Senior',
  isRemote: true,
  techStack: ['React', 'TypeScript', 'GraphQL', 'Node.js'],
  applicants: 145
},
{
  id: 'j13',
  title: 'Machine Learning Engineer',
  companyId: 'c2',
  companyName: 'Meta',
  companyColor: '#0668E1',
  location: 'Menlo Park, CA',
  jobType: 'Full-time',
  matchScore: 28,
  matchReason: 'Role is outside your core frontend/fullstack expertise.',
  skillsMatched: ['Python'],
  skillsMissing: ['PyTorch', 'Computer Vision', 'C++'],
  description:
  'Develop state-of-the-art computer vision models for Instagram. Deep expertise in deep learning and PyTorch required.',
  postedDate: '1w ago',
  salaryMin: 200000,
  salaryMax: 300000,
  experienceLevel: 'Senior',
  isRemote: false,
  techStack: ['Python', 'PyTorch', 'C++', 'CUDA'],
  applicants: 88
},
{
  id: 'j14',
  title: 'Frontend Infrastructure Engineer',
  companyId: 'c5',
  companyName: 'Netflix',
  companyColor: '#E50914',
  location: 'Los Gatos, CA',
  jobType: 'Full-time',
  matchScore: 65,
  matchReason:
  'Good React skills, but missing deep build tooling experience.',
  skillsMatched: ['React', 'Performance'],
  skillsMissing: ['Webpack', 'Rollup', 'CI/CD'],
  description:
  'Build the tools that empower hundreds of UI engineers at Netflix. You will work on our custom bundlers, testing frameworks, and deployment pipelines.',
  postedDate: '1w ago',
  salaryMin: 180000,
  salaryMax: 260000,
  experienceLevel: 'Senior',
  isRemote: false,
  techStack: ['React', 'Webpack', 'Node.js', 'Jenkins'],
  applicants: 75
},
{
  id: 'j15',
  title: 'Developer Advocate',
  companyId: 'c8',
  companyName: 'Amazon',
  companyColor: '#FF9900',
  location: 'Remote',
  jobType: 'Full-time',
  matchScore: 78,
  matchReason:
  'Great communication and tech skills, missing some AWS specifics.',
  skillsMatched: ['Public Speaking', 'Technical Writing', 'JavaScript'],
  skillsMissing: ['AWS Serverless', 'Go'],
  description:
  'Inspire and educate developers building on AWS. You will create content, speak at conferences, and gather feedback to improve our developer experience.',
  postedDate: '1w ago',
  salaryMin: 150000,
  salaryMax: 220000,
  experienceLevel: 'Mid',
  isRemote: true,
  techStack: ['AWS', 'JavaScript', 'Go', 'Python'],
  applicants: 130
}];


export const activityFeed: ActivityItem[] = [
{
  id: 'a1',
  type: 'new_job',
  title: '3 new jobs at Google',
  description: 'Including Senior Frontend Engineer (92% match)',
  timestamp: '2 mins ago',
  relatedJobId: 'j1',
  relatedCompanyId: 'c1'
},
{
  id: 'a2',
  type: 'match',
  title: 'New Strong Match',
  description: 'Stripe posted a Full Stack Engineer role (88% match)',
  timestamp: '1 hour ago',
  relatedJobId: 'j2',
  relatedCompanyId: 'c3'
},
{
  id: 'a3',
  type: 'application',
  title: 'Application Viewed',
  description: 'Shopify viewed your application for Frontend Developer',
  timestamp: '3 hours ago',
  relatedJobId: 'j3',
  relatedCompanyId: 'c6'
},
{
  id: 'a4',
  type: 'company_update',
  title: 'Amazon is hiring',
  description: 'Amazon just opened 120 new roles this week',
  timestamp: '1 day ago',
  relatedCompanyId: 'c8'
},
{
  id: 'a5',
  type: 'application',
  title: 'Application Submitted',
  description: 'You applied to Product Engineer at Airbnb',
  timestamp: '2 days ago',
  relatedJobId: 'j12',
  relatedCompanyId: 'c4'
}];