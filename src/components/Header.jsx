import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Menu, X, LogOut, ShieldCheck, User } from "lucide-react";
import logoen from "../../public/assets/images/logoen.jpeg";
import logojp from "../../public/assets/images/logojp.jpeg";
import logoru from "../../public/assets/images/logoru.jpeg";
import logoar from "../../public/assets/images/logoar.jpeg";
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
  const currentLogo = i18n.language === "ar"
    ? logoar
    : (i18n.language === "ja" || i18n.language === "jp")
    ? logojp
    : i18n.language === "ru"
    ? logoru
    : logoen;



  useEffect(() => {
    let isMounted = true;

    async function fetchAuthSession() {
;      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://app.pyramidjapan.jp'}/api/auth/session`, { credentials: "include" });

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
  useEffect(() => {
  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
    setIsLoginView(true);
  };

  window.addEventListener("open-auth-modal", handleOpenAuthModal);

  return () => {
    window.removeEventListener("open-auth-modal", handleOpenAuthModal);
  };
}, []);

  const handleLogout = async () => {
    try {
      const csrfResponse = await fetch(`${import.meta.env.VITE_API_URL || 'https://app.pyramidjapan.jp'}/api/auth/csrf`, {
        credentials: "include",
      });

      const csrfData = await csrfResponse.json();

      await fetch(`${import.meta.env.VITE_API_URL || 'https://app.pyramidjapan.jp'}/api/auth/signout`, {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://app.pyramidjapan.jp'}/api/auth/session`, {
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
      <div className="max-w-[1440px] mx-auto px-4 xl:px-6">
          <div className="h-[92px] flex items-center justify-between gap-2">
          
          {/* اللوجو مع حماية المساحة عند الضغط الخفيف */}
          <Link
  to="/"
  className="flex items-center gap-3 shrink-0 max-w-[300px] xl:max-w-none"
>
  <div className="flex items-center justify-center shrink-0">
    <img
      src={currentLogo}
      alt="Pyramid Japan CO,LTD"
      className="w-[76px] h-[76px] xl:w-[82px] xl:h-[82px] rounded-xl object-contain"
    />
  </div>

  <div className="min-w-0">
    <h1 className="text-sm xl:text-base font-bold tracking-wide text-[#111827] leading-none whitespace-nowrap">
      PYRAMID JAPAN CO.LTD
    </h1>

    <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500 mt-1 whitespace-nowrap">
      {t("nav.sub_logo")}
    </p>
  </div>
</Link>

          {/* روابط الملاحة: تم تصغير الخط وتقليل الفراغات عند الحاجة لمنع تخريب التصميم بالروسي */}
          <nav className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-3 flex-1 px-2 text-xs xl:text-sm">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition-all duration-300 whitespace-nowrap px-1 py-2 ${location.pathname === item.path ? "text-[#E0B15A]" : "text-slate-700 hover:text-[#E0B15A]"}`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#E0B15A] rounded-full" />
                )}
              </Link>
            ))}

          </nav>

          {/* عناصر البحث وتخويل الدخول الفردية */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(`/machinery-all/all?search=${encodeURIComponent(searchQuery.trim())}`);
                  setIsOpen(false);
                }
              }}
              className="flex items-center w-[140px] xl:w-[190px] h-10 rounded-xl border border-slate-200 bg-slate-50 pl-3 pr-1 transition-all focus-within:border-amber-500 focus-within:bg-white"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nav.search_placeholder")}
                className="flex-1 bg-transparent outline-none text-xs placeholder:text-slate-400 min-w-0"
              />
              <button 
                type="submit"
                className="h-7 w-7 rounded-lg bg-slate-100 text-slate-500 hover:text-white hover:bg-[#E0B15A] active:scale-95 transition-all duration-200 cursor-pointer shrink-0 flex items-center justify-center"
                title={t("nav.search_title")}
              >
                <Search className="w-3 h-3" />
              </button>
            </form>

            {loadingAuth ? (
              <div className="w-20 h-10 bg-slate-100 animate-pulse rounded-xl" />
            ) : !isAuthenticated ? (
              <button
                onClick={() => { setShowAuthModal(true); setIsLoginView(true); }}
                className="h-10 px-4 rounded-xl bg-[#E0B15A] text-white text-xs font-semibold hover:bg-[#C47B36] transition-all duration-300 shadow-sm flex items-center justify-center whitespace-nowrap"
              >
                {t("nav.btn_auth")}
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1 pr-3 max-w-[180px]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="h-7 w-7 rounded-lg bg-[#081F3F] text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-[#E0B15A]" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-[11px] font-bold text-slate-800 truncate">{session?.user?.name}</span>
                    <span className="text-[8px] uppercase tracking-wider font-bold text-slate-400 truncate">{session?.user?.role || "user"}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all shrink-0"
                  title={t("nav.sign_out")}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* زر قائمة الهامبرغر للموبايل */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors shrink-0">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* قائمة الموبايل المنسدلة */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-inner max-h-[calc(100vh-92px)] overflow-y-auto">
          <div className="p-5">
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-xl transition-all text-sm ${location.pathname === item.path
                      ? "bg-[#C47B36]/10 text-[#C47B36] font-bold"
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
                  className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold transition-all flex items-center gap-2 text-sm"
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
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-[#081F3F] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {session?.user?.name?.charAt(0)}
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-xs font-bold text-slate-800 truncate">{session?.user?.name}</span>
                      <span className="text-[10px] text-slate-400 truncate">{session?.user?.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-rose-50 text-rose-600 font-bold transition-all flex items-center gap-1.5 text-xs shrink-0 whitespace-nowrap"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {t("nav.sign_out")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* المودال الشفاف لنماذج الدخول بورتال */}
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
