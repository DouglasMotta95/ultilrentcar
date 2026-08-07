/**
 * Utilitário para fornecer feedback tátil (vibração) em dispositivos móveis.
 */
export const hapticFeedback = (type: "light" | "medium" | "heavy" | "success" | "error" | "warning" = "light") => {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    switch (type) {
      case "light":
        navigator.vibrate(10);
        break;
      case "medium":
        navigator.vibrate(30);
        break;
      case "heavy":
        navigator.vibrate(60);
        break;
      case "success":
        navigator.vibrate([20, 30, 20]);
        break;
      case "warning":
        navigator.vibrate([50, 50, 50]);
        break;
      case "error":
        navigator.vibrate([100, 50, 100]);
        break;
      default:
        navigator.vibrate(20);
    }
  }
};
