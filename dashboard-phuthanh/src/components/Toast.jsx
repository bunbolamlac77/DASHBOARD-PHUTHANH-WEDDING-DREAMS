import React from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

/**
 * Toast Notification Component
 * 
 * Usage:
 * <Toast 
 *   message="Success message" 
 *   type="success" 
 *   onClose={() => setShowToast(false)}
 * />
 */
const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgClass: 'bg-success/90',
      borderClass: 'border-success/20',
      iconColor: 'text-white'
    },
    error: {
      icon: AlertCircle,
      bgClass: 'bg-red-500/90',
      borderClass: 'border-red-500/20',
      iconColor: 'text-white'
    },
    warning: {
      icon: AlertTriangle,
      bgClass: 'bg-warning/90',
      borderClass: 'border-warning/20',
      iconColor: 'text-white'
    },
    info: {
      icon: Info,
      bgClass: 'bg-blue-500/90',
      borderClass: 'border-blue-500/20',
      iconColor: 'text-white'
    }
  };

  const currentConfig = config[type] || config.info;
  const IconComponent = currentConfig.icon;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className={`${currentConfig.bgClass} backdrop-blur-xl text-white px-6 py-3 rounded-2xl shadow-2xl border ${currentConfig.borderClass} flex items-center gap-3 min-w-[300px] max-w-md`}>
        <IconComponent size={20} className={currentConfig.iconColor} />
        <span className="font-medium flex-1">{message}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="hover:bg-white/10 p-1 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
