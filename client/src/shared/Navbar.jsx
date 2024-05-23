
export function Navbar ({className, children}) {
  return (
    <div
      className={`
        flex-shrink-0 p-4 w-100 
        text-primary font-bold 
        bg-primary shadow-lg
        ${className}
      `}
    >
      { children }
    </div>
  )
}