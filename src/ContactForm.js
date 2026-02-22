import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ contactType, title, description }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('El nombre es requerido');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('El correo electrónico es requerido');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Por favor ingresa un correo electrónico válido');
      return false;
    }
    if (!formData.mobile.trim()) {
      setErrorMessage('El número de teléfono es requerido');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage('El mensaje es requerido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'https://your-api-endpoint.execute-api.region.amazonaws.com/prod';
      const response = await fetch(`${apiEndpoint}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactType: contactType,
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobile: formData.mobile.trim(),
          message: formData.message.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar el formulario');
      }

      // Success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Ocurrió un error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h4>{title || 'Envíanos un mensaje'}</h4>
      
      {submitStatus === 'success' && (
        <div className="form-message form-message-success">
          ¡Mensaje enviado exitosamente! Te contactaremos pronto.
        </div>
      )}

      {submitStatus === 'error' && errorMessage && (
        <div className="form-message form-message-error">
          {errorMessage}
        </div>
      )}

      <div className="form-group">
        <label htmlFor={`nombre-${contactType}`}>Nombre completo:</label>
        <input
          type="text"
          id={`nombre-${contactType}`}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor={`email-${contactType}`}>Correo electrónico:</label>
        <input
          type="email"
          id={`email-${contactType}`}
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="juan@gmail.com"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor={`mobile-${contactType}`}>Número de teléfono:</label>
        <input
          type="tel"
          id={`mobile-${contactType}`}
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="+52 123 456 7890"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor={`mensaje-${contactType}`}>Mensaje:</label>
        <textarea
          id={`mensaje-${contactType}`}
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          placeholder="Escribe tu mensaje..."
          required
          disabled={isSubmitting}
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={isSubmitting ? 'submitting' : ''}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
};

export default ContactForm;
