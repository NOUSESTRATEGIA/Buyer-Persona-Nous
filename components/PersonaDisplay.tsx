import React from 'react';
import type { PersonaResult } from '../types';

interface PersonaDisplayProps {
  result: PersonaResult;
  companyName: string;
  onReset: () => void;
}

// A component to clean and render text, removing unwanted formatting
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  // Clean the text by removing unwanted markdown/formatting characters
  const cleanedText = text
    .replace(/·/g, '') // Remove center dots
    .replace(/\*/g, '') // Remove all asterisks (from bold, lists, etc.)
    .replace(/#/g, '')  // Remove hash symbols (from headers)
    .replace(/={2,}/g, '') // Remove dividers like ==, ===, etc.
    .replace(/-{2,}/g, ''); // Remove dividers like --, ---, etc.

  return (
    <>
      {cleanedText.split('\n').map((paragraph, index) => {
        const trimmedParagraph = paragraph.trim();
        // Don't render empty paragraphs that might result from cleaning
        if (!trimmedParagraph) return null; 
        
        return (
          <p key={index} className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            {trimmedParagraph}
          </p>
        );
      })}
    </>
  );
};

const Logo: React.FC = () => (
    <div className="flex items-center justify-start gap-2">
       <div className="text-3xl font-black tracking-tighter text-slate-800 dark:text-slate-200">NOUS</div>
       <div className="text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400 border-t-2 border-b-2 border-slate-800 dark:border-slate-200 py-1">Estrategia</div>
    </div>
);


export const PersonaDisplay: React.FC<PersonaDisplayProps> = ({ result, companyName, onReset }) => {
  const handleDownload = () => {
    window.print();
  };
  
  return (
    <div className="p-4 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl print:shadow-none animate-fade-in print-container">
      <div className="hidden print:block mb-8">
        <Logo />
        <h2 className="text-xl font-bold mt-4">Buyer Persona para: {companyName}</h2>
        <hr className="my-4"/>
      </div>
      {/* For printing, we disable the grid layout and let items stack vertically to ensure all content is visible */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src={result.imageUrl}
            alt="Buyer Persona"
            className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full shadow-lg print:shadow-none border-4 border-teal-300/50 dark:border-teal-500/50 mb-6"
          />
          <div className="w-full space-y-3 print-hide">
             <button
              onClick={handleDownload}
              className="w-full px-6 py-3 font-bold text-white bg-cyan-600 rounded-md shadow-lg hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 ease-in-out"
            >
              Guardar como PDF
            </button>
            <button
              onClick={onReset}
              className="w-full px-6 py-3 font-bold text-white bg-teal-600 rounded-md shadow-lg hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/50 transition-all duration-300 ease-in-out"
            >
              Crear Otro Persona
            </button>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
            Perfil del Buyer Persona
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
             <FormattedText text={result.text} />
          </div>
        </div>
      </div>
    </div>
  );
};