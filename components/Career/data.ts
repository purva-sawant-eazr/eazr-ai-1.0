export interface JobOpening {
  title: string;
  type: string;
  location: string;
  description: string;
}

export const jobOpenings: JobOpening[] = [
  {
    title: "AI Workflow Specialist",
    type: "Full-time",
    location: "Remote",
    description:
      "Design and optimize AI-driven workflows to enhance credit assessment processes and improve operational efficiency.",
  },
  {
    title: "Backend Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "Build scalable backend systems and APIs that power EAZR's credit platform, ensuring high performance and reliability.",
  },
  {
    title: "Data Analyst",
    type: "Full-time",
    location: "Remote",
    description:
      "Transform complex financial data into actionable insights that drive product decisions and improve user outcomes.",
  },
];

export interface WhyEazrValue {
  title: string;
  description: string;
  gradient: string;
}

export const whyEazrValues: WhyEazrValue[] = [
  {
    title: "Powered by People",
    description:
      "Leveraging the collective skills, creativity, and dedication of individuals to drive innovation and success.",
    gradient: "from-[#028678] to-[#00A896]",
  },
  {
    title: "Inspire and Provoke",
    description:
      "Encouraging new ideas and challenging the status quo to drive growth and transformation.",
    gradient: "from-[#00A896] to-[#05665B]",
  },
  {
    title: "Driven by Purpose",
    description:
      "We bring together passionate people who believe in making credit simple, fair, and accessible. Every skill, idea, and effort here fuels impact that touches lives at scale.",
    gradient: "from-[#05665B] to-[#028678]",
  },
  {
    title: "Think Bold, Act Smarter",
    description:
      "We challenge norms, question limits, and craft solutions that redefine how finance works. Your ideas here don't just get heard — they get built.",
    gradient: "from-[#028678] to-[#00A896]",
  },
];
