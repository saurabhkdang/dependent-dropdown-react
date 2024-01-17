import React, { useState, useEffect } from 'react';

const MultiLevelDropdown = () => {
  const [levels, setLevels] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    // Fetch initial levels from the server
    fetchLevels();
  }, []);

  const fetchLevels = () => {
    fetch('http://localhost/hrdb/public/api/levels')
      .then((response) => response.json())
      .then((data) => setLevels(data))
      .catch((error) => console.error('Error fetching levels:', error));
  };

  const handleDropdownChange = (levelIndex, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [`level${levelIndex + 1}`]: value,
    }));

    // Fetch additional levels based on the selected value
    if (levelIndex < levels.length - 1) {
      const nextLevel = levels[levelIndex + 1];
      fetch(`https://your-api-endpoint/dependent-level/${nextLevel}/${value}`)
        .then((response) => response.json())
        .then((data) => {
          // Update the levels state with the fetched data
          setLevels((prevLevels) =>
            prevLevels.map((l, index) => (index === levelIndex + 1 ? { ...l, options: data } : l))
          );
        })
        .catch((error) => console.error('Error fetching dependent levels:', error));
    }
  };

  return (
    <div>
      {levels.map((level, index) => (
        <label key={level.name}>
          {level.label}:
          <select
            value={selectedValues[`level${index + 1}`] || ''}
            onChange={(e) => handleDropdownChange(index, e.target.value)}
          >
            <option value="">Select...</option>
            {level.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
};

export default MultiLevelDropdown;
