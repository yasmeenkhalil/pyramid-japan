import { useTranslation } from "react-i18next";

export default function TopBar() {
  const { t, i18n } = useTranslation();

  return (
    <div className="hidden md:flex h-10 px-8 items-center justify-center bg-[#0F172A] text-white/90 text-xs w-full relative" dir={i18n.dir()}>
      
      <div className="flex items-center gap-6 text-center whitespace-nowrap">
        <span>✓ {t('topbar.feature_1')}</span>
        <span className="w-1 h-1 rounded-full bg-[#C47B36]" />
        <span>{t('topbar.feature_2')}</span>
        <span className="w-1 h-1 rounded-full bg-[#C47B36]" />
        <span>{t('topbar.feature_3')}</span>
      </div>
      <div className="absolute right-8 rtl:right-auto rtl:left-8 top-1/2 -translate-y-1/2 flex items-center gap-6">
        {[
          { code: "en", label: "EN" },
          { code: "ja", label: "JA" },
          { code: "ar", label: "AR" }
        ].map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`
              relative
              transition-all
              duration-300
              text-[11px]
              font-bold
              tracking-wider
              cursor-pointer
              after:absolute
              after:left-0
              after:-bottom-[3px]
              after:h-px
              after:bg-[#C47B36]
              after:transition-all
              ${i18n.language === lang.code ? "text-[#C47B36] after:w-full" : "text-white/70 hover:text-[#C47B36] after:w-0 hover:after:w-full"}
            `}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
