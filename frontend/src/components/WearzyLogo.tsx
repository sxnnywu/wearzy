import { Icon } from "lucide-react";
import { coatHanger } from "@lucide/lab";

interface WearzyLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function WearzyLogo({ 
  size = "md", 
  showText = true, 
  className = "" 
}: WearzyLogoProps) {
  const sizeClasses = {
    sm: {
      container: "w-6 h-6",
      icon: "h-3 w-3",
      text: "text-lg"
    },
    md: {
      container: "w-8 h-8",
      icon: "h-5 w-5", 
      text: "text-2xl"
    },
    lg: {
      container: "w-10 h-10",
      icon: "h-6 w-6",
      text: "text-3xl"
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size].container} bg-gradient-to-br from-primary to-wearzy-700 rounded-lg flex items-center justify-center`}>
        <Icon iconNode={coatHanger} className={`${sizeClasses[size].icon} text-white`} />
      </div>
      {showText && (
        <span className={`${sizeClasses[size].text} font-bold text-primary`}>
          Wearzy
        </span>
      )}
    </div>
  );
}