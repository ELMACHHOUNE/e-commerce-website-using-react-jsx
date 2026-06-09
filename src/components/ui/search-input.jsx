import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export function SearchInput({ value, onChange, placeholder = "Search..." }) {
  const [local, setLocal] = useState(value || "");
  const timerRef = useRef(null);

  useEffect(() => {
    setLocal(value || "");
  }, [value]);

  function handleChange(e) {
    const v = e.target.value;
    setLocal(v);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(v), 250);
  }

  function handleClear() {
    setLocal("");
    clearTimeout(timerRef.current);
    onChange("");
  }

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={local}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-9 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-8 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50"
      />
      {local && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 transition-colors hover:text-slate-600"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
