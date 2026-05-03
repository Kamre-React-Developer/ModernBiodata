import React from 'react';
import { User } from 'lucide-react';
import { Biodata } from '../../types';

interface Props {
  data: Biodata;
  symbol: string | null;
  activeTheme: {
    bg: string;
    text: string;
    accent: string;
    border: string;
    heading: string;
    headingBg?: string;
    pattern?: string;
  };
  displaySections?: string[];
}

export function TraditionalLayout({ data, symbol, activeTheme }: Props) {
  if (!activeTheme) return null;
  
  const personalSection = data.sections.find(s => s.id === "personal");
  const familySection = data.sections.find(s => s.id === "family");
  const contactSection = data.sections.find(s => s.id === "contact");
  const extraSections = data.sections.filter(s => !["personal", "family", "contact"].includes(s.id));
  
  const hasHeaders = data.headers.some(h => h.trim() !== "");
  const hasSymbol = symbol !== null && symbol !== undefined;
  const showHeading = hasHeaders || hasSymbol;

  // Helper to get pattern component or classes
  const renderPattern = () => {
    switch (activeTheme.pattern) {
      case "classical-red":
        return (
          <>
            <div className={`absolute inset-0 border-[3px] solid ${activeTheme.accent.replace("text-", "border-")} pointer-events-none`} />
            <div className={`absolute inset-[6px] border-[1px] solid ${activeTheme.accent.replace("text-", "border-")} pointer-events-none`} />
            {/* L-Corner shapes */}
            <div className={`absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 ${activeTheme.accent.replace("text-", "border-")} pointer-events-none`} />
            <div className={`absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 ${activeTheme.accent.replace("text-", "border-")} pointer-events-none`} />
            <div className={`absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 ${activeTheme.accent.replace("text-", "border-")} pointer-events-none`} />
            <div className={`absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 ${activeTheme.accent.replace("text-", "border-")} pointer-events-none`} />
          </>
        );
      case "modern-blue":
        return (
          <>
            <div className={`absolute left-0 top-0 bottom-0 w-[6px] ${activeTheme.accent.replace("text-", "bg-")} pointer-events-none`} />
            <div className={`absolute top-0 left-0 right-0 h-[8px] ${activeTheme.accent.replace("text-", "bg-")} pointer-events-none`} />
            <div className={`absolute bottom-0 left-0 right-0 h-[4px] ${activeTheme.accent.replace("text-", "bg-")} pointer-events-none`} />
          </>
        );
      case "golden-elegance":
        return (
          <div className="absolute inset-2 border-2 border-[#c8960c] pointer-events-none">
            <div className="absolute inset-1 border border-[#e8c547]"></div>
          </div>
        );
      case "dark-royal":
        return (
          <div className="absolute inset-0 bg-[#000000]/20 pointer-events-none">
            <div className="absolute inset-4 border border-[#ce93d8]/30"></div>
          </div>
        );
      case "elegant-royal":
        return (
          <div className="absolute inset-0 border-[4px] border-double border-[#b8860b] pointer-events-none">
             <div className="absolute inset-4 border border-[#d4a017]/20"></div>
          </div>
        );
      case "aqua-green":
        return (
          <>
            <div className={`absolute inset-4 border-2 ${activeTheme.accent.replace("text-", "border-")} opacity-50 pointer-events-none`} />
            <div className={`absolute top-6 left-6 text-2xl opacity-20 ${activeTheme.accent}`}>❧</div>
            <div className={`absolute top-6 right-6 text-2xl opacity-20 ${activeTheme.accent} rotate-90`}>❧</div>
            <div className={`absolute bottom-6 left-6 text-2xl opacity-20 ${activeTheme.accent} -rotate-90`}>❧</div>
            <div className={`absolute bottom-6 right-6 text-2xl opacity-20 ${activeTheme.accent} rotate-180`}>❧</div>
          </>
        );
      case "floral-pink":
        return (
          <>
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/floral-paper.png')] pointer-events-none`} />
            <div className={`absolute bottom-0 left-0 w-32 h-32 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/floral-paper.png')] pointer-events-none rotate-180`} />
            <div className="absolute inset-4 border border-[#fb7185]/20 pointer-events-none" />
          </>
        );
      case "indigo-pro":
        return (
          <>
            <div className="absolute top-0 left-0 w-full h-1 bg-[#4338ca] pointer-events-none" />
            <div className="absolute top-0 left-0 w-1 h-full bg-[#4338ca] pointer-events-none" />
            <div className="absolute top-4 left-4 right-4 h-px bg-slate-200 pointer-events-none" />
          </>
        );
      case "nature-green":
        return (
          <>
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#16a34a] via-[#4ade80] to-[#16a34a] pointer-events-none" />
            <div className={`absolute bottom-10 right-10 text-6xl opacity-5 pointer-events-none`}>🌿</div>
            <div className={`absolute top-10 left-10 text-6xl opacity-5 pointer-events-none`}>🍃</div>
          </>
        );
      case "royal-purple":
        return (
          <>
            <div className="absolute inset-0 border-[6px] border-[#9333ea]/10 pointer-events-none" />
            <div className="absolute inset-2 border border-[#9333ea]/20 pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#9333ea]/5 pointer-events-none" />
          </>
        );
      case "sunset-orange":
        return (
          <>
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#ea580c] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ea580c] pointer-events-none" />
            <div className="absolute top-0 left-0 w-24 h-24 bg-[#ea580c]/5 rounded-br-full pointer-events-none" />
          </>
        );
      case "minimal-grey":
        return (
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-grey.png')] opacity-20 pointer-events-none" />
        );
      case "vintage-sepia":
        return (
          <>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-30 pointer-events-none" />
            <div className="absolute inset-6 border border-[#a89060]/30 pointer-events-none" />
          </>
        );
      case "vibrant-teal":
        return (
          <>
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0d9488] pointer-events-none" />
            <div className="absolute top-0 left-0 w-1/3 h-8 bg-[#0d9488]/10 rounded-br-3xl pointer-events-none" />
          </>
        );
      case "midnight-gold":
        return (
          <>
            <div className="absolute inset-4 border border-[#fbbf24]/20 pointer-events-none" />
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#fbbf24]/5 blur-3xl pointer-events-none" />
          </>
        );
      case "rose-gold":
        return (
          <>
            <div className="absolute inset-0 border-[10px] border-[#fceef0] pointer-events-none" />
            <div className="absolute inset-10 border border-[#b47e84]/20 pointer-events-none" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-full ${activeTheme.bg} p-2 flex flex-col font-sans relative overflow-hidden`} style={{ fontFamily: '"Noto Serif", serif' }}>
      {renderPattern()}
      
      <div className={`p-6 md:p-8 flex-1 flex flex-col relative z-10 transition-all duration-300 ${!data.photoUrl ? 'px-8 md:px-20 lg:px-24' : 'px-4 md:px-10 lg:px-12'}`}>
        {/* Religious Heading */}
        {showHeading && (
          <div className="flex flex-col items-center mb-2 relative z-10 font-serif">
            {hasSymbol && (
              <div className="text-3xl mb-2">{symbol}</div>
            )}
            
            {hasHeaders && (
              <div className="flex flex-col items-center">
                {data.headers.filter(h => h.trim() !== '').map((header, i) => (
                  <div 
                    key={i} 
                    className={`italic text-sm font-bold ${activeTheme.accent} tracking-wide text-center opacity-90`}
                  >
                    {header}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {data.mainTitle && (
          <div className="mb-2 flex flex-col items-center">
            <h2 className={`font-serif text-2xl font-black text-center ${activeTheme.accent.replace("text-", "text-")} tracking-tight uppercase`}>
              {data.mainTitle}
            </h2>
          </div>
        )}

        <div className="flex-1 flex flex-col gap-1.5">
          {/* Section 1: Personal Details (Details Left, Photo Right) */}
          {personalSection && (
            <div className="space-y-0.5">
              <SectionHeader label={personalSection.title} theme={activeTheme} />
              
              <div className="flex gap-4">
                <div className="flex-1 grid grid-cols-1 gap-y-0 px-1 md:px-2">
                  {personalSection.fields.map(field => (
                    <Row key={field.id} label={field.label} value={field.value} theme={activeTheme} />
                  ))}
                </div>

                {data.photoUrl && (
                  <div className="w-[120px] flex-shrink-0">
                    <div className={`aspect-[3/4] rounded-lg border-2 ${activeTheme.border} p-0.5 bg-white shadow-sm`}>
                      <img 
                        src={data.photoUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-md" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 2: Family Details */}
          {familySection && (
            <div className="space-y-0.5 text-left">
              <SectionHeader label={familySection.title} theme={activeTheme} />
              <div className="grid grid-cols-1 gap-y-0 px-1 md:px-2 text-left">
                {familySection.fields.map(field => (
                  <Row key={field.id} label={field.label} value={field.value} theme={activeTheme} />
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Extra Sections */}
          {extraSections.map(section => (
            <div key={section.id} className="space-y-0.5 text-left">
              <SectionHeader label={section.title} theme={activeTheme} />
              <div className="grid grid-cols-1 gap-y-0 px-1 md:px-2 text-left">
                {section.fields.map(field => (
                  <Row key={field.id} label={field.label} value={field.value} theme={activeTheme} />
                ))}
              </div>
            </div>
          ))}

          {/* Section 4: Contact Details */}
          {contactSection && (
            <div className="space-y-0.5 text-left">
              <SectionHeader label={contactSection.title} theme={activeTheme} />
              <div className="grid grid-cols-1 gap-y-0 px-1 md:px-2 text-left">
                {contactSection.fields.map(field => (
                  <Row key={field.id} label={field.label} value={field.value} theme={activeTheme} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SectionHeader: React.FC<{ label: string, theme: any }> = ({ label, theme }) => {
  return (
    <div className={`w-full mt-4 mb-2`}>
      <h3 className={`text-xl font-black uppercase tracking-[0.05em] text-left ${theme.accent}`}>
        {label}
      </h3>
      <div className={`h-0.5 w-10 ${theme.accent.replace("text-", "bg-")} mt-0.5 shadow-sm`} />
    </div>
  );
}

const Row: React.FC<{ label: string, value: string, theme: any }> = ({ label, value, theme }) => {
  return (
    <div className="flex text-[14px] items-start py-0.5 text-left border-b border-transparent hover:border-slate-50 transition-colors">
      <div className={`w-[140px] flex-shrink-0 font-extrabold ${theme.accent} text-[10px] uppercase tracking-wider text-left pt-1 opacity-90`}>
        {label}
      </div>
      <div className={`w-4 flex justify-center font-black ${theme.accent} pt-0.5`}>:</div>
      <div className={`font-bold ${theme.text} flex-1 text-left pt-0.5 break-words text-black`}>
        {value || '----------'}
      </div>
    </div>
  );
}
