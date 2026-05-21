import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/freddymenezess",
    label: "GitHub",
    color: "hover:text-foreground",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/freddymenezess",
    label: "LinkedIn",
    color: "hover:text-[#0077B5]",
  },
  {
    icon: Mail,
    href: "mailto:freddymenezess.dev@gmail.com",
    label: "Email",
    color: "hover:text-primary",
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
    alert("Mensagem enviada com sucesso!");
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t.contact.title} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          {t.contact.subtitle}
        </motion.p>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    {t.contact.form.name}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t.contact.form.namePlaceholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    {t.contact.form.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.contact.form.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    {t.contact.form.message}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={t.contact.form.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t.contact.form.send}
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col items-center lg:items-start justify-center"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6 font-[var(--font-display)]">
                {t.contact.social.title}
              </h3>

              <div className="flex flex-col gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className={`flex items-center gap-3 text-muted-foreground ${social.color} transition-colors group`}
                  >
                    <div className="p-3 rounded-lg bg-background border border-border group-hover:border-primary/50 transition-colors">
                      <social.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
