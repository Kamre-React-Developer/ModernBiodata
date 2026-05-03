import { motion } from 'motion/react';
import { Leaf, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

export function Navbar({ onCreate }: { onCreate: () => void }) {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 w-full">
        <div className="flex flex-col">
          <div className="text-xl font-bold flex items-center gap-2">
            <Leaf className="text-primary fill-primary" size={24} />
            <span className="text-primary font-display">Modern</span>
            <span className="text-on-surface font-display">Biodata</span>
          </div>
          <span className="text-[10px] font-medium text-tertiary uppercase tracking-wider">Free Biodata Maker</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-display text-sm font-medium tracking-tight">
          <a className="text-primary font-semibold border-b-2 border-primary pb-1" href="#">Home</a>
          <a className="text-tertiary hover:text-primary transition-colors" href="#templates">Templates</a>
          <a className="text-tertiary hover:text-primary transition-colors" href="#how-it-works">How It Works</a>
          <a className="text-tertiary hover:text-primary transition-colors" href="#pricing">Pricing</a>
        </nav>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreate}
          className="primary-gradient text-white px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-md"
        >
          Create My Biodata
        </motion.button>
      </div>
    </header>
  );
}

export function Hero({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="relative pt-16 pb-12 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-primary px-4 py-2 rounded-full text-xs font-semibold mb-6">
            🌿 Trusted by 50,000+ Families Across India
          </div>
          <h1 className="font-display text-4xl lg:text-6xl leading-[1.1] mb-6 font-bold tracking-tight">
            Create Your <span className="text-primary">Free Biodata</span> in 5 Minutes! ✨
          </h1>
          <p className="text-lg text-tertiary mb-10 max-w-lg leading-relaxed">
            Modern templates, high-quality PDF downloads directly to your device. 100% Secure and Free forever. No registration required.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <motion.button 
              whileHover={{ y: -2 }}
              onClick={onCreate}
              className="primary-gradient text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg flex items-center gap-2 transition-all"
            >
              Create My Biodata <ArrowRight size={20} />
            </motion.button>
            <a href="#templates" className="border-2 border-outline-variant text-on-surface px-8 py-4 rounded-xl text-base font-bold hover:bg-gray-50 transition-colors flex items-center justify-center">
              View Templates
            </a>
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm text-tertiary font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-primary" /> 3 Lakh+ Users
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-primary" /> 100% Free
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-primary" /> No Login
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-primary" /> Instant Download
            </span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-12 lg:mt-0"
        >
          <div className="bg-gray-50 rounded-[2rem] p-4 lg:p-8 soft-shadow border border-white">
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              <img 
                className="w-full h-auto" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsyAwHlj4EsqaetvKDZjIe-LUnkciNoYFzkNHikAmEF5n8hB3pudfRjMstrJqArgF3-YUAex4toP3mHUVNIWMElZ8ntOSQQHX0ftyotcNcJh3MRBd0ionlffW7w80EDgL55kjdYE7EKAUiyXT2A_n3ABelvt4ujMSNhqxGmiLKEd5OAbB9lxxBBE3DxflskR-IyVv8Fi6OLrv-8wBp0xgYInv7uwPnSw3imVYNmsr06xaTEKNe-VM_HWZhYpVl67wIj3ecTHG6occ" 
                alt="Biodata Builder Interface"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl soft-shadow hidden md:block border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <ShieldCheck className="text-primary" />
                </div>
                <div>
                  <p className="font-bold text-on-surface">Privacy Guaranteed</p>
                  <p className="text-xs text-tertiary">Data deleted after 24h</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

