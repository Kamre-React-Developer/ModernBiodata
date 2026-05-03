import { motion } from 'motion/react';
import { useRef } from 'react';
import { Edit3, Palette, Send, Eye, Layout, Lock, Settings, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const templates = [
  {
    title: "Classical Red",
    desc: "Timeless cream and maroon traditional design",
    badge: "POPULAR",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn96tfxNIXP-NGNF2kIjJl83FjDL4YGx0EEvGEpBclE3UHmuKOtqYnaAU6qDmvSX55iFmIh74rX7DCROTyRRQ226tll2sWLQ76ws1SKaWE4wXoWp0nhbGf4jWOOcLtbvGvc8SyxYnA8E_6Ft1SgXoHg8T0D34kxR5AuW7i9wpWnt1mrc7hokGhmTr9s_3blkbsgf1UdJFjx4bazRNwP4lkHIKSGo6OE-uzDVgInCtmBLs9PfmbWpBf_aLzGoUNEoqElU2pliuAmrk",
    accent: "bg-[#8B0000]",
    dummyName: "Aryan Sharma",
    dummyInfo: "Software Engineer • MBA • Mumbai"
  },
  {
    title: "Modern Blue",
    desc: "Clean professional design with bold accents",
    badge: "TRENDING",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHbgkk7wggFol834AeFO1bhD-RY5SNqLb-iblVrX_36aWqWUtdlAYvrPVyaX0X-f8WmDlobfYeNM1JN5BBSVQ_P7yFcBLdbip9JkdjfTnNTB9J5xI0_Bqn29spYQtwa3ob0zdcHFB8kztV0kJhaBfqJkQCsKu3behQm44jzI63qa0ZQK-QrF8MqCdvh1puOw9oZLJeihBXo0iCORuWgApT_OizlT6yy9jWq9Z2W19HhfQGiASwqc21rg5bFRwl3yHucsgxowWi3hc",
    accent: "bg-[#1a237e]",
    dummyName: "Rahul Verma",
    dummyInfo: "Architect • B.Arch • Bangalore"
  },
  {
    title: "Golden Elegance",
    desc: "Premium ivory and gold heritage aesthetic",
    badge: "PREMIUM",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfOr47HNxYf34NJQukum3pULcF3zg8HSPngNWPw9C5WopTEPv4XfXiWgwBBqHCTdjkrf2Md_O6-N_fhQU5YTiC5d6ZWcOLKdRizUJloVsMqhG2_dhz4MeQvTQmrA73vn448pBD_-HvyWm8zJMqB4rHO57lr8be-1hyC7fVj0PJoMoiDCdpGciv2-ZEEvNXrnxODkGIdhLdLfY86oi0iXvLZmPb_545-inTiwPnDmF15aRy8MFdybn5tQk7fQ4EjyZn7S1Nba1UqT8",
    accent: "bg-[#c8960c]",
    dummyName: "Priyanka Gupta",
    dummyInfo: "Doctor • MD • Delhi"
  },
  {
    title: "Dark Royal",
    desc: "Deep purple and lavender luxury theme",
    badge: "LUXURY",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn96tfxNIXP-NGNF2kIjJl83FjDL4YGx0EEvGEpBclE3UHmuKOtqYnaAU6qDmvSX55iFmIh74rX7DCROTyRRQ226tll2sWLQ76ws1SKaWE4wXoWp0nhbGf4jWOOcLtbvGvc8SyxYnA8E_6Ft1SgXoHg8T0D34kxR5AuW7i9wpWnt1mrc7hokGhmTr9s_3blkbsgf1UdJFjx4bazRNwP4lkHIKSGo6OE-uzDVgInCtmBLs9PfmbWpBf_aLzGoUNEoqElU2pliuAmrk",
    accent: "bg-[#4a148c]",
    dummyName: "Isha Malhotra",
    dummyInfo: "Journalist • M.A. • Pune"
  },
  {
    title: "Elegant Royal",
    badge: "NEW",
    desc: "Sophisticated golden double borders",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZbb3iH7jA0jRFSHBPZ1gKVBxsnrV0QrZ2T-vm1Thv_zGWOtZxlOS5JHyugRMPzR3gdyBRI5hNqksv8vXrm8OfsnhSOolyULzW0kfSgov0vXMrgf6rs2okM0vWoV5wU-wWZHD4f5dV2ZL8ZbRDY0FRZZ_crpiv1u-geC6ctj6SLSruMx4iGXJbgZKIGO2p356ou7NjJ8YsZfauQefku8Z5KdXi2thtiCXDzrxdHe6CCmrrjlCAF3ErPWl-SjPHNko2kZ5DBZG0aYY",
    accent: "bg-[#b8860b]",
    dummyName: "Vikram Rathore",
    dummyInfo: "Entrepreneur • MBA • Jaipur"
  },
  {
    title: "Aqua Green",
    badge: "SIMPLE",
    desc: "Fresh and minimal nature-inspired design",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfOr47HNxYf34NJQukum3pULcF3zg8HSPngNWPw9C5WopTEPv4XfXiWgwBBqHCTdjkrf2Md_O6-N_fhQU5YTiC5d6ZWcOLKdRizUJloVsMqhG2_dhz4MeQvTQmrA73vn448pBD_-HvyWm8zJMqB4rHO57lr8be-1hyC7fVj0PJoMoiDCdpGciv2-ZEEvNXrnxODkGIdhLdLfY86oi0iXvLZmPb_545-inTiwPnDmF15aRy8MFdybn5tQk7fQ4EjyZn7S1Nba1UqT8",
    accent: "bg-[#00695c]",
    dummyName: "Siddharth Jain",
    dummyInfo: "IT Specialist • B.Tech • Jaipur"
  },
  {
    title: "Floral Pink",
    badge: "NEW",
    desc: "Soft rose theme with elegant floral touches",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn96tfxNIXP-NGNF2kIjJl83FjDL4YGx0EEvGEpBclE3UHmuKOtqYnaAU6qDmvSX55iFmIh74rX7DCROTyRRQ226tll2sWLQ76ws1SKaWE4wXoWp0nhbGf4jWOOcLtbvGvc8SyxYnA8E_6Ft1SgXoHg8T0D34kxR5AuW7i9wpWnt1mrc7hokGhmTr9s_3blkbsgf1UdJFjx4bazRNwP4lkHIKSGo6OE-uzDVgInCtmBLs9PfmbWpBf_aLzGoUNEoqElU2pliuAmrk",
    accent: "bg-[#e11d48]",
    dummyName: "Ananya Roy",
    dummyInfo: "Fashion Designer • NIFT • Delhi"
  },
  {
    title: "Indigo Professional",
    badge: "MODERN",
    desc: "Sharp corporate aesthetic for a professional look",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHbgkk7wggFol834AeFO1bhD-RY5SNqLb-iblVrX_36aWqWUtdlAYvrPVyaX0X-f8WmDlobfYeNM1JN5BBSVQ_P7yFcBLdbip9JkdjfTnNTB9J5xI0_Bqn29spYQtwa3ob0zdcHFB8kztV0kJhaBfqJkQCsKu3behQm44jzI63qa0ZQK-QrF8MqCdvh1puOw9oZLJeihBXo0iCORuWgApT_OizlT6yy9jWq9Z2W19HhfQGiASwqc21rg5bFRwl3yHucsgxowWi3hc",
    accent: "bg-[#4338ca]",
    dummyName: "Amitabh Singh",
    dummyInfo: "Data Scientist • M.Tech • Pune"
  },
  {
    title: "Nature Green",
    badge: "FRESH",
    desc: "Organic green tones with leafy decorative elements",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfOr47HNxYf34NJQukum3pULcF3zg8HSPngNWPw9C5WopTEPv4XfXiWgwBBqHCTdjkrf2Md_O6-N_fhQU5YTiC5d6ZWcOLKdRizUJloVsMqhG2_dhz4MeQvTQmrA73vn448pBD_-HvyWm8zJMqB4rHO57lr8be-1hyC7fVj0PJoMoiDCdpGciv2-ZEEvNXrnxODkGIdhLdLfY86oi0iXvLZmPb_545-inTiwPnDmF15aRy8MFdybn5tQk7fQ4EjyZn7S1Nba1UqT8",
    accent: "bg-[#16a34a]",
    dummyName: "Kavya Murthy",
    dummyInfo: "Biologist • Ph.D • Bangalore"
  },
  {
    title: "Royal Purple",
    badge: "VIBRANT",
    desc: "Deep amethyst theme for a bold statement",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn96tfxNIXP-NGNF2kIjJl83FjDL4YGx0EEvGEpBclE3UHmuKOtqYnaAU6qDmvSX55iFmIh74rX7DCROTyRRQ226tll2sWLQ76ws1SKaWE4wXoWp0nhbGf4jWOOcLtbvGvc8SyxYnA8E_6Ft1SgXoHg8T0D34kxR5AuW7i9wpWnt1mrc7hokGhmTr9s_3blkbsgf1UdJFjx4bazRNwP4lkHIKSGo6OE-uzDVgInCtmBLs9PfmbWpBf_aLzGoUNEoqElU2pliuAmrk",
    accent: "bg-[#9333ea]",
    dummyName: "Rohan Khanna",
    dummyInfo: "Media Producer • Mumbai"
  },
  {
    title: "Sunset Orange",
    badge: "WARM",
    desc: "Energetic orange hues with modern accents",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZbb3iH7jA0jRFSHBPZ1gKVBxsnrV0QrZ2T-vm1Thv_zGWOtZxlOS5JHyugRMPzR3gdyBRI5hNqksv8vXrm8OfsnhSOolyULzW0kfSgov0vXMrgf6rs2okM0vWoV5wU-wWZHD4f5dV2ZL8ZbRDY0FRZZ_crpiv1u-geC6ctj6SLSruMx4iGXJbgZKIGO2p356ou7NjJ8YsZfauQefku8Z5KdXi2thtiCXDzrxdHe6CCmrrjlCAF3ErPWl-SjPHNko2kZ5DBZG0aYY",
    accent: "bg-[#ea580c]",
    dummyName: "Meera Nair",
    dummyInfo: "HR Manager • MBA • Kochi"
  },
  {
    title: "Minimal Grey",
    badge: "CLEAN",
    desc: "Ultra-minimalist design for focused clarity",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHbgkk7wggFol834AeFO1bhD-RY5SNqLb-iblVrX_36aWqWUtdlAYvrPVyaX0X-f8WmDlobfYeNM1JN5BBSVQ_P7yFcBLdbip9JkdjfTnNTB9J5xI0_Bqn29spYQtwa3ob0zdcHFB8kztV0kJhaBfqJkQCsKu3behQm44jzI63qa0ZQK-QrF8MqCdvh1puOw9oZLJeihBXo0iCORuWgApT_OizlT6yy9jWq9Z2W19HhfQGiASwqc21rg5bFRwl3yHucsgxowWi3hc",
    accent: "bg-slate-600",
    dummyName: "Aditya Rao",
    dummyInfo: "Chartered Accountant • CA • Hyderabad"
  },
  {
    title: "Vintage Sepia",
    badge: "CLASSIC",
    desc: "Old-world charm with parchment paper texture",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfOr47HNxYf34NJQukum3pULcF3zg8HSPngNWPw9C5WopTEPv4XfXiWgwBBqHCTdjkrf2Md_O6-N_fhQU5YTiC5d6ZWcOLKdRizUJloVsMqhG2_dhz4MeQvTQmrA73vn448pBD_-HvyWm8zJMqB4rHO57lr8be-1hyC7fVj0PJoMoiDCdpGciv2-ZEEvNXrnxODkGIdhLdLfY86oi0iXvLZmPb_545-inTiwPnDmF15aRy8MFdybn5tQk7fQ4EjyZn7S1Nba1UqT8",
    accent: "bg-[#8c7b5a]",
    dummyName: "Zoya Ahmed",
    dummyInfo: "English Professor • Ph.D • Lucknow"
  },
  {
    title: "Vibrant Teal",
    badge: "TRENDY",
    desc: "Modern teal palette for a stylish impression",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn96tfxNIXP-NGNF2kIjJl83FjDL4YGx0EEvGEpBclE3UHmuKOtqYnaAU6qDmvSX55iFmIh74rX7DCROTyRRQ226tll2sWLQ76ws1SKaWE4wXoWp0nhbGf4jWOOcLtbvGvc8SyxYnA8E_6Ft1SgXoHg8T0D34kxR5AuW7i9wpWnt1mrc7hokGhmTr9s_3blkbsgf1UdJFjx4bazRNwP4lkHIKSGo6OE-uzDVgInCtmBLs9PfmbWpBf_aLzGoUNEoqElU2pliuAmrk",
    accent: "bg-[#0d9488]",
    dummyName: "Nikhil Deshmukh",
    dummyInfo: "Web Developer • B.E. • Nagpur"
  },
  {
    title: "Midnight Gold",
    badge: "ELITE",
    desc: "Bold black and gold luxury high-contrast design",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZbb3iH7jA0jRFSHBPZ1gKVBxsnrV0QrZ2T-vm1Thv_zGWOtZxlOS5JHyugRMPzR3gdyBRI5hNqksv8vXrm8OfsnhSOolyULzW0kfSgov0vXMrgf6rs2okM0vWoV5wU-wWZHD4f5dV2ZL8ZbRDY0FRZZ_crpiv1u-geC6ctj6SLSruMx4iGXJbgZKIGO2p356ou7NjJ8YsZfauQefku8Z5KdXi2thtiCXDzrxdHe6CCmrrjlCAF3ErPWl-SjPHNko2kZ5DBZG0aYY",
    accent: "bg-[#fbbf24]",
    dummyName: "Sahil Kapoor",
    dummyInfo: "Pilot • Indigo • Gurgaon"
  },
  {
    title: "Rose Gold",
    badge: "PEARL",
    desc: "Subtle pink metallic theme for soft elegance",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn96tfxNIXP-NGNF2kIjJl83FjDL4YGx0EEvGEpBclE3UHmuKOtqYnaAU6qDmvSX55iFmIh74rX7DCROTyRRQ226tll2sWLQ76ws1SKaWE4wXoWp0nhbGf4jWOOcLtbvGvc8SyxYnA8E_6Ft1SgXoHg8T0D34kxR5AuW7i9wpWnt1mrc7hokGhmTr9s_3blkbsgf1UdJFjx4bazRNwP4lkHIKSGo6OE-uzDVgInCtmBLs9PfmbWpBf_aLzGoUNEoqElU2pliuAmrk",
    accent: "bg-[#b47e84]",
    dummyName: "Sunidhi Shah",
    dummyInfo: "Interior Designer • Surat"
  }
];

export function TemplateGallery({ onSelect }: { onSelect: (name: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="templates" className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 md:mb-16">
          <div className="text-left">
            <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] block mb-2 px-1">Beautiful Collection</span>
            <h2 className="font-display text-3xl md:text-4xl font-black mb-2 md:mb-3">Biodata Templates</h2>
            <p className="text-tertiary text-base md:text-lg">Pick a designer template that reflects who you are</p>
          </div>
        </div>

        <div className="relative group/gallery">
          {/* Navigation Buttons - Floating Overlays */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-1 md:left-0 top-[40%] -translate-y-1/2 md:-translate-x-5 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 text-slate-800 hover:text-primary transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={24} className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-1 md:right-0 top-[40%] -translate-y-1/2 md:translate-x-5 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl border border-gray-100 text-slate-800 hover:text-primary transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
            aria-label="Scroll Right"
          >
            <ChevronRight size={24} className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-8 overflow-x-auto pb-8 md:pb-12 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {templates.map((tpl, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className={`flex-shrink-0 w-[260px] md:w-[350px] snap-center md:snap-start ${tpl.accent}/5 p-4 md:p-5 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100/50 hover:border-primary/20 transition-all text-left relative bg-white`}
              >
                <div className="relative rounded-2xl md:rounded-3xl mb-4 md:mb-6 overflow-hidden aspect-[1/1.4] border border-gray-50 shadow-inner group">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out" 
                    src={tpl.image} 
                    alt={tpl.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>

                <div className="px-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 ${tpl.accent}`} />
                      <h3 className="font-display text-base md:text-xl font-bold truncate">{tpl.title}</h3>
                    </div>
                    {tpl.badge && (
                      <span className={`text-[7px] md:text-[9px] font-black px-1.5 md:px-2 py-0.5 rounded-full ${tpl.accent} text-white tracking-widest flex-shrink-0`}>
                        {tpl.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-[10px] md:text-sm mb-4 md:mb-6 line-clamp-1 font-medium">{tpl.desc}</p>
                  <button 
                    onClick={() => onSelect(tpl.title)}
                    className={`w-full py-2.5 md:py-4 rounded-xl md:rounded-2xl ${tpl.accent} text-white font-bold text-xs md:text-sm shadow-md hover:brightness-110 transition-all active:scale-[0.98]`}
                  >
                    Select Design
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

const steps = [
  { icon: <Edit3 size={32} />, title: "Add Details", desc: "Fill in your personal, education, and family information in our easy form." },
  { icon: <Palette size={32} />, title: "Choose Template", desc: "Select from 100+ professional templates that match your style and personality." },
  { icon: <Send size={32} />, title: "Download PDF", desc: "Instantly download high-quality PDF directly to your mobile or computer." }
];

export function StepsSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl font-bold mb-20">Steps to Create Your Biodata</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-primary soft-shadow mx-auto mb-6 border-2 border-emerald-100 z-10 relative">
                {i + 1}
              </div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-2xl soft-shadow border border-white"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-sm text-tertiary leading-relaxed">{step.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: <Eye />, title: "Live Preview", desc: "See exactly how your biodata looks as you type. Real-time updates for a perfect result." },
  { icon: <Layout />, title: "100+ Templates", desc: "Professionally designed templates for all preferences, from minimalist to creative." },
  { icon: <Send />, title: "Instant Download", desc: "Download high-quality PDF instantly for easy sharing with anyone." },
  { icon: <Lock />, title: "100% Private", desc: "We value your privacy. Your data is encrypted and automatically deleted after 24 hours." },
  { icon: <Settings />, title: "Customizable", desc: "Change colors, fonts, and layouts to create a biodata that truly represents you." },
  { icon: <Users />, title: "All Communities", desc: "Inclusive designs that cater to all communities and professional backgrounds." }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-10 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className="text-primary mb-6 transition-transform group-hover:scale-110">
                {feat.icon}
              </div>
              <h4 className="font-bold text-lg mb-4">{feat.title}</h4>
              <p className="text-sm text-tertiary leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
