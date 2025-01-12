// src/components/ScrollToTop.jsx
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 rounded-full bg-blue-500 p-3 text-white shadow-lg transition hover:bg-blue-600"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollToTop;
