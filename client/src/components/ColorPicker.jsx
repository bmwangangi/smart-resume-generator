import { Check, Palette } from 'lucide-react';
import React, { use, useState } from 'react'

const ColorPicker = ({selectedColor, onChange }) => {
  const colors = [
  // Primary corporate tones
  { name: "Royal Blue", value: "#2563EB" },
  { name: "Deep Indigo", value: "#4338CA" },
  { name: "Emerald Green", value: "#059669" },
  { name: "Slate Gray", value: "#475569" },
  { name: "Crimson Red", value: "#DC2626" },

  // Modern muted accents
  { name: "Amber Gold", value: "#F59E0B" },
  { name: "Soft Teal", value: "#0D9488" },
  { name: "Muted Violet", value: "#7C3AED" },
  { name: "Warm Rose", value: "#E11D48" },
  { name: "Steel Blue", value: "#256D85" },

  // Elegant neutrals
  { name: "Charcoal", value: "#1E293B" },
  { name: "Gunmetal", value: "#334155" },
  { name: "Cool Gray", value: "#9CA3AF" },
  { name: "Off White", value: "#F3F4F6" },
  { name: "Jet Black", value: "#0F172A" },
]


  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative'>
      <button onClick={()=> setIsOpen(!isOpen)} className=' flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'>
        <Palette size={16} /> <span className='max-sm:hidden'> Accent</span>
      </button>
      {isOpen && (
        <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border-gray-200 shadow-sm'>
          {colors.map((color)=>(
            <div key={color.value} className='relative cursor-pointer group flex flex-col' onClick={()=> {onChange(color.value); setIsOpen(false)}}>
              <div className="w-12 h-12 rounded-full border-2 border-trasparent group-hover:border-black/25 transition-colors" style={{backgroundColor : color.value}}>
              </div>
              {selectedColor === color.value && (
                <div>
                  <Check className='size-5 text-white'/>
                </div>
              )}
              <p className='text-xs text-center mt-1 text-gray-600'>{color.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ColorPicker