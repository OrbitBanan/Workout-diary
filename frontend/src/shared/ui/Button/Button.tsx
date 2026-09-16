type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
}

function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {children}
        </button>
    )
}

export default Button