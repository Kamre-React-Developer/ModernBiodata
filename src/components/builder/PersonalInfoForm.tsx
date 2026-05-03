import React from 'react';
import { Biodata } from '../../types';
import { FormSection, ModernField, SimpleInput, ImageUpload } from './FormElements';

interface Props {
  data: Biodata;
  updateField: (sectionId: string, fieldId: string, value: string) => void;
  updateFieldLabel: (sectionId: string, fieldId: string, label: string) => void;
  moveField: (sectionId: string, index: number, direction: 'up' | 'down') => void;
  removeField: (sectionId: string, fieldId: string) => void;
  addField: (sectionId: string) => void;
  updateSectionTitle: (sectionId: string, title: string) => void;
  updateHeader: (index: number, value: string) => void;
  addHeader: () => void;
  removeHeader: (index: number) => void;
  moveHeader: (index: number, direction: 'up' | 'down') => void;
  updatePhotoUrl: (value: string) => void;
  updateMainTitle: (value: string) => void;
  onSymbolSelect: (id: string) => void;
  updateHeadingVisibility: (visible: boolean) => void;
  removeSection: (sectionId: string) => void;
}

export function PersonalInfoForm({ 
  data, updateField, updateFieldLabel, moveField, removeField, addField, updateSectionTitle, 
  updateHeader, addHeader, removeHeader, moveHeader, updatePhotoUrl, updateMainTitle, onSymbolSelect,
  updateHeadingVisibility, removeSection
}: Props) {
  const section = data.sections.find(s => s.id === 'personal')!;

  const symbols = [
    { id: 'none', label: 'None' },
    { id: 'ganesha', label: 'ॐ गणेश', icon: '🕉️' },
    { id: 'swastika', label: '卐', icon: '卐' },
    { id: 'om', label: 'ॐ', icon: 'ॐ' },
    { id: 'shree', label: 'श्री', icon: 'श्री' },
    { id: 'bismillah', label: '﷽', icon: '﷽' },
    { id: 'crescent', label: '🌙☪️', icon: '☪️' },
    { id: '786', label: '786', icon: '786' }
  ];

  return (
    <div className="space-y-6">
      <FormSection title="Header Settings">
        <div className="mt-2">
          <ModernField label="Main Title">
            <SimpleInput 
              value={data.mainTitle || ""} 
              onChange={updateMainTitle} 
              placeholder="e.g. Biodata For Marriage" 
            />
          </ModernField>
          
          <ModernField label="Choose Symbol">
            <div className="flex flex-wrap gap-2">
              {symbols.map(s => (
                <button
                  key={s.id}
                  onClick={() => onSymbolSelect(s.id)}
                  className={`px-3 py-1.5 rounded-lg border transition-all text-xs font-semibold ${data.symbol === s.id ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </ModernField>
          
          {data.headers.map((header, index) => (
            <ModernField 
              key={index} 
              label={`Heading Line ${index + 1}`}
              onMoveUp={() => moveHeader(index, 'up')}
              onMoveDown={() => moveHeader(index, 'down')}
              onDelete={() => removeHeader(index)}
            >
              <SimpleInput 
                value={header} 
                onChange={v => updateHeader(index, v)} 
                placeholder="e.g. || Shree Ganeshay Namah ||" 
              />
            </ModernField>
          ))}
          
          <div className="px-4 pb-4">
            <button 
              onClick={addHeader}
              className="w-full py-2 rounded-lg border border-dashed border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-all"
            >
              + Add Another Heading Line
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <ModernField label="Profile Photo">
            <ImageUpload value={data.photoUrl} onChange={updatePhotoUrl} />
          </ModernField>
        </div>
      </FormSection>

      <FormSection 
        title={section.title} 
        onTitleChange={(newTitle) => updateSectionTitle('personal', newTitle)} 
        onToggle={() => {}}
        onDelete={() => removeSection('personal')}
      >
        {section.fields.map((field, index) => (
          <ModernField 
            key={field.id}
            label={field.label}
            required={field.required}
            onMoveUp={() => moveField('personal', index, 'up')}
            onMoveDown={() => moveField('personal', index, 'down')}
            onDelete={() => removeField('personal', field.id)}
            onLabelChange={(newLabel) => updateFieldLabel('personal', field.id, newLabel)}
          >
            <SimpleInput 
              type={field.type}
              value={field.value} 
              onChange={v => updateField('personal', field.id, v)} 
              placeholder={field.label} 
            />
          </ModernField>
        ))}
        <div className="p-4">
          <button 
            onClick={() => addField('personal')}
            className="w-full py-3 rounded-xl border-2 border-dashed border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-emerald-50 transition-all"
          >
            + Add New Personal Field
          </button>
        </div>
      </FormSection>
    </div>
  );
}
