import React from 'react'
import { useFrequencyStore } from '@/definitions/frequency'

interface FrequencyDropdownProps {
  selectedFrequency: number | null
  onChange: (frequency: number) => void
}

const FrequencyDropdown: React.FC<FrequencyDropdownProps> = ({
  selectedFrequency,
  onChange,
}) => {
  const frequencyMap = useFrequencyStore((state) => state.frequencyMap)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value))
  }

  if (!Object.keys(frequencyMap).length) {
    return <div>Loading...</div>
  }

  return (
    <select
      onChange={handleChange}
      value={selectedFrequency !== null ? selectedFrequency : ''}
      className="border border-gray-300 rounded-md text-sm px-3 py-2 text-gray-900 w-full"
    >
      <option value="" disabled>
        Select frequency
      </option>
      {Object.entries(frequencyMap).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  )
}

export default FrequencyDropdown
