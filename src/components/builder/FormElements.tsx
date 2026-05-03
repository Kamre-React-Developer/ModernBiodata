import React, { useRef } from 'react';
import { ChevronUp, ChevronDown, Trash2, Pencil, Image as ImageIcon, Upload } from 'lucide-react';

interface FormSectionProps {
  title: string;
  isOpen?: boolean;
  onToggle?: () => void;
  onTitleChange?: (newTitle: string) => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

export function ImageUpload({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer w-32 h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-rose-300 hover:bg-rose-50/30 transition-all overflow-hidden"
      >
        {value ? (
          <>
            <img src={value} className="w-full h-full object-cover" alt="Preview" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Upload className="text-white" size={24} />
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-rose-500">
              <ImageIcon size={20} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Choose Photo</p>
          </>
        )}
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      {value && (
        <button 
          onClick={() => onChange('')}
          className="text-[10px] font-bold text-rose-500 uppercase tracking-widest hover:underline"
        >
          Remove Photo
        </button>
      )}
    </div>
  );
}

export const FormSection: React.FC<FormSectionProps> = ({ title, isOpen = true, onToggle, onTitleChange, onDelete, children }) => {
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6 soft-shadow">
      <div 
        className="bg-gray-50/50 px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 flex-1" onClick={(e) => { e.stopPropagation(); setIsEditingTitle(true); }}>
          {isEditingTitle ? (
            <input 
              autoFocus
              className="text-lg font-bold text-on-surface bg-transparent border-b-2 border-rose-500 outline-none w-full"
              value={title}
              onChange={e => onTitleChange?.(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={e => e.key === 'Enter' && setIsEditingTitle(false)}
            />
          ) : (
            <>
              <h3 className="font-display font-bold text-lg text-on-surface">{title}</h3>
              <div className="w-5 h-5 bg-rose-50 rounded-full flex items-center justify-center">
                <Pencil size={10} className="text-rose-500" />
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {onDelete && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm"
              title="Delete Section"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button 
            onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
            className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-rose-500 shadow-sm"
          >
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="p-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

interface ModernFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
  onLabelChange?: (newLabel: string) => void;
}

export const ModernField: React.FC<ModernFieldProps> = ({ label, required, children, onMoveUp, onMoveDown, onDelete, onLabelChange }) => {
  const [isEditingLabel, setIsEditingLabel] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 px-4 py-4 hover:bg-gray-50/50 rounded-xl transition-colors group">
      <div className="w-full md:w-1/3 flex items-center gap-2">
        {isEditingLabel ? (
          <input 
            autoFocus
            className="text-sm font-bold text-slate-700 bg-transparent border-b border-rose-500 outline-none w-full"
            value={label}
            onChange={e => onLabelChange?.(e.target.value)}
            onBlur={() => setIsEditingLabel(false)}
            onKeyDown={e => e.key === 'Enter' && setIsEditingLabel(false)}
          />
        ) : (
          <label 
            className="text-sm font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer flex-1"
            onClick={() => setIsEditingLabel(true)}
          >
            {label}
            <Pencil size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            {required && <span className="text-rose-500">*</span>}
          </label>
        )}
      </div>
      
      <div className="flex-1">
        {children}
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <ActionButton icon={<ChevronUp size={14} />} onClick={onMoveUp} />
        <ActionButton icon={<ChevronDown size={14} />} onClick={onMoveDown} />
        <ActionButton icon={<Trash2 size={14} />} onClick={onDelete} isDelete />
      </div>
    </div>
  );
}

function ActionButton({ icon, onClick, isDelete = false }: { icon: React.ReactNode, onClick?: () => void, isDelete?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${isDelete ? 'text-slate-400 hover:text-rose-500 hover:bg-rose-50' : 'text-slate-400 hover:text-primary hover:bg-emerald-50'}`}
    >
      {icon}
    </button>
  );
}

interface InputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

export function SimpleInput({ value, onChange, placeholder, type = "text" }: InputProps) {
  return (
    <input 
      type={type} 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder}
      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none text-on-surface"
    />
  );
}

export function TextArea({ value, onChange, placeholder }: { value: string, onChange: (v: string) => void, placeholder?: string }) {
  return (
    <textarea 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder}
      rows={3}
      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none text-on-surface"
    />
  );
}
