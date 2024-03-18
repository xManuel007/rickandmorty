import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

interface FiltersProps {
  filter: string;
  options: string[];
  onChange: (newFilter: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filter, options, onChange }) => {
  return (
    <>
      <ToggleGroup type="single" variant='outline' value={filter} onValueChange={onChange}>
        {options.map((option, index) => (
          <ToggleGroupItem key={index} value={option}>{option}</ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );
}

export default Filters;
