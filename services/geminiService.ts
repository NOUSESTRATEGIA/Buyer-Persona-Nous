import { GoogleGenAI } from "@google/genai";
import { PersonaFormData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePersonaPrompt = (data: PersonaFormData): string => {
  return `
    Actúa como un experto estratega de marketing. Basándote en la siguiente información, crea un "buyer persona" detallado para la empresa "${data.companyName}".

    **Información de la Empresa:**
    - Nombre: ${data.companyName}
    - Descripción: ${data.companyInfo}

    **Información del Producto/Servicio:**
    ${data.productInfo}

    **Datos del Cliente Objetivo:**
    - **Datos Demográficos:**
      - Edad: ${data.demographics.age}
      - Género: ${data.demographics.gender}
      - Ubicación: ${data.demographics.location}
      - Nivel de Ingresos: ${data.demographics.income}
    - **Perfil Profesional:**
      - Cargo: ${data.professional.jobTitle}
      - Industria: ${data.professional.industry}
      - Responsabilidades clave: ${data.professional.responsibilities}
    - **Metas y Objetivos:** ${data.goals}
    - **Desafíos y Puntos de Dolor:** ${data.challenges}
    - **Valores y Motivaciones:** ${data.values}

    **Tu Tarea:**
    1.  Dale al persona un nombre realista y un apellido.
    2.  Escribe una breve historia o "un día en su vida" para darle contexto.
    3.  Crea un perfil completo que sintetice toda la información proporcionada.
    4.  Organiza el perfil en secciones claras: "Perfil Demográfico", "Rol Profesional", "Metas", "Desafíos", y "Valores y Motivaciones".
    5.  El tono debe ser profesional, perspicaz y fácil de entender.
    6.  Finalmente, en una nueva línea y sin ningún otro texto, escribe una descripción visual detallada de esta persona para un generador de imágenes de IA. Esta descripción debe incluir género, edad aproximada, etnia, estilo de cabello, ropa (adecuada para su profesión) y una expresión facial que refleje su personalidad (ej. confiado, pensativo, amigable). Por ejemplo: "Un hombre de 45 años, caucásico, con cabello corto y canoso, vestido con una camisa de negocios, con una expresión segura y amigable, en un entorno de oficina moderno."
  `;
};

export const generatePersona = async (formData: PersonaFormData): Promise<{ text: string; imagePrompt: string }> => {
  try {
    const prompt = generatePersonaPrompt(formData);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });

    const fullText = response.text.trim();
    const parts = fullText.split('\n');
    const imagePrompt = parts.pop() || 'A professional person';
    const personaText = parts.join('\n').trim();

    return { text: personaText, imagePrompt };
  } catch (error) {
    console.error("Error generating persona text:", error);
    throw new Error("Failed to generate persona description. Please try again.");
  }
};

export const generatePersonaImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `Genera un retrato fotorrealista y profesional de la siguiente persona: ${prompt}. La imagen debe ser un primer plano (headshot), de alta calidad y adecuada para un documento de negocios.`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating persona image:", error);
    throw new Error("Failed to generate persona image. Please try again.");
  }
};