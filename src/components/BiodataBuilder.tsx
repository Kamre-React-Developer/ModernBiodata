import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, ChevronLeft, Download
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Biodata, initialBiodata } from '../types';
import { PersonalInfoForm } from './builder/PersonalInfoForm';
import { FamilyInfoForm } from './builder/FamilyInfoForm';
import { ContactInfoForm } from './builder/ContactInfoForm';
import { A4Page } from './preview/A4Page';
import { TraditionalLayout } from './preview/TraditionalLayout';
import { FeedbackDialog } from './FeedbackDialog';
import { FormSection, ModernField, SimpleInput } from './builder/FormElements';

interface BuilderProps {
  onBack: () => void;
  template: string;
}

export function BiodataBuilder({ onBack, template }: BuilderProps) {
  const [data, setData] = useState<Biodata>(initialBiodata);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!printRef.current) return;
    setIsGenerating(true);
    
    try {
      const element = printRef.current;
      
      // Ensure element is visible for capture
      element.style.display = 'block';
      
      const canvas = await html2canvas(element, {
        scale: 2, // Reduced from 4 to 2 (drastically reduces file size while remaining high quality)
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 1200, // Increased for better layout capture
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          const el = clonedDoc.querySelector('[data-print-container]');
          if (el) {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.visibility = 'visible';
            (el as HTMLElement).style.colorScheme = 'light';
            (el as HTMLElement).style.backgroundColor = '#ffffff';
            (el as HTMLElement).style.position = 'static';
            (el as HTMLElement).style.display = 'block';
            
            // Standardize colors to avoid oklch issues in PDF
            const allElements = clonedDoc.getElementsByTagName('*');
            for (let i = 0; i < allElements.length; i++) {
              const element = allElements[i] as HTMLElement;
              const style = window.getComputedStyle(element);
              
              if (style.color && (style.color.includes('okl') || style.color.includes('var('))) {
                element.style.color = '#000000';
              }
            }

            const style = clonedDoc.createElement('style');
            style.innerHTML = `
              * { 
                transition: none !important; 
                animation: none !important; 
                text-shadow: none !important; 
                box-shadow: none !important;
                color-scheme: light !important;
              }
              :root {
                --color-rose-500: #f43f5e !important;
                --color-primary: #006948 !important;
                --color-emerald-50: #ecfdf5 !important;
                --color-gray-100: #f3f4f6 !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        }
      });
      
      // Use JPEG with 0.75 quality instead of PNG for massive size reduction
      const imgData = canvas.toDataURL('image/jpeg', 0.75); 
      
      // Fixed width (A4)
      const pdfWidth = 210;
      const pdfHeight = 297;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgHeightInPdf = (canvasHeight * pdfWidth) / canvasWidth;
      
      const finalPdfHeight = Math.max(pdfHeight, imgHeightInPdf);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, finalPdfHeight],
        compress: true // Enable jsPDF built-in compression
      });

      // Use JPEG format with 'FAST' compression in the PDF
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeightInPdf, undefined, 'FAST');
      
      const name = data.sections[0].fields.find(f => f.label.toLowerCase().includes('name'))?.value || 'Biodata';
      const fileName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      pdf.save(`${fileName}_Biodata.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Please try again or use a different browser.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFinish = () => {
    downloadPDF();
  };

  const updateField = (sectionId: string, fieldId: string, value: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === sectionId 
          ? { ...s, fields: s.fields.map(f => f.id === fieldId ? { ...f, value } : f) }
          : s
      )
    }));
  };

  const moveField = (sectionId: string, fieldIndex: number, direction: 'up' | 'down') => {
    setData(prev => {
      const newSections = prev.sections.map(s => {
        if (s.id !== sectionId) return s;
        const newFields = [...s.fields];
        const targetIndex = direction === 'up' ? fieldIndex - 1 : fieldIndex + 1;
        if (targetIndex < 0 || targetIndex >= newFields.length) return s;
        [newFields[fieldIndex], newFields[targetIndex]] = [newFields[targetIndex], newFields[fieldIndex]];
        return { ...s, fields: newFields };
      });
      return { ...prev, sections: newSections };
    });
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === sectionId 
          ? { ...s, fields: s.fields.filter(f => f.id !== fieldId) }
          : s
      )
    }));
  };

  const addField = (sectionId: string) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === sectionId 
          ? { ...s, fields: [...s.fields, { id: newId, label: "New Field", value: "", type: "text" }] }
          : s
      )
    }));
  };

  const updateFieldLabel = (sectionId: string, fieldId: string, label: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === sectionId 
          ? { ...s, fields: s.fields.map(f => f.id === fieldId ? { ...f, label } : f) }
          : s
      )
    }));
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, title } : s)
    }));
  };

  const addSection = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setData(prev => ({
      ...prev,
      sections: [...prev.sections, { id: newId, title: "NEW SECTION", fields: [] }]
    }));
  };

  const removeSection = (sectionId: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
  };

  const updateMainTitle = (mainTitle: string) => setData(prev => ({ ...prev, mainTitle }));
  const updatePhotoUrl = (photoUrl: string) => setData(prev => ({ ...prev, photoUrl }));
  const onSymbolSelect = (symbol: string) => setData(prev => ({ ...prev, symbol }));
  const updateHeadingVisibility = (showHeading: boolean) => setData(prev => ({ ...prev, showHeading }));

  const updateHeader = (index: number, value: string) => {
    setData(prev => {
      const newHeaders = [...prev.headers];
      newHeaders[index] = value;
      return { ...prev, headers: newHeaders };
    });
  };

  const addHeader = () => {
    setData(prev => ({ ...prev, headers: [...prev.headers, ""] }));
  };

  const removeHeader = (index: number) => {
    setData(prev => ({ ...prev, headers: prev.headers.filter((_, i) => i !== index) }));
  };

  const moveHeader = (index: number, direction: 'up' | 'down') => {
    setData(prev => {
      const newHeaders = [...prev.headers];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newHeaders.length) return prev;
      [newHeaders[index], newHeaders[targetIndex]] = [newHeaders[targetIndex], newHeaders[index]];
      return { ...prev, headers: newHeaders };
    });
  };

  const themes: Record<string, any> = {
    "Classical Red": { 
      bg: "bg-[#fff8f0]", 
      text: "text-[#450a0a]", 
      accent: "text-[#8B0000]", 
      border: "border-[#8B0000]", 
      heading: "text-[#ffffff]",
      headingBg: "bg-[#8B0000]",
      pattern: "classical-red"
    },
    "Modern Blue": { 
      bg: "bg-[#f0f4ff]", 
      text: "text-[#1a237e]", 
      accent: "text-[#1a237e]", 
      border: "border-[#1a237e]", 
      heading: "text-[#ffffff]",
      headingBg: "bg-[#1a237e]",
      pattern: "modern-blue"
    },
    "Golden Elegance": { 
      bg: "bg-[#fdfcf0]", 
      text: "text-[#2d3436]", 
      accent: "text-[#c8960c]", 
      border: "border-[#c8960c]", 
      heading: "text-[#2d3436]",
      headingBg: "bg-gradient-to-r from-[#c8960c]/20 via-[#e8c547]/30 to-[#c8960c]/20",
      pattern: "golden-elegance"
    },
    "Dark Royal": { 
      bg: "bg-[#1a1035]", 
      text: "text-[#e8eaf6]", 
      accent: "text-[#ce93d8]", 
      border: "border-[#7c4dff]/30", 
      heading: "text-[#f3e5f5]",
      headingBg: "bg-gradient-to-r from-[#4a148c] to-[#7b1fa2]",
      pattern: "dark-royal"
    },
    "Elegant Royal": { 
      bg: "bg-[#fdfaf5]", 
      text: "text-[#7a5200]", 
      accent: "text-[#b8860b]", 
      border: "border-[#b8860b]", 
      heading: "text-[#7a5200]",
      headingBg: "bg-[#fdf3dc]",
      pattern: "elegant-royal"
    },
    "Aqua Green": { 
      bg: "bg-[#e8f5e9]", 
      text: "text-[#004d40]", 
      accent: "text-[#00695c]", 
      border: "border-[#00695c]", 
      heading: "text-[#ffffff]",
      headingBg: "bg-[#00695c]",
      pattern: "aqua-green"
    },
    "Floral Pink": {
      bg: "bg-[#fff1f2]",
      text: "text-[#881337]",
      accent: "text-[#e11d48]",
      border: "border-[#fb7185]",
      heading: "text-white",
      headingBg: "bg-[#e11d48]",
      pattern: "floral-pink"
    },
    "Indigo Professional": {
      bg: "bg-[#f8fafc]",
      text: "text-[#1e293b]",
      accent: "text-[#4338ca]",
      border: "border-[#4338ca]",
      heading: "text-white",
      headingBg: "bg-[#4338ca]",
      pattern: "indigo-pro"
    },
    "Nature Green": {
      bg: "bg-[#f0fdf4]",
      text: "text-[#14532d]",
      accent: "text-[#16a34a]",
      border: "border-[#16a34a]",
      heading: "text-white",
      headingBg: "bg-[#16a34a]",
      pattern: "nature-green"
    },
    "Royal Purple": {
      bg: "bg-[#faf5ff]",
      text: "text-[#581c87]",
      accent: "text-[#9333ea]",
      border: "border-[#9333ea]",
      heading: "text-white",
      headingBg: "bg-[#9333ea]",
      pattern: "royal-purple"
    },
    "Sunset Orange": {
      bg: "bg-[#fffaf0]",
      text: "text-[#7c2d12]",
      accent: "text-[#ea580c]",
      border: "border-[#fb923c]",
      heading: "text-white",
      headingBg: "bg-[#ea580c]",
      pattern: "sunset-orange"
    },
    "Minimal Grey": {
      bg: "bg-white",
      text: "text-slate-800",
      accent: "text-slate-600",
      border: "border-slate-200",
      heading: "text-slate-900",
      headingBg: "bg-slate-50",
      pattern: "minimal-grey"
    },
    "Vintage Sepia": {
      bg: "bg-[#f4efe1]",
      text: "text-[#4d4637]",
      accent: "text-[#8c7b5a]",
      border: "border-[#8c7b5a]",
      heading: "text-[#4d4637]",
      headingBg: "bg-[#e5ddd0]",
      pattern: "vintage-sepia"
    },
    "Vibrant Teal": {
      bg: "bg-[#f0fdfa]",
      text: "text-[#134e4a]",
      accent: "text-[#0d9488]",
      border: "border-[#0d9488]",
      heading: "text-white",
      headingBg: "bg-[#0d9488]",
      pattern: "vibrant-teal"
    },
    "Midnight Gold": {
      bg: "bg-[#0f172a]",
      text: "text-slate-300",
      accent: "text-[#fbbf24]",
      border: "border-[#fbbf24]/50",
      heading: "text-[#fbbf24]",
      headingBg: "bg-[#1e293b]",
      pattern: "midnight-gold"
    },
    "Rose Gold": {
      bg: "bg-[#fffafa]",
      text: "text-[#8b4c52]",
      accent: "text-[#b47e84]",
      border: "border-[#d8b4b8]",
      heading: "text-[#8b4c52]",
      headingBg: "bg-[#fceef0]",
      pattern: "rose-gold"
    }
  };

  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const activeTheme = themes[template] || themes["Classical Red"];

  const getSymbol = () => {
    switch (data.symbol) {
      case 'ganesha': return '🕉️';
      case 'swastika': return '卐';
      case 'om': return 'ॐ';
      case 'shree': return 'श्री';
      case 'bismillah': return '﷽';
      case 'crescent': return '☪️';
      case '786': return '786';
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col no-print">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-tertiary flex items-center gap-2 hover:text-primary transition-colors font-medium">
            <ChevronLeft size={20} /> Back to Home
          </button>
          <span className="hidden md:inline text-gray-200">|</span>
          <div className="hidden md:block">
            <FeedbackDialog />
          </div>
          <span className="hidden md:inline text-gray-200">|</span>
          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter whitespace-nowrap">Free & Private Service ✨</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={downloadPDF}
            disabled={isGenerating}
            className="hidden md:flex items-center gap-2 text-primary font-bold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all disabled:opacity-50"
          >
            <Download size={18} /> {isGenerating ? 'Wait...' : 'Download PDF'}
          </button>
          <button 
            onClick={handleFinish}
            disabled={isGenerating}
            className="primary-gradient text-white px-6 py-2.5 rounded-lg font-bold shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? 'Preparing...' : 'Get PDF'} <ChevronRight size={18} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Mobile Toggle Bar */}
        <div className="lg:hidden bg-white border-b px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <button 
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all ${showMobilePreview ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            {showMobilePreview ? 'Edit Details' : 'View Preview'}
          </button>
          
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${showMobilePreview ? 'bg-emerald-400' : 'bg-slate-300'}`} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{showMobilePreview ? 'PREVIEW' : 'EDITING'}</span>
          </div>
        </div>

        {/* Form Side */}
        <div className={`w-full lg:w-1/2 overflow-y-auto p-5 md:p-10 border-r bg-white transition-all ${showMobilePreview ? 'hidden lg:block' : 'block'}`}>
          <div className="max-w-xl mx-auto">
            <div className="mb-6 md:mb-10 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">Build Your Biodata</h2>
              <p className="text-tertiary text-sm md:text-base">Step {step} of 3: {step === 1 ? 'Personal Details' : step === 2 ? 'Family Details' : 'Contact Information'}</p>
              
              {/* Progress Bar */}
              <div className="flex gap-2 mt-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1.5 md:h-2 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-primary' : 'bg-gray-100'}`} />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                {step === 1 && (
                  <PersonalInfoForm 
                    data={data} 
                    updateField={updateField}
                    updateFieldLabel={updateFieldLabel}
                    moveField={moveField}
                    removeField={removeField}
                    addField={addField}
                    updateSectionTitle={updateSectionTitle}
                    removeSection={removeSection}
                    updateMainTitle={updateMainTitle}
                    updateHeader={updateHeader}
                    addHeader={addHeader}
                    removeHeader={removeHeader}
                    moveHeader={moveHeader}
                    updatePhotoUrl={updatePhotoUrl}
                    onSymbolSelect={onSymbolSelect} 
                    updateHeadingVisibility={updateHeadingVisibility}
                  />
                )}
                {step === 2 && (
                  <div className="space-y-6">
                    <FamilyInfoForm 
                      data={data} 
                      updateField={updateField}
                      updateFieldLabel={updateFieldLabel}
                      moveField={moveField}
                      removeField={removeField}
                      addField={addField}
                      updateSectionTitle={updateSectionTitle}
                      removeSection={removeSection}
                    />
                    {data.sections.filter(s => s.id !== 'personal' && s.id !== 'family' && s.id !== 'contact').map(section => (
                      <FormSection 
                        key={section.id} 
                        title={section.title} 
                        onTitleChange={(title) => updateSectionTitle(section.id, title)}
                        onDelete={() => removeSection(section.id)}
                      >
                        {section.fields.map((field, index) => (
                          <ModernField 
                            key={field.id}
                            label={field.label}
                            onDelete={() => removeField(section.id, field.id)}
                            onMoveUp={() => moveField(section.id, index, 'up')}
                            onMoveDown={() => moveField(section.id, index, 'down')}
                            onLabelChange={(label) => updateFieldLabel(section.id, field.id, label)}
                          >
                            <SimpleInput 
                              value={field.value} 
                              onChange={(v) => updateField(section.id, field.id, v)} 
                              placeholder={field.label}
                            />
                          </ModernField>
                        ))}
                        <div className="p-4">
                          <button 
                            onClick={() => addField(section.id)}
                            className="w-full py-3 rounded-xl border-2 border-dashed border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
                          >
                            + Add Field
                          </button>
                        </div>
                      </FormSection>
                    ))}
                    <button 
                      onClick={addSection}
                      className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-sm uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-emerald-50 transition-all shadow-sm"
                    >
                      + Add New Section
                    </button>
                  </div>
                )}
                {step === 3 && (
                  <ContactInfoForm 
                    data={data} 
                    updateField={updateField}
                    updateFieldLabel={updateFieldLabel}
                    moveField={moveField}
                    removeField={removeField}
                    addField={addField}
                    updateSectionTitle={updateSectionTitle}
                    removeSection={removeSection}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 mb-20 flex gap-4">
              {step > 1 && (
                <button 
                  onClick={() => setStep(s => s - 1)}
                  className="flex-1 border-2 border-gray-100 py-4 rounded-xl font-bold text-tertiary hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
              )}
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (step < 3) setStep(s => s + 1);
                  else handleFinish();
                }}
                className="flex-[2] primary-gradient text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
              >
                {step === 3 ? (isGenerating ? 'Generating...' : 'Generate Biodata') : 'Save & Continue'} <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Preview Side */}
        <div className={`w-full lg:w-1/2 bg-gray-100 items-start justify-center p-4 md:p-8 lg:p-12 overflow-y-auto ${showMobilePreview ? 'flex' : 'hidden lg:flex'}`}>
          <div className="sticky top-0 w-full max-w-[450px]">
            <div className="flex bg-white p-2 rounded-xl shadow-sm mb-4 md:mb-6 border border-gray-200 justify-center">
              <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-wider">Traditional A4 Template</span>
            </div>

            <p className="hidden md:block text-center text-[10px] font-black text-tertiary uppercase tracking-[0.2em] mb-4">Live Editing Mode — {template}</p>
            
            <div className="transform scale-[0.85] md:scale-100 origin-top">
              <A4Page>
                <TraditionalLayout 
                  data={data} 
                  symbol={getSymbol()} 
                  activeTheme={activeTheme} 
                />
              </A4Page>
            </div>

            <div className="h-20 lg:hidden" /> {/* Spacer for mobile */}
          </div>
        </div>
      </div>

      {/* Actual Hidden Layout for Printing */}
      <div className="absolute top-[-9999px] left-0 w-[210mm] pointer-events-none" data-print-container>
        <div ref={printRef} style={{ backgroundColor: '#ffffff' }}>
          <A4Page isPrint className="!shadow-none !m-0 !border-none">
             <TraditionalLayout 
              data={data} 
              symbol={getSymbol()} 
              activeTheme={activeTheme} 
            />
          </A4Page>
        </div>
      </div>
    </div>
  );
}
