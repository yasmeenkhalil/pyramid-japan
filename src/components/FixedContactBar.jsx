import {
  Phone
} from "lucide-react";


export default  function FixedContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0E4A86] shadow-2xl"
      dir="ltr"
    >
      <div className="max-w-[1180px] mx-auto flex flex-col lg:flex-row items-center min-h-[50px] relative">
        
        {/* RED ALERT */}
        <div
          className="
          relative
          bg-[#F10F0F]
          text-white
          font-semibold
          text-[12px]
          px-7
          py-[13px]
          leading-none
          flex
          items-center
          shrink-0

          after:absolute
          after:top-0
          after:-right-[26px]
          after:w-0
          after:h-0
          after:border-t-[25px]
          after:border-t-transparent
          after:border-b-[25px]
          after:border-b-transparent
          after:border-l-[26px]
          after:border-l-[#F10F0F]
        "
        >
          Please contact us if the machine you are looking for is not found in
          our inventory.
        </div>

        {/* GIRL */}
        <div className="hidden lg:flex items-end ml-10 mr-5 h-[50px]">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt=""
            className="h-[48px] object-contain"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 w-full flex flex-col sm:flex-row items-center justify-end gap-5 px-5 py-2">
          
          {/* BUTTON */}
          <button
            className="
            bg-gradient-to-b
            from-[#FFBF3B]
            to-[#F19A00]
            hover:brightness-105
            transition-all
            text-white
            text-[12px]
            font-bold
            rounded-full
            px-7
            py-2
            shadow-lg
            border border-white/20
            whitespace-nowrap
          "
          >
            Looking for machine? (Click here)
          </button>

          {/* PHONE */}
          <div className="flex items-center gap-2 text-white whitespace-nowrap">
            <Phone className="w-6 h-6" strokeWidth={1.8} />

            <span className="text-[18px] tracking-wide font-light">
              +81-568-88-7980
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}