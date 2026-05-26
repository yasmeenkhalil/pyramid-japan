// 1. استيراد الصورة محلياً من مجلد الأسيتس (تأكد من كتابة الاسم والمسار الصحيح لملفك)
import worldMapImage from '../assets/images/world_map.svg'; 

export default function WorldShipping() {
  const column1 = [
    "Ireland (Dublin)", "United States of America (Washington, D.C.)", 
    "United Arab Emirates/UAE (Abu Dhabi)", "Algeria (Algiers)", 
    "Argentina (Buenos Aires)", "Antigua and Barbuda (St. John's)", 
    "Yemen (Sana'a)", "United Kingdom (London)"
  ];

  const column2 = [
    "Cyprus (Nicosia)", "Greece (Athens)", "Kiribati (Tarawa)", 
    "Kuwait (Kuwait)", "Croatia (Zagreb)", "Kenya (Nairobi)", 
    "Colombia (Bogotá)", "Saudi Arabia (Riyadh)", 
    "Independent State of Samoa (Apia)", "Zambia (Lusaka)"
  ];

  const column3 = [
    "Dominican Republic (Santo Domingo)", "Trinidad and Tobago (Port of Spain)", 
    "Turkey (Ankara)", "Nigeria (Abuja)", "New Zealand (Wellington)", 
    "Nepal (Kathmandu)", "Norway (Oslo)", "Bahrain (Manama)", "Haiti (Port-au-Prince)"
  ];

  const column4 = [
    "Republic of Peru (Lima)", "Belgium (Brussels)", "Bolivia (La Paz)", 
    "Portugal (Lisbon)", "Honduras (Tegucigalpa)", "Malta (Valletta)", 
    "Malaysia (Kuala Lumpur)", "Federated States of Micronesia (Palikir)", 
    "Myanmar (Naypyidaw)", "Mexico (Mexico City)"
  ];

  return (
    <div className="w-full text-left bg-white select-none pb-8">
      
      {/* 1. الشريط الأزرق الممتد */}
      <div className="bg-[#005BAC] text-white px-5 py-2.5 rounded-sm mb-8">
        <h3 className="text-xs font-bold font-sans tracking-wide">
          Areas supported by Pyramid Japan Co.
        </h3>
      </div>

      {/* 2. العنوان الرئيسي */}
      <div className="text-center my-8">
        <h2 className="text-2xl font-bold font-sans tracking-tight inline-block relative">
          <span className="text-gray-800 font-light">From </span>
          <span className="text-[#005BAC] font-black">PYRAMID JAPAN </span>
          <span className="text-gray-800 font-light">to </span>
          <span className="text-[#D70014] font-medium">the world</span>
          <span className="absolute left-0 right-0 bottom-1 h-1.5 bg-[#FFD600] -z-10 opacity-70"></span>
        </h2>
      </div>

      {/* 3. حاوية خريطة العالم - تم ربطها بملف الأسيتس المستورد */}
      <div className="w-full max-w-2xl mx-auto my-6 flex justify-center items-center p-4 relative">
        <div 
          className="relative w-full aspect-[2/1] bg-no-repeat bg-center bg-contain opacity-80" 
          style={{ 
            backgroundImage: `url(${worldMapImage})`, // 2. تمرير المتغير هنا مباشرة
            maskImage: 'linear-gradient(to bottom, black 80%, transparent)' 
          }}
        >
          
          {/* بؤرة الشحن من اليابان */}
          <div className="absolute top-[35%] left-[73%] w-2.5 h-2.5 bg-[#D70014] rounded-full animate-ping"></div>
          <div className="absolute top-[35%] left-[73%] w-2 h-2 bg-[#005BAC] rounded-full"></div>
          
          {/* التأثير القوسي للملاحة البحرية */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200">
            <path d="M292,70 Q200,10 100,60" fill="none" stroke="#005BAC" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M292,70 Q250,20 180,120" fill="none" stroke="#005BAC" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M292,70 Q340,30 380,80" fill="none" stroke="#005BAC" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M292,70 Q280,110 210,160" fill="none" stroke="#005BAC" strokeWidth="1" strokeDasharray="2,2" />
          </svg>
        </div>
      </div>

      {/* 4. شبكة الدول والمدن المدعومة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-6 text-[11px] text-gray-700 font-sans leading-relaxed mt-10">
        <div className="flex flex-col gap-1">
          {column1.map((item, idx) => <p key={idx} className="hover:text-[#005BAC] cursor-pointer">{item}</p>)}
        </div>
        <div className="flex flex-col gap-1">
          {column2.map((item, idx) => <p key={idx} className="hover:text-[#005BAC] cursor-pointer">{item}</p>)}
        </div>
        <div className="flex flex-col gap-1">
          {column3.map((item, idx) => <p key={idx} className="hover:text-[#005BAC] cursor-pointer">{item}</p>)}
        </div>
        <div className="flex flex-col gap-1">
          {column4.map((item, idx) => <p key={idx} className="hover:text-[#005BAC] cursor-pointer">{item}</p>)}
        </div>
      </div>

    </div>
  );
}
