import React from 'react';
import { Biodata } from '../../types';
import { FormSection, ModernField, SimpleInput, TextArea } from './FormElements';

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

export function FamilyInfoForm({ data, updateField, updateFieldLabel, moveField, removeField, addField, updateSectionTitle, removeSection }: Props) {
  const section = data.sections.find(s => s.id === 'family')!;

  return (
    <FormSection 
      title={section.title} 
      onTitleChange={(newTitle) => updateSectionTitle('family', newTitle)} 
      onToggle={() => {}}
      onDelete={() => removeSection('family')}
    >
      {section.fields.map((field, index) => (
        <ModernField 
          key={field.id}
          label={field.label}
          required={field.required}
          onMoveUp={() => moveField('family', index, 'up')}
          onMoveDown={() => moveField('family', index, 'down')}
          onDelete={() => removeField('family', field.id)}
          onLabelChange={(newLabel) => updateFieldLabel('family', field.id, newLabel)}
        >
          {field.isLong ? (
            <TextArea 
              value={field.value} 
              onChange={v => updateField('family', field.id, v)} 
              placeholder={field.label} 
            />
          ) : (
            <SimpleInput 
              type={field.type}
              value={field.value} 
              onChange={v => updateField('family', field.id, v)} 
              placeholder={field.label} 
            />
          )}
        </ModernField>
      ))}
      <div className="p-4">
        <button 
          onClick={() => addField('family')}
          className="w-full py-3 rounded-xl border-2 border-dashed border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-emerald-50 transition-all"
        >
          + Add New Family Field
        </button>
      </div>
    </FormSection>
  );
}
