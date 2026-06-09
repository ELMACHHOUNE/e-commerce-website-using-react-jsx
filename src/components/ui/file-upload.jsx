import { useState, useRef, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FileUpload({
  value,
  onChange,
  accept = "image/*",
  className,
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => onChange(e.target.result);
      reader.readAsDataURL(file);
    },
    [onChange],
  );

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  }

  function onSelect(e) {
    const file = e.target.files?.[0];
    handleFile(file);
    e.target.value = "";
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-2 text-center transition-colors hover:bg-slate-100",
        dragOver && "border-slate-900 bg-slate-100 ring-2 ring-slate-900/10",
        value && "border-solid border-slate-200",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="h-24 w-24 rounded-full object-cover ring-2 ring-slate-200"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm hover:bg-red-600 transition-colors"
          >
            <X className="size-3" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-200">
            <Upload className="size-5 text-slate-500" />
          </div>
          <p className="mt-1 text-sm font-medium text-slate-700">
            Drag & drop image here
          </p>
          <p className="mt-1 text-xs text-slate-500">or click to browse</p>
        </>
      )}
    </div>
  );
}
