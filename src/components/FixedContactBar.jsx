import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function FixedContactBar() {
  const { t } = useTranslation();

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        bg-[#0F172A]
        border-t
        border-[#C47B36]
      "
    >
      <div className="max-w-7xl mx-auto px-5 h-12 flex items-center justify-between">

        <p className="text-white text-xs md:text-sm">
          {t("contact_bar.text")}
          <Link to="/contact" className="text-[#C47B36] font-semibold mx-2 hover:underline">
            {t("contact_bar.link")}
          </Link>
        </p>

        <div className="flex items-center gap-4">

          <a
            href="tel:+81568887980"
            className="text-white text-sm font-medium hover:text-[#C47B36] transition"
          >
            +81-568-88-7980
          </a>

          <Link
            to="/contact"
            className="
              bg-[#C47B36]
              hover:bg-[#A86428]
              text-white
              text-xs
              font-semibold
              px-4
              py-1.5
              rounded-lg
              transition
              inline-block
            "
          >
            {t("contact_bar.btn")}
          </Link>

        </div>
      </div>
    </div>
  );
}
