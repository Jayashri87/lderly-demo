import * as React from "react";
import { Sparkles, Mic, Send, X, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI, Type } from "@google/genai";
import { cn } from "@/src/lib/utils";

interface SmartAssistantProps {
  onAddMedication: (med: any) => void;
  onAddAppointment: (app: any) => void;
}

export const SmartAssistant = ({ onAddMedication, onAddAppointment }: SmartAssistantProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hello! I can help you add a medication or a doctor's visit. Just tell me what you need, like 'I need to take 500mg of Aspirin twice a day at 8am and 8pm'." }
  ]);

  const [isListening, setIsListening] = React.useState(false);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: `You are a helpful assistant for seniors. Your job is to extract medication or appointment details from their text.
          If they mention a medication, extract: name, dosage, frequency, and times (array of HH:mm).
          If they mention an appointment, extract: title, doctor, date (YYYY-MM-DD), time (HH:mm), and location.
          Return a JSON object with a 'type' field ('medication' or 'appointment') and the extracted data.
          If you can't find enough info, ask a friendly follow-up question.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ["medication", "appointment", "question"] },
              data: { type: Type.OBJECT },
              message: { type: Type.STRING }
            }
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      
      if (result.type === 'medication') {
        onAddMedication(result.data);
        setMessages(prev => [...prev, { role: 'ai', text: `Got it! I've added ${result.data.name} to your list.` }]);
      } else if (result.type === 'appointment') {
        onAddAppointment({ ...result.data, date: new Date(`${result.data.date}T${result.data.time}`) });
        setMessages(prev => [...prev, { role: 'ai', text: `All set! I've scheduled your visit for ${result.data.title}.` }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: result.message || "I'm not sure I got that. Could you tell me more?" }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I'm having a little trouble right now. Could you try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-28 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-0 border-4 border-white"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex flex-col bg-slate-50 md:inset-auto md:bottom-28 md:right-6 md:w-96 md:h-[600px] md:rounded-3xl md:shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-xl font-black">Smart Assistant</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full p-2">
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-lg font-medium",
                    msg.role === 'user' ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none shadow-sm"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <Button
                variant="outline"
                onClick={startListening}
                className={cn(
                  "rounded-xl px-4",
                  isListening && "bg-red-50 border-red-200 text-red-500 animate-pulse"
                )}
              >
                <Mic className="w-6 h-6" />
              </Button>
              <input
                type="text"
                placeholder="Type or speak..."
                className="flex-1 px-4 py-3 bg-slate-100 rounded-xl outline-none text-lg font-medium focus:ring-2 focus:ring-blue-500/20"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend} disabled={isLoading} className="rounded-xl px-4">
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
