import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const models = [
  {
    name: "IA de Análisis Predictivo",
    description: "Analiza datos históricos para predecir tendencias en ventas y mercado, permitiendo tomar decisiones estratégicas con antelación.",
  },
  {
    name: "IA de Optimización Empresarial",
    description: "Automatiza procesos internos, analiza costos y mejora la eficiencia operativa mediante inteligencia artificial.",
  },
  {
    name: "IA de Comportamiento del Consumidor",
    description: "Estudia las preferencias y hábitos de los clientes para ofrecer productos y servicios más alineados con sus necesidades.",
  },
];

export default function LandingPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://getform.io/f/anlqxnpa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-blue-400">Modelos de IA para PYMES</h1>
        <p className="text-lg mt-2 text-gray-300">Descubre cómo la inteligencia artificial puede impulsar tu negocio.</p>
      </header>
      
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto py-10">
        {models.map((model, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
            <Card className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <CardContent>
                <h2 className="text-xl font-semibold text-blue-300">{model.name}</h2>
                <p className="text-gray-400 mt-2">{model.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-3xl text-center text-blue-400 font-bold">Contacto</h2>
        <p className="text-center text-gray-300 mt-2">Déjanos tu información y te contactaremos.</p>
        <form className="bg-gray-800 p-6 rounded-lg mt-6 shadow-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input type="text" placeholder="Nombre" name="name" value={form.name} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white" required />
          </div>
          <div className="mb-4">
            <Input type="email" placeholder="Correo electrónico" name="email" value={form.email} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white" required />
          </div>
          <div className="mb-4">
            <Textarea placeholder="Mensaje" name="message" value={form.message} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white" required />
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">Enviar</Button>
        </form>
        {submitted && <p className="text-center text-green-400 mt-4">Mensaje enviado correctamente.</p>}
      </section>
    </div>
  );
}
