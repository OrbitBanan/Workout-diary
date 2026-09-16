type InputProps = {
    id: string
    name: string
    type: 'text' | 'email' | 'password'
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    required?: boolean
}

function Input({
    id,
    name,
    type,
    value,
    onChange,
    required,
}: InputProps) {
    return (
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
        />
    )
}

export default Input