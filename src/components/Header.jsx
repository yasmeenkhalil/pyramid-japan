import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import logo from "../../public/assets/images/logo1.jpg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [

  { name: "Home", path: "/" },
  { name: "Export", path: "/Export" },
  { name: "Construction", path: "/construction" },
  { name: "Agriculture", path: "/agricultural" },
  { name: "Maintenance", path: "/maintenance" },
  { name: "Contact", path: "/contact" },

  ];

  return (
    <header
      className="
      sticky
      top-0
      z-50
      bg-white/95
      backdrop-blur-md
      border-b
      border-slate-200
      "
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-[78px] flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
          >
            <img
              src={logo}
              alt="Pyramid Japan CO,LTD"
              className="
                w-14
                h-14
                rounded-xl
                object-cover
              "
            />

            <div>
              <h1
                className="
                  text-lg
                  md:text-l
                  font-bold
                  tracking-wide
                  text-[#111827]
                  leading-none
                "
              >
                PYRAMID JAPAN CO.LTD
              </h1>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-slate-500
                  mt-1
                "
              >
                Used Equipment & Spare Parts
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            className="
              hidden
              lg:flex
              items-center
              gap-6
            "
          >
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  relative
                  font-medium
                  transition-all
                  duration-300
                  ${
                    location.pathname === item.path
                      ? "text-[#E0B15A]"
                      : "text-slate-700 hover:text-[#E0B15A]"
                  }
                `}
              >
                {item.name}

                {location.pathname === item.path && (
                  <span
                    className="
                      absolute
                      -bottom-[28px]
                      left-0
                      w-full
                      h-[3px]
                      bg-[#E0B15A]
                      rounded-full
                    "
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div
            className="
              hidden
              lg:flex
              items-center
              gap-4
            "
          >
            {/* SEARCH */}
            <div
              className="
                flex
                items-center
                w-[280px]
                h-11
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                transition-all
                focus-within:border-amber-500
              "
            >
              <Search
                className="
                  w-4
                  h-4
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Search by Model, Maker or Stock No"
                className="
                  flex-1
                  ml-3
                  bg-transparent
                  outline-none
                  text-sm
                  placeholder:text-slate-400
                "
              />
            </div>

            {/* CTA */}
            <button
              className="
                h-11
                px-5
                rounded-xl
                bg-[#E0B15A]
                text-white
                font-semibold
                hover:bg-[#C47B36]
                transition-all
                duration-300
                shadow-sm
              "
            >
              Register
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              lg:hidden
              p-2
              text-slate-700
            "
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          className="
            lg:hidden
            border-t
            border-slate-200
            bg-white
          "
        >
          <div className="p-5">
  <nav className="flex flex-col gap-2">
    {navLinks.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        onClick={() => setIsOpen(false)}
        className={`
          px-4
          py-3
          rounded-xl
          transition-all
          ${
            location.pathname === item.path
              ? "bg-[#C47B36]/10 text-[#C47B36] font-semibold"
              : "text-slate-700 hover:bg-slate-50 hover:text-[#C47B36]"
          }
        `}
      >
        {item.name}
      </Link>
    ))}
  </nav>

  <div className="mt-5">
    <button
      className="
        w-full
        h-11
        rounded-xl
        bg-[#C47B36]
        text-white
        font-semibold
        hover:bg-[#A86428]
        transition-all
      "
    >
      Register
    </button>
  </div>
</div>
        </div>
      )}
    </header>
  );
}