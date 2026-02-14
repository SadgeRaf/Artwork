"use client"

import { useEffect } from "react";

const BotpressChat = () => {
  useEffect(() => {
    // Clean up function to remove scripts when component unmounts
    const cleanup = () => {
      const injectScript = document.querySelector('script[src*="botpress.cloud/webchat/v3.6/inject.js"]');
      const botScript = document.querySelector('script[src*="files.bpcontent.cloud"]');
      
      if (injectScript) injectScript.remove();
      if (botScript) botScript.remove();
    };

    // Load Botpress inject script
    const injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    injectScript.async = true;
    
    injectScript.onload = () => {
      // Load your specific bot configuration
      const botScript = document.createElement("script");
      botScript.src = "https://files.bpcontent.cloud/2026/02/14/05/20260214052257-P8W85636.js";
      botScript.defer = true;
      
      botScript.onload = () => {
        // Ensure the chat is visible and ready
        const ensureVisible = () => {
          if (window.botpressWebChat) {
            window.botpressWebChat.sendEvent({ type: "show" });
            console.log("Botpress chat initialized");
          } else {
            // Try again in 500ms if not ready
            setTimeout(ensureVisible, 500);
          }
        };
        
        // Start checking after a short delay
        setTimeout(ensureVisible, 1000);
      };

      botScript.onerror = () => {
        console.error("Failed to load bot configuration");
      };

      document.body.appendChild(botScript);
    };

    injectScript.onerror = () => {
      console.error("Failed to load Botpress inject script");
    };

    document.body.appendChild(injectScript);

    // Cleanup on component unmount
    return cleanup;
  }, []); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything visible
};

export default BotpressChat;