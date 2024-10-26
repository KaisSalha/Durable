import { Github, Twitter, Linkedin, Mail, Rss } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    label: "github",
    href: "https://github.com/kaissalha",
    icon: Github,
  },
  {
    label: "twitter",
    href: "https://twitter.com/kaissalha",
    icon: Twitter,
  },
  {
    label: "linkedin",
    href: "https://linkedin.com/in/kaissalha",
    icon: Linkedin,
  },
  {
    label: "email",
    href: "mailto:kaiss.salha@gmail.com",
    icon: Mail,
  },
];

export const Footer = () => {
  return (
    <footer className="mt-auto py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
            >
              <link.icon className="h-4 w-4" />
              <span>/{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
