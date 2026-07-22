"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CustomSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  /** Options to display in the dropdown */
  options: CustomSelectOption[];
  /** Currently selected value */
  value: string;
  /** Called when the value changes */
  onChange: (value: string) => void;
  /** Called when the select loses focus */
  onBlur?: () => void;
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** HTML name attribute for forms */
  name?: string;
  /** HTML id attribute */
  id?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field has a validation error */
  "aria-invalid"?: boolean;
  /** Whether the field is required (ARIA) */
  "aria-required"?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Select an option",
  disabled = false,
  name,
  id,
  required,
  "aria-invalid": ariaInvalid,
  "aria-required": ariaRequired,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          setHighlightedIndex(-1);
          onBlur?.();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onBlur]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      const el = optionsRef.current[highlightedIndex];
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen, highlightedIndex]);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    setHighlightedIndex(-1);
  }, [disabled]);

  const handleSelect = useCallback(
    (option: CustomSelectOption) => {
      if (option.disabled) return;
      onChange(option.value);
      setIsOpen(false);
      setHighlightedIndex(-1);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setHighlightedIndex(0);
          } else {
            setHighlightedIndex((prev) => {
              const next = prev + 1;
              // Find next enabled index
              for (let i = next; i < options.length; i++) {
                if (!options[i].disabled) return i;
              }
              return prev;
            });
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => {
              const prevIndex = prev - 1;
              for (let i = prevIndex; i >= 0; i--) {
                if (!options[i].disabled) return i;
              }
              return prev;
            });
          }
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setHighlightedIndex(0);
          } else if (highlightedIndex >= 0) {
            const opt = options[highlightedIndex];
            if (opt && !opt.disabled) {
              handleSelect(opt);
            }
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          onBlur?.();
          break;
        }
        case "Tab": {
          if (isOpen) {
            setIsOpen(false);
            setHighlightedIndex(-1);
            onBlur?.();
          }
          break;
        }
      }
    },
    [disabled, isOpen, highlightedIndex, options, handleSelect, onBlur]
  );

  // Compute the active descendant ID for ARIA
  const activeDescendantId =
    isOpen && highlightedIndex >= 0 ? `${id || name || "select"}-option-${highlightedIndex}` : undefined;
  const listboxId = `${id || name || "select"}-listbox`;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />

      {/* Trigger button */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={activeDescendantId}
        aria-required={ariaRequired || (required ? true : undefined)}
        aria-invalid={ariaInvalid}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full flex items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm",
          "outline-none transition-all duration-200 text-left cursor-pointer",
          "focus:ring-2 focus:ring-brand/10 focus:shadow-[0_0_0_3px_rgba(32,133,53,0.08)]",
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-50 border-black/[0.06]"
            : ariaInvalid
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
              : "border-black/[0.08] hover:border-brand/30 focus:border-brand/40"
        )}
      >
        <span
          className={cn(
            "truncate",
            !selectedOption ? "text-foreground-muted" : "text-foreground font-medium"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 ml-2"
        >
          <ChevronDown size={16} className="text-foreground-muted" />
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute z-50 mt-1.5 w-full rounded-xl border border-black/[0.08] bg-white shadow-[0_4px_6px_rgba(0,0,0,0.04),0_10px_24px_rgba(0,0,0,0.08)] overflow-hidden"
          >
            <div
              id={listboxId}
              role="listbox"
              aria-label={placeholder}
              className="max-h-60 overflow-y-auto py-1"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isHighlighted = index === highlightedIndex;

                return (
                  <div
                    key={option.value}
                    ref={(el) => {
                      optionsRef.current[index] = el;
                    }}
                    id={`${id || name || "select"}-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                    className={cn(
                      "flex items-center gap-2.5 px-3.5 py-2.5 text-sm cursor-pointer transition-colors duration-100",
                      option.disabled
                        ? "opacity-40 cursor-not-allowed"
                        : isSelected
                          ? "bg-brand/[0.06] text-foreground font-medium"
                          : isHighlighted
                            ? "bg-black/[0.04] text-foreground"
                            : "text-foreground-secondary hover:bg-black/[0.03]"
                    )}
                  >
                    {/* Selected checkmark */}
                    <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                          <Check size={14} className="text-brand" strokeWidth={2.5} />
                        </motion.span>
                      )}
                    </span>

                    <span className="truncate">{option.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
