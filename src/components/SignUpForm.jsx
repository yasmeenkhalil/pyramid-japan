import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next"; // استيراد مكتبة الترجمة

export default function SignUpForm({ onToggleView, onRegisterSuccess }) {
  const { t, i18n } = useTranslation(); // تفعيل تابع الترجمة وقراءة الاتجاهات
  const [name, setName] = useState("");
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
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || t('auth.error_register_failed'));
      }

      if (onRegisterSuccess) {
        onRegisterSuccess(email);
      }
    } catch (err) {
      setError(err.message || t('auth.error_generic'));
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
          {t('auth.signup_title')}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {t('auth.signup_desc')}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-medium">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME FIELD */}
        <div>
          <label className="text-xs font-bold text-[#081F3F] uppercase tracking-wider block mb-1.5">
            {t('auth.label_name')}
          </label>
          <div className="relative">
            <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 rtl:left-auto rtl:right-4" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('auth.placeholder_name')}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 pl-11 pr-3 rtl:pl-3 rtl:pr-11 text-sm outline-none focus:border-[#D9A441] transition"
            />
          </div>
        </div>

        {/* EMAIL FIELD */}
        <div>
          <label className="text-xs font-bold text-[#081F3F] uppercase tracking-wider block mb-1.5">
            {t('auth.label_email_addr')}
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 rtl:left-auto rtl:right-4" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 pl-11 pr-3 rtl:pl-3 rtl:pr-11 text-sm outline-none focus:border-[#D9A441] transition"
            />
          </div>
        </div>

        {/* PASSWORD FIELD */}
        <div>
          <label className="text-xs font-bold text-[#081F3F] uppercase tracking-wider block mb-1.5">
            {t('auth.label_secure_password')}
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 rtl:left-auto rtl:right-4" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 pl-11 pr-10 rtl:pl-10 rtl:pr-11 text-sm outline-none focus:border-[#D9A441] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 rtl:right-auto rtl:left-3 cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#081F3F] p-3.5 text-xs font-bold text-white shadow-md hover:bg-[#112d55] transition mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-[#D9A441]" />
              {t('auth.btn_registering')}
            </>
          ) : (
            t('auth.btn_register')
          )}
        </button>
      </form>

      {/* FOOTER TOGGLE */}
      <div className="mt-6 text-center text-xs text-slate-500">
        {t('auth.has_account')}{" "}
        <button onClick={onToggleView} className="text-[#D9A441] font-bold hover:underline cursor-pointer">
          {t('auth.btn_login_toggle')}
        </button>
      </div>
    </div>
  );
}
