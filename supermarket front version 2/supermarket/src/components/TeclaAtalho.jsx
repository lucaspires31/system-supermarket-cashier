import { useEffect } from "react";

export function useAtalhoFinalizar(callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "F3") {
        e.preventDefault();
        callback();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
}