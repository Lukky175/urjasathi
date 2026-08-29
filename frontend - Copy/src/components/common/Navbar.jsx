import { useState } from "react";
import { LayoutDashboard, LogIn, Menu, Moon, Sun, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const NAV_LINKS = [
{
label: "Home",
path: "/home",
},
{
label: "FAQ",
path: "/faq",
},
{
label: "Contact Us",
path: "/contact",
},
];

function Navbar() {
const [isMenuOpen, setIsMenuOpen] = useState(false);

const { theme, toggle } = useTheme();
const { status } = useAuth();

const isAuthenticated = status === "authenticated";

const closeMenu = () => {
setIsMenuOpen(false);
};

return ( <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/90 backdrop-blur-xl"> <nav
     aria-label="Main navigation"
     className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
   >
{/* Logo */} <NavLink
       to="/home"
       onClick={closeMenu}
       className="group flex shrink-0 items-center gap-3"
       aria-label="UrjaSathi Home"
     > <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl"> <img
           src="/logos/urjasathi-logo.svg"
           alt="UrjaSathi"
           className="h-full w-full object-contain"
         /> </div>

      <div className="hidden sm:block">
        <span className="block text-lg font-bold leading-none tracking-tight text-text">
          UrjaSathi
        </span>

        <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted">
          Smart Energy
        </span>
      </div>
    </NavLink>

    {/* Desktop Navigation */}
    <div className="hidden items-center gap-1 md:flex">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            [
              "rounded-xl px-4 py-2.5 text-sm font-medium",
              "transition-colors duration-200",
              isActive
                ? "bg-primary-tint text-primary"
                : "text-text-secondary hover:bg-surface-2 hover:text-text",
            ].join(" ")
          }
        >
          {link.label}
        </NavLink>
      ))}

      {isAuthenticated && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            [
              "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium",
              "transition-colors duration-200",
              isActive
                ? "bg-primary-tint text-primary"
                : "text-text-secondary hover:bg-surface-2 hover:text-text",
            ].join(" ")
          }
        >
          <LayoutDashboard
            size={16}
            strokeWidth={2}
          />

          Dashboard
        </NavLink>
      )}
    </div>

    {/* Desktop Actions */}
    <div className="hidden items-center gap-2 md:flex">
      <button
        type="button"
        onClick={toggle}
        aria-label={
          theme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
        title={
          theme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
        className="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-colors duration-200 hover:bg-surface-2 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        {theme === "dark" ? (
          <Sun
            size={18}
            strokeWidth={2}
          />
        ) : (
          <Moon
            size={18}
            strokeWidth={2}
          />
        )}
      </button>

      {isAuthenticated ? (
        <NavLink
          to="/dashboard"
          className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-dark"
        >
          <LayoutDashboard
            size={16}
            strokeWidth={2}
          />

          Dashboard
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          className="flex h-10 items-center gap-2 rounded-xl bg-action px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-action-dark"
        >
          <LogIn
            size={16}
            strokeWidth={2}
          />

          Login
        </NavLink>
      )}
    </div>

    {/* Mobile Actions */}
    <div className="flex items-center gap-1 md:hidden">
      <button
        type="button"
        onClick={toggle}
        aria-label={
          theme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
        className="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-colors duration-200 hover:bg-surface-2 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        {theme === "dark" ? (
          <Sun
            size={18}
            strokeWidth={2}
          />
        ) : (
          <Moon
            size={18}
            strokeWidth={2}
          />
        )}
      </button>

      <button
        type="button"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-colors duration-200 hover:bg-surface-2 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        {isMenuOpen ? (
          <X
            size={20}
            strokeWidth={2}
          />
        ) : (
          <Menu
            size={20}
            strokeWidth={2}
          />
        )}
      </button>
    </div>
  </nav>

  {/* Mobile Navigation */}
  {isMenuOpen && (
    <div className="border-t border-border bg-surface md:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={closeMenu}
            className={({ isActive }) =>
              [
                "rounded-xl px-4 py-3 text-sm font-medium",
                "transition-colors duration-200",
                isActive
                  ? "bg-primary-tint text-primary"
                  : "text-text-secondary hover:bg-surface-2 hover:text-text",
              ].join(" ")
            }
          >
            {link.label}
          </NavLink>
        ))}

        {isAuthenticated && (
          <NavLink
            to="/dashboard"
            onClick={closeMenu}
            className={({ isActive }) =>
              [
                "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium",
                "transition-colors duration-200",
                isActive
                  ? "bg-primary-tint text-primary"
                  : "text-text-secondary hover:bg-surface-2 hover:text-text",
              ].join(" ")
            }
          >
            <LayoutDashboard
              size={17}
              strokeWidth={2}
            />

            Dashboard
          </NavLink>
        )}

        <div className="mt-2 border-t border-border pt-3">
          {isAuthenticated ? (
            <NavLink
              to="/dashboard"
              onClick={closeMenu}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-dark"
            >
              <LayoutDashboard
                size={17}
                strokeWidth={2}
              />

              Open Dashboard
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={closeMenu}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-action px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-action-dark"
            >
              <LogIn
                size={17}
                strokeWidth={2}
              />

              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )}
</header>

);
}

export default Navbar;
