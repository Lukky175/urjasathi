import {
ArrowUp,
BriefcaseBusiness,
Camera,
Code2,
Mail,
MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const FOOTER_LINKS = {
Platform: [
{
label: "Home",
path: "/home",
},
{
label: "Dashboard",
path: "/dashboard",
},
{
label: "FAQ",
path: "/faq",
},
],
Support: [
{
label: "Contact Us",
path: "/contact",
},
{
label: "Login",
path: "/login",
},
],
};

const SOCIAL_LINKS = [
{
label: "GitHub",
icon: Code2,
href: "#",
},
{
label: "LinkedIn",
icon: BriefcaseBusiness,
href: "#",
},
{
label: "Twitter",
icon: Mail,
href: "#",
},
{
label: "Instagram",
icon: Camera,
href: "#",
},
];

function Footer() {
const currentYear = new Date().getFullYear();

const scrollToTop = () => {
window.scrollTo({
top: 0,
behavior: "smooth",
});
};

return ( <footer className="border-t border-border bg-surface"> <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"> <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
{/* Brand */} <div className="max-w-sm"> <Link
           to="/home"
           className="inline-flex items-center gap-3"
         > <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl"> <img
               src="/logo/urjasathi-logo.svg"
               alt="UrjaSathi"
               className="h-full w-full object-contain"
             /> </div>


          <div>
            <span className="block text-lg font-bold leading-none text-text">
              UrjaSathi
            </span>

            <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Smart Energy
            </span>
          </div>
        </Link>

        <p className="mt-5 text-sm leading-6 text-text-secondary">
          Intelligent energy management for smarter electricity
          consumption, solar generation, battery optimization, and
          renewable energy utilization.
        </p>

        <div className="mt-6 flex items-center gap-2">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                title={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors duration-200 hover:border-primary hover:bg-primary-tint hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <Icon
                  size={16}
                  strokeWidth={2}
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* Platform Links */}
      <div>
        <h3 className="text-sm font-semibold text-text">
          Platform
        </h3>

        <ul className="mt-4 space-y-3">
          {FOOTER_LINKS.Platform.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Support Links */}
      <div>
        <h3 className="text-sm font-semibold text-text">
          Support
        </h3>

        <ul className="mt-4 space-y-3">
          {FOOTER_LINKS.Support.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-sm font-semibold text-text">
          Get in touch
        </h3>

        <div className="mt-4 space-y-4">
          <div className="flex items-start gap-3">
            <Mail
              size={17}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0 text-primary"
            />

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Email
              </p>

              <a
                href="mailto:hello@urjasathi.in"
                className="mt-1 block text-sm text-text-secondary transition-colors hover:text-primary"
              >
                hello@urjasathi.in
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin
              size={17}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0 text-primary"
            />

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Built for
              </p>

              <p className="mt-1 text-sm leading-5 text-text-secondary">
                Sustainable energy management across India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-text-muted">
        © {currentYear} UrjaSathi. Built for a smarter, sustainable
        energy future.
      </p>

      <button
        type="button"
        onClick={scrollToTop}
        className="inline-flex items-center gap-2 self-start text-xs font-medium text-text-secondary transition-colors duration-200 hover:text-primary sm:self-auto"
      >
        Back to top

        <ArrowUp
          size={14}
          strokeWidth={2}
        />
      </button>
    </div>
  </div>
</footer>


);
}

export default Footer;
