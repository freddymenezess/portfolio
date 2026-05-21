import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import SectionTitle from '@/components/common/SectionTitle'

const galleryImages = [
  {
    id: 1,
    title: "Studying Session",
    category: "school",
    src: "school.jpg",
  },
  {
    id: 2,
    title: "Studying Session",
    category: "school",
    src: "school2.jpg",
  },
  {
    id: 3,
    title: "Studying Session",
    category: "school",
    src: "school3.jpg",
  },
  { id: 4, title: "Home Office", category: "work", src: "home.jpg" },
  { id: 5, title: "Home Office", category: "work", src: "home2.jpg" },
];

export default function Gallery() {
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <section id="gallery" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t.gallery.title} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          {t.gallery.subtitle}
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 md:grid-rows-2" // ← adiciona grid-rows-2
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelectedImage(index)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                index === 0 ? "col-span-2 row-span-2" : "row-span-1" // ← row-span-1 explícito
              }`}
            >
              <div className="w-full h-full min-h-45">
                {" "}
                {/* ← min-h garante altura mínima */}
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay — igual ao original */}
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-foreground font-medium">
                  {image.title}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-video bg-gradient-to-br from-muted to-card rounded-2xl flex items-center justify-center"
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                className="w-full h-full object-cover"
              />

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-foreground font-medium">
                  {galleryImages[selectedImage].title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
