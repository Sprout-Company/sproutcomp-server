
export default function TextField ({
  placeholder,
  label,
  type,
  value,
  disabled, 
  onInput, 
}) {
    return (
      <label className={`px-3 py-2 w-full flex items-center bg-primary-800 text-primary border-current border-b-2 rounded`}>
        { label && 
          <div className='mr-2'> {label} </div>
        }
        <input 
          className={`w-full bg-transparent focus:outline-none`}
        
          disabled={disabled}
          type={type}
          value={value} 
          placeholder={placeholder}
        
          onInput={onInput}
        />
      </label>
    );
}