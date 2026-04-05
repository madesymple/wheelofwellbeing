export const transition = { duration: 0, ease: [0, 0, 0, 0] };
export const variants = {
  hidden: { transform: "translateY(0)", opacity: 1 },
  visible: { transform: "translateY(0)", opacity: 1 },
};
export const cardVariants = {
  hidden: { opacity: 1, transform: "scale(1) rotate(0deg)" },
  visible: { opacity: 1, transform: "scale(1) rotate(0deg)" },
};

export const FAQData: {
  title: string;
  description: string;
}[] = [
  {
    title: "How long does the quiz take?",
    description:
      "The Wheel of Wellbeing quiz takes about 3-5 minutes to complete. It consists of 40 questions across 8 areas of your life, and you'll see your results immediately after finishing.",
  },
  {
    title: "What are the 8 spokes of wellbeing?",
    description:
      "The 8 spokes are Physical, Mental, Emotional, Relational, Financial, Professional, Spiritual, and Environmental wellbeing. Together, they form a complete picture of your life balance.",
  },
  {
    title: "Is the quiz really free?",
    description:
      "Yes! The quiz and your wheel visualization are completely free. You'll see your scores across all 8 areas and get a summary of your strengths and growth areas. The optional paid roadmap goes deeper with personalized action steps.",
  },
  {
    title: "What's in the personalized roadmap?",
    description:
      "The roadmap includes a deep dive into each of your 8 areas, personalized action steps based on your specific answers, cross-area insights, weekly exercises designed by a licensed therapist, and a 30-day priority plan.",
  },
  {
    title: "Who created the Wheel of Wellbeing?",
    description:
      "The Wheel of Wellbeing was developed by Dr. Sadigh, a Licensed Marriage and Family Therapist, drawing on years of clinical experience helping people achieve greater life balance and fulfillment.",
  },
  {
    title: "Can I retake the quiz?",
    description:
      "Absolutely! Your wellbeing is always evolving. We encourage you to retake the quiz periodically to track your progress and see how your wheel changes over time.",
  },
];

export const spokes = [
  {
    name: "Physical",
    description: "Your body, energy, sleep, and physical health",
    color: "#E57373",
    icon: "heart-pulse",
  },
  {
    name: "Mental",
    description: "Your focus, clarity, learning, and cognitive health",
    color: "#64B5F6",
    icon: "brain",
  },
  {
    name: "Emotional",
    description: "Your self-awareness, resilience, and emotional regulation",
    color: "#FFB74D",
    icon: "smile",
  },
  {
    name: "Relational",
    description: "Your relationships, connection, and social support",
    color: "#F06292",
    icon: "users",
  },
  {
    name: "Recreational",
    description: "Your hobbies, leisure, sports, and creative activities",
    color: "#9575CD",
    icon: "palette",
  },
  {
    name: "Environmental",
    description: "Your physical spaces, nature connection, and surroundings",
    color: "#A1887F",
    icon: "leaf",
  },
  {
    name: "Spiritual",
    description: "Your sense of meaning, values, and inner peace",
    color: "#4DB6AC",
    icon: "sparkles",
  },
  {
    name: "Financial",
    description: "Your financial stability, habits, and security",
    color: "#81C784",
    icon: "wallet",
  },
];

export const testimonials = [
  {
    quote:
      "I was shocked to see how unbalanced my life had become. The wheel made it so clear — I was pouring everything into work and neglecting my relationships. The roadmap gave me a concrete plan to fix that.",
    name: "Sarah M.",
    role: "Marketing Director",
  },
  {
    quote:
      "This quiz helped me understand why I was feeling so unfulfilled despite having a great career. My spiritual and emotional scores were much lower than I expected.",
    name: "James K.",
    role: "Software Engineer",
  },
  {
    quote:
      "I've done personality tests before, but nothing that looked at my whole life this way. The visual wheel was eye-opening. I could literally see where I was off balance.",
    name: "Priya R.",
    role: "Graduate Student",
  },
  {
    quote:
      "The personalized roadmap was worth every penny. It wasn't generic advice — it was based on MY specific answers and gave me weekly steps I could actually follow.",
    name: "Michael T.",
    role: "Small Business Owner",
  },
  {
    quote:
      "I took the quiz with my partner and we compared wheels. It sparked the most productive conversation we've had about our life together in years.",
    name: "Emily & David L.",
    role: "Married Couple",
  },
  {
    quote:
      "As a therapist myself, I appreciate the rigor behind this assessment. It's grounded in real clinical frameworks, not pop psychology. I recommend it to my clients.",
    name: "Dr. Anna W.",
    role: "Clinical Psychologist",
  },
];
