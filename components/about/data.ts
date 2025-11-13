export interface TeamMember {
  name: string;
  role: string;
  description: string;
  social: string;
  handle: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Sarabjeet Singh",
    role: "CEO & Founder",
    description: "Experienced finance professional with a passion for leveraging technology to deliver real impact—where access to credit and support matters most.",
    social: "twitter",
    handle: "eazrsingh",
    image: "/images/about/SarabjeetSingh.jpg",
  },
  {
    name: "Vibhav Patil",
    role: "CMO & Co-Founder",
    description: "A passionate marketing expert focused on using insight, creativity, and technology to build brands that connect deeply and scale with purpose.",
    social: "twitter",
    handle: "vaibhavpatil",
    image: "/images/about/VibhavPatil.jpg",
  },
  {
    name: "Hitesh Ahuja",
    role: "CTO",
    description: "A technology leader driven by purpose, building systems that are scalable, secure, and designed to solve real-world problems at speed.",
    social: "twitter",
    handle: "hiteshahuja",
    image: "/images/about/HiteshAhuja.jpg",
  },
  {
    name: "Manish Rabhadia",
    role: "COO",
    description: "An operations expert focused on building reliable systems, efficient processes, and teams that execute with clarity, speed, and accountability.",
    social: "twitter",
    handle: "manishrabhadia",
    image: "/images/about/ManishRabhadia.png",
  },
  {
    name: "Faisal Hussain",
    role: "CBO",
    description: "A natural relationship-builder and sharp business mind, focused on creating meaningful partnerships, unlocking value, and driving long-term growth.",
    social: "twitter",
    handle: "faisalhussain",
    image: "/images/about/FaisalHussain.png",
  },
  {
    name: "Kunnjal Sarabjeet Muddar",
    role: "CCO",
    description: "A customer-first thinker passionate about designing experiences that are intuitive, human, and deeply aligned with what real users need and feel.",
    social: "twitter",
    handle: "kunnjalksm",
    image: "/images/about/GunjanSingh.png",
  },
];

export interface Value {
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    title: "Credit Where It Matters",
    description: "We provide credit for healthcare, education, and everyday essentials—not luxuries. We step in where traditional finance steps away.",
  },
  {
    title: "Purpose, Not Paperwork",
    description: "We believe access shouldn't require endless documentation. Our process is designed to be simple, fast, and human.",
  },
  {
    title: "Built on Responsibility",
    description: "We're here to fix what's broken—credit where it's needed, not where it's easiest. We stand by what we create.",
  },
];
