export const Card = ({ 
  children, 
  hoverable = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'bg-white rounded-2xl border border-slate-200 shadow-sm';
  const hoverStyles = hoverable ? 'hover:border-blue-500 hover:shadow-md hover:-translate-y-1 transition-all' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
