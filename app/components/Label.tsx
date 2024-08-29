// app/components/Label.tsx
interface LabelProps {
    text: string;
    fontSize?: string; 
    className?: string; 
  }
  
  const Label: React.FC<LabelProps> = ({ text, fontSize = 'text-lg', className }) => {
    return <div className={` ${fontSize} ${className}`}>{text}</div>;
  };
  
  export default Label;