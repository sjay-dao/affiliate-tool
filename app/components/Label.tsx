// app/components/Label.tsx
interface LabelProps {
    text: string;
    fontSize?: string; // Use Tailwind's text size classes (e.g., 'text-lg', 'text-2xl')
    className?: string; 
  }
  
  const Label: React.FC<LabelProps> = ({ text, fontSize = 'text-lg', className }) => {
    return <div className={` ${fontSize} ${className}`}>{text}</div>;
  };
  
  export default Label;