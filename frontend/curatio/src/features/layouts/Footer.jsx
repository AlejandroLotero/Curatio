import { Facebook, Twitter, Instagram, X, Youtube } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
  { label: "X", href: "https://x.com/", icon: X },
  { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/", icon: Youtube },
];

const Footer = () => {
  return (
    <footer className="w-full mt-10">
      <div className="bg-white/80 text-label">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center justify-center rounded-full p-1 transition hover:text-primary"
                >
                  <Icon className="size-4 md:size-5" />
                </a>
              ))}
            </div>

            <a
              href="servicioalcliente@curatio.com"
              className="text-small md:text-[1.1rem] font-body transition hover:text-primary"
            >
              servicioalcliente@curatio.com
            </a>
          </div>
        </div>
      </div>

      <div className="bg-primarybtnbg/80 text-primarybtntext">
        <div className="mx-auto max-w-7xl px-4 py-3 text-mostsmall md:text-small">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="font-body text-center md:text-left">
              © CURATIO 2026
            </p>

            <nav
              aria-label="Enlaces legales"
              className="font-body text-center md:text-right"
            >
              <a href="#" className="transition hover:text-brand-hover">
                Design Web
              </a>
              <span className="px-2">|</span>
              <a href="#" className="transition hover:text-brand-hover">
                PQRS
              </a>
              <span className="px-2">|</span>
              <a href="#" className="transition hover:text-brand-hover">
                Aviso legal
              </a>
              <span className="px-2">|</span>
              <a href="#" className="transition hover:text-brand-hover">
                Politica de privacidad
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
