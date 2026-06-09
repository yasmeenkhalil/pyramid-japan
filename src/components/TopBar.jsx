export default function TopBar() {
  return (
    // <div
    //   className="
    //     hidden md:flex
    //     items-center
    //     justify-between
    //     px-8
    //     h-[36px]
    //     text-[10px]
    //     uppercase
    //     tracking-[0.28em]
    //     border-b
    //     border-[#C47B36]/10
    //     bg-[#111827]
    //   "
    // >
    //   {/* LEFT TEXT */}
    //   <div className="flex items-center gap-3">
        
    //     {/* GOLD DOT */}
    //     <span className="w-[4px] h-[4px] rounded-full bg-[#C47B36]" />

    //     <p
    //       className="
    //         text-white/90
    //         font-medium
    //         whitespace-nowrap
    //       "
    //     >
    //       Premium Heavy Machinery Export • Japan to the Dunes
    //     </p>
    //   </div>

    //   {/* LANGUAGES */}
    //   {/* <div className="flex items-center gap-7">
        
    //     {["EN", "JA", "ZH"].map((lang) => (
    //       <button
    //         key={lang}
    //         className="
    //           relative
    //           text-[#E6DED5]/70
    //           hover:text-[#E0B15A]
    //           transition-all
    //           duration-300
    //           text-[10px]
    //           font-semibold
    //           tracking-[0.22em]
    //           after:absolute
    //           after:left-0
    //           after:-bottom-[7px]
    //           after:h-px
    //           after:w-0
    //           after:bg-[#C47B36]
    //           after:transition-all
    //           hover:after:w-full
    //         "
    //       >
    //         {lang}
    //       </button>
    //     ))}
    //   </div> */}
    // </div>
   <div className="hidden md:flex h-10 px-8 items-center justify-center gap-6 bg-[#0F172A] text-white/90 text-xs">

  <span>✓ Quality Inspected Machinery</span>

  <span className="w-1 h-1 rounded-full bg-[#C47B36]" />

  <span>Global Export Services</span>

  <span className="w-1 h-1 rounded-full bg-[#C47B36]" />

  <span>Genuine Spare Parts Support</span>

</div>
  );
}