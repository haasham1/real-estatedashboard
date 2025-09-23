import React, { useState } from 'react';
import { Property } from '../types/Property';
import { useToast } from '../contexts/ToastContext';
import './ContactModal.css';

interface ContactModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ property, isOpen, onClose }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'general'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      addToast('Your inquiry has been sent successfully! We\'ll get back to you soon.', 'success');
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        inquiryType: 'general'
      });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Contact About Property</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        <div className="property-summary">
          <img src={property.image} alt={property.title} />
          <div className="property-info">
            <h3>{property.title}</h3>
            <div className="property-price">{formatPrice(property.price)}</div>
            <div className="property-details">
              {property.bedrooms} bed • {property.bathrooms} bath • {property.location}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inquiryType">Inquiry Type</label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
              >
                <option value="general">General Inquiry</option>
                <option value="viewing">Schedule Viewing</option>
                <option value="offer">Make an Offer</option>
                <option value="financing">Financing Questions</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your interest in this property..."
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
