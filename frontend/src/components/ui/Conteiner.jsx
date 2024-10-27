

// eslint-disable-next-line react/prop-types
export function Conteiner({children, className}) {
  return (
    <div className={"max-w-7xl px-4 " + className}>{children}</div>
  )
}

export default Conteiner