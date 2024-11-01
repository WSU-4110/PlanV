import React, { useState } from 'react';
import FilterContext from './FilterContext'; // Import the FilterContext

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        // Define your initial filter states here
        hotel: null,
        flight: null,
        car: null,
    });

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}  {/* This renders any child components */}
        </FilterContext.Provider>
    );
};
