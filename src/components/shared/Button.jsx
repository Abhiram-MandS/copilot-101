export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-bold rounded-lg transition-all active:scale-95';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-900',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg'
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
