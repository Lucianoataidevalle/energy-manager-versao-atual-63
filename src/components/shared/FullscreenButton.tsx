import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleFullscreen}
      className="ml-2"
      title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
    >
      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
    </Button>
  );
};

export default FullscreenButton;