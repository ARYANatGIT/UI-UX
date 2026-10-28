import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
  autoCloseMs?: number;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss, autoCloseMs = 3500 }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, autoCloseMs);
    return () => clearTimeout(timer);
  }, [toast, onDismiss, autoCloseMs]);

  if (!toast) return null;

  return (
    <div className={`toast-banner toast-banner--${toast.type}`} role="status" aria-live="polite">
      <div className="toast-icon">
        {toast.type === 'success' && <CheckCircle2 size={18} aria-hidden="true" />}
        {toast.type === 'error' && <AlertCircle size={18} aria-hidden="true" />}
        {toast.type === 'info' && <Info size={18} aria-hidden="true" />}
      </div>
      <p className="toast-text">{toast.message}</p>
      <button 
        type="button" 
        onClick={onDismiss} 
        className="toast-close" 
        aria-label="Dismiss notification"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

