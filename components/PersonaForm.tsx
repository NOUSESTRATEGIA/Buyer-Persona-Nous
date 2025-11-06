import React from 'react';
import type { PersonaFormData } from '../types';

interface PersonaFormProps {
  formData: PersonaFormData;
  setFormData: React.Dispatch<React.SetStateAction<PersonaFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
    <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
  </div>
);

const FormInput: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string }> = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-slate-900 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
      required
    />
  </div>
);

const FormTextarea: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string; rows?: number }> = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 text-slate-900 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
      required
    />
  </div>
);

export const PersonaForm: React.FC<PersonaFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 2) {
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0] as keyof Omit<PersonaFormData, 'companyName' | 'companyInfo' | 'productInfo' | 'goals' | 'challenges' | 'values'>],
          [keys[1]]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-black">
        <SectionTitle title="Información del Negocio" subtitle="Cuéntanos sobre la empresa y lo que ofrece." />
        <div className="space-y-4">
          <FormInput label="Nombre de tu empresa" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Ej: Nous Estrategia" />
          <FormTextarea label="Describe tu empresa" name="companyInfo" value={formData.companyInfo} onChange={handleInputChange} placeholder="Ej: Una startup tecnológica que desarrolla software SaaS para pequeñas empresas." />
          <FormTextarea label="Describe tu producto o servicio" name="productInfo" value={formData.productInfo} onChange={handleInputChange} placeholder="Ej: Una herramienta de gestión de proyectos intuitiva y asequible." />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-black">
        <SectionTitle title="Perfil Demográfico" subtitle="¿Quién es tu cliente ideal a nivel básico?" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput label="Rango de Edad" name="demographics.age" value={formData.demographics.age} onChange={handleInputChange} placeholder="Ej: 30-45 años" />
          <FormInput label="Género" name="demographics.gender" value={formData.demographics.gender} onChange={handleInputChange} placeholder="Ej: Femenino" />
          <FormInput label="Ubicación Geográfica" name="demographics.location" value={formData.demographics.location} onChange={handleInputChange} placeholder="Ej: Grandes ciudades de Latinoamérica" />
          <FormInput label="Nivel de Ingresos" name="demographics.income" value={formData.demographics.income} onChange={handleInputChange} placeholder="Ej: Medio-alto" />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-black">
        <SectionTitle title="Perfil Profesional" subtitle="Detalles sobre su vida laboral." />
        <div className="space-y-4">
          <FormInput label="Cargo o Título Profesional" name="professional.jobTitle" value={formData.professional.jobTitle} onChange={handleInputChange} placeholder="Ej: Gerente de Marketing" />
          <FormInput label="Industria" name="professional.industry" value={formData.professional.industry} onChange={handleInputChange} placeholder="Ej: Tecnología / Software" />
          <FormTextarea label="Responsabilidades Clave" name="professional.responsibilities" value={formData.professional.responsibilities} onChange={handleInputChange} placeholder="Ej: Supervisar campañas, gestionar el presupuesto, liderar un equipo." />
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-black">
        <SectionTitle title="Psicografía" subtitle="Entiende sus motivaciones internas." />
        <div className="space-y-4">
          <FormTextarea label="Metas y Objetivos" name="goals" value={formData.goals} onChange={handleInputChange} placeholder="Ej: Aumentar la eficiencia de su equipo, demostrar el ROI de sus acciones." />
          <FormTextarea label="Desafíos y Puntos de Dolor" name="challenges" value={formData.challenges} onChange={handleInputChange} placeholder="Ej: Falta de tiempo, herramientas complejas, presupuestos ajustados." />
          <FormTextarea label="Valores y Motivaciones" name="values" value={formData.values} onChange={handleInputChange} placeholder="Ej: Eficiencia, innovación, crecimiento profesional." />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 font-bold text-white bg-teal-600 rounded-md shadow-lg hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/50 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
        >
          {isLoading ? 'Generando...' : 'Generar Buyer Persona'}
        </button>
      </div>
    </form>
  );
};