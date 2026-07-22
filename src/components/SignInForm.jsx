import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next"; // استيراد مكتبة الترجمة

export default function SignInForm({ onToggleView, onSuccess }) {
  const { t, i18n } = useTranslation(); // تفعيل تابع الترجمة والاتجاهات
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const csrfResponse = await fetch("/api/auth/csrf", {
        credentials: "include",
      });

      const csrfData = await csrfResponse.json();

      const loginResponse = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          csrfToken: csrfData.csrfToken,
          email,
          password,
          json: "true",
          redirect: "false",
        }),
      });

      const loginData = await loginResponse.json();

      if (loginData?.error) {
        setError(t('auth.error_invalid_credentials'));
        return;
      }

      const sessionResponse = await fetch("/api/auth/session", {
        credentials: "include",
        cache: "no-store",
      });

      const sessionData = await sessionResponse.json();

      if (sessionData?.user) {
        window.dispatchEvent(new Event("auth-change"));
        if (onSuccess) {
          onSuccess(sessionData);
        }
      } else {
        setError(t('auth.error_session_failed'));
      }

    } catch (error) {
      setError(t('auth.error_generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-left rtl:text-right" dir={i18n.dir()}>

      <div className="text-center mb-8">
        <span className="text-xs font-bold tracking-[0.2em] text-[#D9A441] uppercase">
          {t('auth.brand_name')}
        </span>

        <h2 className="text-2xl font-black text-[#081F3F] mt-1">
          {t('auth.signin_title')}
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          {t('auth.signin_desc')}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* EMAIL FIELD */}
        <div>
          <label className="text-xs font-bold text-[#081F3F] block mb-2">
            {t('auth.label_email')}
          </label>

          <div className="relative">
            {/* تم دعم تبديل موقع الأيقونات تلقائياً حسب اتجاه اللغة */}
            <Mail className="absolute left-4 rtl:left-auto rtl:right-4 top-3.5 h-4 w-4 text-slate-400" />

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 pl-11 pr-3 rtl:pl-3 rtl:pr-11 text-sm outline-none"
              placeholder="name@email.com"
            />
          </div>
        </div>

        {/* PASSWORD FIELD */}
        <div>
          <label className="text-xs font-bold text-[#081F3F] block mb-2">
            {t('auth.label_password')}
          </label>

          <div className="relative">
            <Lock className="absolute left-4 rtl:left-auto rtl:right-4 top-3.5 h-4 w-4 text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 pl-11 pr-10 rtl:pl-10 rtl:pr-11 text-sm outline-none"
              placeholder="********"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 rtl:right-auto rtl:left-3 top-3.5 text-slate-400 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          disabled={loading}
          className="w-full rounded-xl bg-[#081F3F] p-3.5 text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('auth.btn_signing_in')}
            </>
          ) : (
            t('auth.btn_signin')
          )}
        </button>

      </form>

      {/* FOOTER TOGGLE */}
      <div className="mt-6 text-center text-xs text-slate-500">
        {t('auth.no_account')}
        <button
          onClick={onToggleView}
          className="ml-1 rtl:ml-0 rtl:mr-1 text-[#D9A441] font-bold cursor-pointer"
        >
          {t('auth.btn_register_toggle')}
        </button>
      </div>

    </div>
  );
}
