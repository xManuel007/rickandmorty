import { Search } from "lucide-react";

interface SearchBarProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Rick Sanchez'
}) => {
  return (
    <div className="border-2 rounded-full p-1 px-3 flex flex-row justify-between hover:shadow-md">
      <input
        type="text"
        placeholder={placeholder}
        className="w-11/12 focus:outline-none"
        value={value}
        onChange={onChange}
      />
      <Search color="gray"/>
    </div>
   );
}

export default SearchBar;
