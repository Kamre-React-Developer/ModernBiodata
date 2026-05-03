import { motion } from 'motion/react';
import { Users, Star, Send, Share2, Mail, Layout, Info, CreditCard, CheckCircle } from 'lucide-react';
import { FeedbackDialog } from './FeedbackDialog';

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl font-bold mb-6">Transparent Pricing</h2>
        <p className="text-tertiary mb-16 max-w-xl mx-auto italic">"Simple, honest, and truly free forever."</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl relative flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
            <div className="text-4xl font-black text-gray-900 mb-8">₹0 <span className="text-sm font-normal text-tertiary">/ lifetime</span></div>
            
            <ul className="text-left space-y-4 mb-10 flex-1">
              {[
                "Unlimited PDF Downloads",
                "100+ Premium Templates",
                "No Registration Required",
                "High Quality Printing",
                "24/7 Self-Service"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-on-surface font-medium">
                  <CheckCircle size={18} className="text-primary flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
            
            <button className="w-full bg-gray-100 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all">
              Already Active
            </button>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border-2 border-primary shadow-2xl relative flex flex-col">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">Support Our Work</div>
            <h3 className="text-2xl font-bold mb-2">Donate</h3>
            <div className="text-4xl font-black text-primary mb-8">Any <span className="text-sm font-normal text-tertiary">Amount</span></div>
            
            <p className="text-left text-tertiary mb-6 leading-relaxed">
              If you like our work, consider supporting us to keep this service free and modern for everyone.
            </p>

            <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-8 flex flex-col items-center">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-4">Scan and Pay with any UPI App</span>
              <div className="w-48 h-48 bg-gray-50 flex items-center justify-center rounded-xl overflow-hidden mb-2 border border-gray-100 shadow-sm relative">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("upi://pay?pa=7070141502@kotakbank&pn=MD%20KAMRE%20ALAM&cu=INR")}`} 
                  alt="UPI QR Code" 
                  className="w-full h-full p-2 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[10px] text-tertiary font-bold mt-2">MD KAMRE ALAM</p>
            </div>
            
            <div className="mt-auto">
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Help cover server costs",
                  "Keep it 100% Ad-Free",
                  "Support small creators",
                  "Fast feature updates"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-on-surface text-sm">
                    <Star size={14} className="text-primary flex-shrink-0 fill-current" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    text: "I was struggling to make a professional biodata for my sister. ModernBiodata made it so simple! The templates are beautiful and downloading the PDF was instant.",
    name: "Komal Sharma",
    initial: "K",
    rating: 5
  },
  {
    text: "The best part is no login required. I finished everything in under 5 minutes. Direct PDF download is perfect for sharing.",
    name: "Arjun Patel",
    initial: "A",
    rating: 4.5
  },
  {
    text: "Modern, clean, and extremely easy to use. I love that there are no annoying ads or religious symbols, just pure professional design. Highly recommend!",
    name: "Fatima Sheikh",
    initial: "F",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl font-bold mb-16">Families Love ModernBiodata</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((testi, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-emerald-50/50 p-8 rounded-2xl relative border border-emerald-100"
            >
              <div className="flex text-amber-500 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star 
                    key={j} 
                    size={18} 
                    fill={j < Math.floor(testi.rating) ? "currentColor" : "none"} 
                    className={j < testi.rating ? "text-amber-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-base italic text-on-surface mb-10 leading-relaxed">"{testi.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center font-bold text-primary">
                  {testi.initial}
                </div>
                <span className="font-bold">{testi.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTABanner({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="primary-gradient rounded-[2.5rem] p-12 lg:p-24 flex flex-col items-center text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFlEc0tLXhpK_MSUXUGjsOYZmmFb2yYWd7NZfJVJlM5YSTupDp3bdqvy8WvCemStYPwuEA2UhViDdgrj9p7jubNBwtw86iMaxcnHC7AxmqLiywDjs8lYIjZUIGGRRKRzquWuhBveMQ4p8m0F4SjqcKvJ4D4r7fdIjodPz0-ItTgzvLIeu8-34_zdqNtOug96OY9PnDTqRDjd-QPmtFriE6cs0IYI6nSDfyorK2Je_V0mRIRSv9uQuBxzsPhJm3X61Q7mkf48iihSs" 
              alt="Background pattern" 
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-bold mb-6 relative z-10">Abhi Banao — Free Mein!</h2>
          <p className="text-xl mb-12 max-w-xl opacity-90 relative z-10 font-medium">
            Start building your perfect biodata today. No credit card, no login, 100% free forever.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreate}
            className="bg-white text-primary px-12 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-emerald-50 transition-all relative z-10"
          >
            Create My Free Biodata Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white font-display text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6 py-20 w-full">
        <div className="space-y-6">
          <div className="text-2xl font-black text-white">ModernBiodata</div>
          <p className="text-slate-400 leading-relaxed">
            Professional, simple, and free biodata maker for everyone. Made with ❤️ in India.
          </p>
          <div className="flex gap-4">
            {[Share2, Mail, Info].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Resources</h4>
          <ul className="space-y-4">
            {["Templates", "How It Works", "Pricing", "Blog"].map(item => (
              <li key={item}><a className="text-slate-400 hover:text-emerald-400 transition-colors transform hover:translate-x-1 inline-block" href="#">{item}</a></li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Legal</h4>
          <ul className="space-y-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
              <li key={item}><a className="text-slate-400 hover:text-emerald-400 transition-colors transform hover:translate-x-1 inline-block" href="#">{item}</a></li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Stay Updated</h4>
          <p className="text-slate-400">Join our newsletter for tips on creating the best biodata.</p>
          <div className="flex gap-2">
            <input 
              className="bg-slate-800 border-none rounded-lg px-4 py-3 text-white w-full focus:ring-2 focus:ring-emerald-500 outline-none" 
              placeholder="Email" 
              type="email" 
            />
            <button className="bg-primary p-3 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-500">
          © 2026 ModernBiodata. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
          <FeedbackDialog />
          <span className="text-slate-800">|</span>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Support Us via QR in Pricing</span>
          </div>
          <span className="text-slate-800">|</span>
          <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
