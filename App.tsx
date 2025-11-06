import React, { useState } from 'react';
import { PersonaForm } from './components/PersonaForm';
import { PersonaDisplay } from './components/PersonaDisplay';
import { Loader } from './components/Loader';
import { generatePersona, generatePersonaImage } from './services/geminiService';
import type { PersonaFormData, PersonaResult } from './types';

const initialFormData: PersonaFormData = {
  companyName: '',
  companyInfo: '',
  productInfo: '',
  demographics: {
    age: '',
    gender: '',
    location: '',
    income: '',
  },
  professional: {
    jobTitle: '',
    industry: '',
    responsibilities: '',
  },
  goals: '',
  challenges: '',
  values: '',
};

const Logo: React.FC = () => (
    <div className="flex items-center justify-center gap-2 mb-4">
       <div className="text-3xl font-black tracking-tighter text-slate-800 dark:text-slate-200">NOUS</div>
       <div className="text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400 border-t-2 border-b-2 border-slate-800 dark:border-slate-200 py-1">Estrategia</div>
    </div>
);


function App() {
  const [formData, setFormData] = useState<PersonaFormData>(initialFormData);
  const [personaResult, setPersonaResult] = useState<PersonaResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPersonaResult(null);

    try {
      const { text, imagePrompt } = await generatePersona(formData);
      const imageUrl = await generatePersonaImage(imagePrompt);
      setPersonaResult({ text, imageUrl });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setPersonaResult(null);
    setError(null);
  };
  
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
        return (
            <div className="p-8 text-center bg-red-500/10 border-l-4 border-red-500 text-red-600 dark:text-red-400 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-2">Ocurrió un Error</h3>
                <p>{error}</p>
                <button 
                    onClick={handleReset} 
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Intentar de Nuevo
                </button>
            </div>
        );
    }
    if (personaResult) {
      return <PersonaDisplay result={personaResult} companyName={formData.companyName} onReset={handleReset} />;
    }
    return <PersonaForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} isLoading={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10 print-hide">
          <Logo />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
            Generador de Buyer Persona
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Completa los siguientes campos para que nuestra IA cree un perfil detallado y realista de tu cliente ideal.
          </p>
        </header>
        <main>
            {renderContent()}
        </main>
        <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-500 print-hide">
            <p>Potenciado por la API de Google Gemini.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;