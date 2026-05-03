import React from 'react';
import { Send } from 'lucide-react';
import { Biodata } from '../../types';
import { FormSection, ModernField, SimpleInput } from './FormElements';

interface Props {
  data: Biodata;
  updateField: (sectionId: string, fieldId: string, value: string) => void;
  updateFieldLabel: (sectionId: string, fieldId: string, label: string) => void;
  moveField: (sectionId: string, index: number, direction: 'up' | 'down') => void;
  removeField: (sectionId: string, fieldId: string) => void;
  addField: (sectionId: string) => void;
  updateSectionTitle: (sectionId: string, title: string) => void;
  removeSection: (sectionId: string) => void;
}

export function ContactInfoForm({ data, updateField, updateFieldLabel, moveField, removeField, addField, updateSectionTitle, removeSection }: Props) {
  const section = data.sections.find(s => s.id === 'contact')!;

  return (
    <FormSection 
      title={section.title} 
      onTitleChange={(newTitle) => updateSectionTitle('contact', newTitle)} 
      onToggle={() => {}}
      onDelete={() => removeSection('contact')}
    >
      {section.fields.map((field, index) => (
        <ModernField 
          key={field.id}
          label={field.label}
          required={field.required}
          onMoveUp={() => moveField('contact', index, 'up')}
          onMoveDown={() => moveField('contact', index, 'down')}
          onDelete={() => removeField('contact', field.id)}
          onLabelChange={(newLabel) => updateFieldLabel('contact', field.id, newLabel)}
        >
          <SimpleInput 
            type={field.type}
            value={field.value} 
            onChange={v => updateField('contact', field.id, v)} 
            placeholder={field.label} 
          />
        </ModernField>
      ))}
      <div className="p-4">
        <button 
          onClick={() => addField('contact')}
          className="w-full py-3 rounded-xl border-2 border-dashed border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-emerald-50 transition-all"
        >
          + Add New Contact Field
        </button>
      </div>
      
    </FormSection>
  );
}
