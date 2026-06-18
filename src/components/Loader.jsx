import { useEffect, useRef, useState } from "react";

export default function Loader({ onFinish, loading, fullScreen = true }) {
  const isControlled = loading !== undefined;
  const [progress, setProgress] = useState(isControlled ? 0 : 0);
  const [fadingOut, setFadingOut] = useState(false);
  const finishedRef = useRef(false);

  const isActive = isControlled ? loading : progress < 100;

  useEffect(() => {
    if (!isActive || fadingOut || finishedRef.current) return;

    if (!isControlled && progress >= 100) {
      finishedRef.current = true;
      setFadingOut(true);
      const timer = setTimeout(() => onFinish?.(), 500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setProgress((prev) => {
        const increment = Math.random() * 12 + 4;
        return Math.min(prev + increment, 100);
      });
    }, 160 + Math.random() * 180);
    return () => clearTimeout(timer);
  }, [isActive, fadingOut, progress, isControlled, onFinish]);

  useEffect(() => {
    if (!isControlled) return;
    if (loading) {
      finishedRef.current = false;
      setProgress(0);
      setFadingOut(false);
    } else if (!finishedRef.current) {
      finishedRef.current = true;
      setFadingOut(true);
      const timer = setTimeout(() => onFinish?.(), 500);
      return () => clearTimeout(timer);
    }
  }, [loading, isControlled, onFinish]);

  if (isControlled && !loading && !fadingOut) return null;
  if (!isControlled && !isActive && fadingOut === false) return null;

  const content = (
    <div className="flex flex-col items-center gap-8">
      <div className="rounded-2xl bg-white/80 p-5 shadow-lg shadow-black/5 backdrop-blur-sm ring-1 ring-black/10 dark:bg-black/80 dark:ring-white/10">
        <img src="/logo.png" alt="MSC Store" className="h-16 w-auto" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-gray-950 dark:bg-white transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-500 tabular-nums dark:text-gray-400">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
          fadingOut ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(circle at top, rgba(15,23,42,0.06), transparent 35%), linear-gradient(180deg, #f8fafc, #ffffff 45%, #f8fafc)",
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center py-16 transition-opacity duration-500 ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {content}
    </div>
  );
}
