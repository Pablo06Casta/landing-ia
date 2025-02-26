import React, { useState } from "react";

const Form = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
      alert("Formulario enviado correctamente.");
      setForm({ name: "", email: "", message: "" });
    } else {
      alert("Hubo un error al enviar el formulario.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
      <textarea name="message" placeholder="Mensaje" onChange={handleChange} required />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;