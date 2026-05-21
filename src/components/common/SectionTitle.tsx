import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  className?: string
}

export default function SectionTitle({ title, className = '' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-center gap-4 mb-12 md:mb-16 ${className}`}
    >
      {/* Left line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-px bg-gradient-to-r from-transparent via-border to-border flex-1 max-w-[100px] md:max-w-[200px]"
      />
      
      {/* Title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-[var(--font-display)] text-center whitespace-nowrap">
        <span className="text-primary">{'{'}</span>
        <span className="mx-2">{title}</span>
        <span className="text-primary">{'}'}</span>
      </h2>
      
      {/* Right line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-px bg-gradient-to-l from-transparent via-border to-border flex-1 max-w-[100px] md:max-w-[200px]"
      />
    </motion.div>
  )
}
