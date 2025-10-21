import React, { useState, useRef, useEffect } from "react"
import "./SelectMenu.css"

export default function SelectMenu({
  options,
  inputLabel,
  value,
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = option => {
    setSelectedValue(option)
    setIsOpen(false)
    if (onChange) {
      onChange(option)
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleKeyDown = event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      toggleDropdown()
    } else if (event.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div className={`select-container`} ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className="select-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="select-text">{selectedValue || inputLabel}</span>
        <svg
          className={`select-icon ${isOpen ? "open" : ""}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="select-dropdown">
          <div className="select-options" role="listbox">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className="select-option-list"
                role="option"
                aria-selected={selectedValue === option}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
