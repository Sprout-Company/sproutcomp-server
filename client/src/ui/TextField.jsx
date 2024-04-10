
export default function TextField ({placeholder, onInput, type, value, disabled, color}) {
    return (
      <input 
        className="px-2 py-1 bg-transparent text-primary border-current border-b-2 rounded w-full focus:outline-none"
        
        disabled={disabled}
        type={type}
        value={value} 
        placeholder={placeholder}
        
        onInput={onInput}
      />
    );
}