import React, { useCallback, useState, createContext, useContext } from 'react';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export type ToastType = 'success' | 'info' | 'error';
interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}
interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
export const ToastProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [
    ...prev,
    {
      id,
      message,
      type
    }]
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  return (
    <ToastContext.Provider
      value={{
        addToast
      }}>
      
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) =>
          <motion.div
            key={toast.id}
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: {
                duration: 0.2
              }
            }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border min-w-[300px] ${toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
            
              {toast.type === 'success' &&
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            }
              {toast.type === 'error' &&
            <XCircle className="w-5 h-5 text-red-500" />
            }
              {toast.type === 'info' &&
            <Info className="w-5 h-5 text-blue-500" />
            }

              <span className="flex-1 text-sm font-medium">
                {toast.message}
              </span>

              <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors">
              
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>);

};