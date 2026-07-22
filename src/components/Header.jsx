import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Menu, X, LogOut, ShieldCheck, User } from "lucide-react";
import logo from "../../public/assets/images/logo1.jpg";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import { createPortal } from "react-dom";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    async function fetchAuthSession() {
      try {
        const response = await fetch("/api/auth/session", { credentials: "include" });

        if (response.ok && isMounted) {
          const data = await response.json();

          if (data && Object.keys(data).length > 0) {
            setSession(data);
            setStatus("authenticated");
          } else {
            setSession(null);
            setStatus("unauthenticated");
          }
        } else if (isMounted) {
          setSession(null);
          setStatus("unauthenticated");
        }
      } catch (error) {
        if (isMounted) {
          setSession(null);
          setStatus("unauthenticated");
        }
      }
    }

    fetchAuthSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      const csrfResponse = await fetch("/api/auth/csrf", {
        credentials: "include",
      });

      const csrfData = await csrfResponse.json();

      await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          csrfToken: csrfData.csrfToken,
          callbackUrl: "/",
        }),
      });

    } catch (error) {
      console.error(error);
    } finally {
      setSession(null);
      setStatus("unauthenticated");
      window.location.href = "/";
    }
  };

  const handleAuthSuccess = async () => {
    setShowAuthModal(false);

    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();

        if (data?.user) {
          setSession(data);
          setStatus("authenticated");
          window.dispatchEvent(new Event("auth-change"));
        }
      }

    } catch (error) {
      console.error("Error refreshing session after login:", error);
      setStatus("unauthenticated");
    }
  };

  const loadingAuth = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.export"), path: "/Export" },
    { name: t("nav.construction"), path: "/construction" },
    { name: t("nav.agriculture"), path: "/agricultural" },
    { name: t("nav.maintenance"), path: "/maintenance" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-[78px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Pyramid Japan CO,LTD" className="w-18 h-18 rounded-xl object-cover" />
            <div>
              <h1 className="text-lg font-bold tracking-wide text-[#111827] leading-none">
                PYRAMID JAPAN CO.LTD
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">
                {t("nav.sub_logo")}
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition-all duration-300 ${location.pathname === item.path ? "text-[#E0B15A]" : "text-slate-700 hover:text-[#E0B15A]"}`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute -bottom-[28px] left-0 w-full h-[3px] bg-[#E0B15A] rounded-full" />
                )}
              </Link>
            ))}

            {isAuthenticated && isAdmin && (
              <Link
                to="/admin/dashboard"
                className="relative font-bold transition-all duration-300 flex items-center gap-1 text-slate-700 hover:text-rose-600"
              >
                <ShieldCheck className="w-4 h-4 " />
                {t("nav.admin_panel")}
              </Link>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(`/machinery-all/all?search=${encodeURIComponent(searchQuery.trim())}`);
                  setIsOpen(false);
                }
              }}
              className="flex items-center w-[190px] h-11 rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-1.5 transition-all focus-within:border-amber-500 focus-within:bg-white"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nav.search_placeholder")}
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400 min-w-0"
              />
              <button 
                type="submit"
                className="h-8 w-8 rounded-lg bg-slate-100 text-slate-500 hover:text-white hover:bg-[#E0B15A] active:scale-95 transition-all duration-200 cursor-pointer shrink-0 flex items-center justify-center"
                title={t("nav.search_title")}
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {loadingAuth ? (
              <div className="w-24 h-11 bg-slate-100 animate-pulse rounded-xl" />
            ) : !isAuthenticated ? (
              <button
                onClick={() => { setShowAuthModal(true); setIsLoginView(true); }}
                className="h-11 px-5 rounded-xl bg-[#E0B15A] text-white font-semibold hover:bg-[#C47B36] transition-all duration-300 shadow-sm flex items-center justify-center"
              >
                {t("nav.btn_auth")}
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1.5 pr-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[#081F3F] text-white flex items-center justify-center font-bold text-xs uppercase">
                    {isAdmin ? <ShieldCheck className="w-4 h-4 text-[#E0B15A]" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">{session?.user?.name}</span>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">{session?.user?.role || "user"}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                  title={t("nav.sign_out")}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-700">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="p-5">
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl transition-all ${location.pathname === item.path
                      ? "bg-[#C47B36]/10 text-[#C47B36] font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#C47B36]"
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl bg-rose-50 text-rose-600 font-bold transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {t("nav.admin_panel")}
                </Link>
              )}
            </nav>

            <div className="mt-5 border-t border-slate-100 pt-4">
              {!isAuthenticated ? (
                <button
                  onClick={() => { setIsOpen(false); setShowAuthModal(true); setIsLoginView(true); }}
                  className="w-full h-11 rounded-xl bg-[#C47B36] text-white font-semibold hover:bg-[#A86428] transition-all flex items-center justify-center"
                >
                  {t("nav.btn_auth")}
                </button>
              ) : (
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#081F3F] text-white flex items-center justify-center font-bold text-sm">
                      {session?.user?.name?.charAt(0)}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-slate-800">{session?.user?.name}</span>
                      <span className="text-xs text-slate-400">{session?.user?.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-rose-50 text-rose-600 font-bold transition-all flex items-center gap-2 text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("nav.sign_out")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showAuthModal && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAuthModal(false)}
          />

          <div className="relative w-full max-w-md z-[110] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 z-[120] text-slate-400 hover:text-slate-600 transition text-sm font-bold bg-slate-50 hover:bg-slate-100 h-8 w-8 rounded-full flex items-center justify-center border border-slate-200/50 shadow-sm"
            >
              ✕
            </button>
            {isLoginView ? (
              <SignInForm
                onToggleView={() => setIsLoginView(false)}
                onSuccess={handleAuthSuccess}
              />
            ) : (
              <SignUpForm
                onToggleView={() => setIsLoginView(true)}
                onRegisterSuccess={() => setIsLoginView(true)}
              />
            )}
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
