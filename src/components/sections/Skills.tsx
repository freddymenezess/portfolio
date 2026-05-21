import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/common/SectionTitle";

const skills = {
  frontend: [
    { name: "Javascript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" },
    { name: "Redux Toolkit", icon: "redux" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Tailwind CSS", icon: "tailwind" },
  ],
  backend: [
    { name: "Node.js", icon: "nodejs" },
    { name: "Express", icon: "express" },
    { name: "Python", icon: "python" },
    { name: "MySQL", icon: "mysql" },
    { name: "PostgreSQL", icon: "postgresql" },
  ],
  tools: [
    { name: "Git", icon: "git" },
    { name: "Github", icon: "github" },
    { name: "Figma", icon: "figma" },
    { name: "Postman", icon: "postman" },
    { name: "Prisma", icon: "prisma" },
    { name: "Linux", icon: "ubuntu" },
  ],
};

export default function Skills() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const SkillCard = ({ skill }: { skill: { name: string; icon: string } }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-2 rounded-xl transition-colors duration-200 cursor-default"
    >
      <img
        src={`https://skillicons.dev/icons?i=${skill.icon}`}
        alt={skill.name}
        width={40}
        height={40}
        className="w-9 h-9 md:w-10 md:h-10"
      />
      <span className="text-xs text-muted-foreground font-medium text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );

  const SkillGroup = ({
    label,
    items,
  }: {
    label: string;
    items: { name: string; icon: string }[];
  }) => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="space-y-5"
    >
      <h3 className="text-lg md:text-xl font-semibold text-primary font-[var(--font-display)] flex items-center gap-1">
        <span className="w-2 h-2 bg-primary rounded-full" />
        {label}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {items.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t.skills.title} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          <SkillGroup
            label={t.skills.categories.frontend}
            items={skills.frontend}
          />
          <SkillGroup
            label={t.skills.categories.backend}
            items={skills.backend}
          />
          <SkillGroup label={t.skills.categories.tools} items={skills.tools} />
        </div>
      </div>
    </section>
  );
}
