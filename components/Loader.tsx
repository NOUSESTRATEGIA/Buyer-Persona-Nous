import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Analizando los datos de tu empresa...",
  "Dando forma a la personalidad de tu cliente...",
  "Investigando sus metas y desafíos...",
  "Creando un perfil detallado...",
  "Generando una imagen realista...",
  "Casi listo, afinando los últimos detalles..."
];

export const Loader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl text-center">
      <svg className="w-16 h-16 mb-4 text-teal-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">La IA está trabajando...</h2>
      <p className="text-slate-600 dark:text-slate-400 transition-opacity duration-500 ease-in-out">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};