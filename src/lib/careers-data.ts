export interface JobListing {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export const jobListings: JobListing[] = [
  {
    slug: "senior-react-developer",
    title: "Senior React Developer",
    department: "Engineering",
    location: "Ho Chi Minh City",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Build modern, high-performance web applications using React, Next.js, and TypeScript. You will lead frontend architecture decisions and mentor junior developers on best practices.",
    requirements: [
      "3+ years of professional experience with React and TypeScript",
      "Strong understanding of Next.js App Router and server-side rendering",
      "Experience with state management solutions (Redux, Zustand, or React Query)",
      "Proficiency in Tailwind CSS and responsive design principles",
      "Familiarity with testing frameworks (Jest, React Testing Library, Playwright)",
      "Good understanding of RESTful APIs and GraphQL",
    ],
    benefits: [
      "Competitive salary and annual performance bonus",
      "Health insurance and wellness allowance",
      "Flexible working hours and hybrid work model",
      "Annual learning budget for courses and conferences",
    ],
  },
  {
    slug: "senior-nodejs-developer",
    title: "Senior Node.js Developer",
    department: "Engineering",
    location: "Ho Chi Minh City",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Design and implement scalable backend services and APIs using Node.js, Express, and modern database technologies. You will drive backend architecture and ensure system reliability.",
    requirements: [
      "3+ years of professional experience with Node.js and Express or NestJS",
      "Strong proficiency in TypeScript and modern JavaScript",
      "Experience with relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases",
      "Familiarity with Docker, CI/CD pipelines, and cloud platforms (AWS, GCP)",
      "Understanding of microservices architecture and message queues",
      "Experience with unit and integration testing",
    ],
    benefits: [
      "Competitive salary and annual performance bonus",
      "Health insurance and wellness allowance",
      "Flexible working hours and hybrid work model",
      "Annual learning budget for courses and conferences",
    ],
  },
  {
    slug: "full-stack-developer",
    title: "Full-Stack Developer",
    department: "Engineering",
    location: "Ho Chi Minh City",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Work across the entire stack to deliver end-to-end features for client projects. You will collaborate closely with designers, project managers, and other engineers to ship quality software.",
    requirements: [
      "2+ years of professional full-stack development experience",
      "Proficiency in React or Vue.js for frontend development",
      "Experience with Node.js, Python, or PHP for backend development",
      "Working knowledge of relational databases and REST API design",
      "Familiarity with Git, code reviews, and agile workflows",
      "Strong problem-solving skills and attention to detail",
    ],
    benefits: [
      "Competitive salary and annual performance bonus",
      "Health insurance and wellness allowance",
      "Flexible working hours and hybrid work model",
      "Annual learning budget for courses and conferences",
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Ho Chi Minh City",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Create intuitive, visually compelling user interfaces and experiences for web and mobile applications. You will own the design process from research and wireframing through to high-fidelity prototypes.",
    requirements: [
      "2+ years of professional UI/UX design experience",
      "Proficiency in Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating user-centered design thinking",
      "Experience with design systems and component libraries",
      "Understanding of accessibility standards (WCAG 2.1)",
      "Basic knowledge of HTML and CSS is a plus",
    ],
    benefits: [
      "Competitive salary and annual performance bonus",
      "Health insurance and wellness allowance",
      "Flexible working hours and hybrid work model",
      "Annual learning budget for courses and conferences",
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Ho Chi Minh City",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Build and maintain CI/CD pipelines, cloud infrastructure, and deployment automation. You will ensure our systems are reliable, scalable, and secure across all environments.",
    requirements: [
      "2+ years of experience in DevOps or site reliability engineering",
      "Strong experience with AWS or GCP cloud services",
      "Proficiency with Docker, Kubernetes, and infrastructure-as-code (Terraform, Pulumi)",
      "Experience building and optimizing CI/CD pipelines (GitHub Actions, GitLab CI)",
      "Familiarity with monitoring and observability tools (Prometheus, Grafana, Datadog)",
      "Understanding of networking, security, and Linux system administration",
    ],
    benefits: [
      "Competitive salary and annual performance bonus",
      "Health insurance and wellness allowance",
      "Flexible working hours and hybrid work model",
      "Annual learning budget for courses and conferences",
    ],
  },
  {
    slug: "qa-engineer",
    title: "QA Engineer",
    department: "Engineering",
    location: "Ho Chi Minh City",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Ensure the quality and reliability of our software products through comprehensive testing strategies. You will design test plans, automate regression tests, and work closely with development teams.",
    requirements: [
      "2+ years of professional QA and software testing experience",
      "Experience with automated testing frameworks (Selenium, Playwright, Cypress)",
      "Strong understanding of SDLC, agile methodologies, and QA best practices",
      "Experience with API testing tools (Postman, Insomnia)",
      "Familiarity with performance testing and security testing concepts",
      "ISTQB certification is a plus",
    ],
    benefits: [
      "Competitive salary and annual performance bonus",
      "Health insurance and wellness allowance",
      "Flexible working hours and hybrid work model",
      "Annual learning budget for courses and conferences",
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    department: "Management",
    location: "Ho Chi Minh City",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Lead software development projects from inception to delivery, ensuring they meet quality standards, timelines, and client expectations. You will manage cross-functional teams and serve as the primary client liaison.",
    requirements: [
      "3+ years of project management experience in software development",
      "Strong knowledge of Agile and Scrum methodologies",
      "Experience with project management tools (Jira, Linear, Asana)",
      "Excellent communication and stakeholder management skills",
      "Understanding of software development processes and technical concepts",
      "PMP or Scrum Master certification is a plus",
    ],
    benefits: [
      "Competitive salary and annual performance bonus",
      "Health insurance and wellness allowance",
      "Flexible working hours and hybrid work model",
      "Annual learning budget for courses and conferences",
    ],
  },
  {
    slug: "business-development-manager",
    title: "Business Development Manager",
    department: "Sales",
    location: "Ho Chi Minh City",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Drive business growth by identifying new opportunities, building client relationships, and expanding our market presence. You will develop strategic partnerships and contribute to revenue targets in international markets.",
    requirements: [
      "3+ years of B2B sales or business development experience, preferably in IT services",
      "Proven track record of meeting or exceeding revenue targets",
      "Strong understanding of IT outsourcing and software development services",
      "Excellent English communication skills, both written and verbal",
      "Experience with CRM tools and sales pipeline management",
      "International business exposure is a strong advantage",
    ],
    benefits: [
      "Competitive salary with attractive commission structure",
      "Health insurance and wellness allowance",
      "Flexible working hours and hybrid work model",
      "Annual learning budget for courses and conferences",
    ],
  },
];
