import React from 'react';
import { useToast } from '../contexts/ToastContext';
import './ToastContainer.css';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          <div className="toast-content">
            <div className="toast-icon">
              {toast.type === 'success' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              {toast.type === 'error' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              {toast.type === 'info' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 16v-4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8h.01" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              {toast.type === 'warning' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </div>
            <span className="toast-message">{toast.message}</span>
          </div>
          <button className="toast-close" onClick={(e) => { e.stopPropagation(); removeToast(toast.id); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
