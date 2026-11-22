import type { ReactNode } from 'react'
import { useId } from 'react'

type ModalProps = {
    isOpen: boolean
    title: string
    onClose: () => void
    closeDisabled?: boolean
    children: ReactNode
}

function Modal({
    isOpen,
    title,
    onClose,
    closeDisabled = false,
    children,
}: ModalProps) {
    const titleId = useId()

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
                type="button"
                aria-label="Закрыть окно"
                disabled={closeDisabled}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2
                        id={titleId}
                        className="text-xl font-semibold text-slate-900"
                    >
                        {title}
                    </h2>

                <button
                    type="button"
                    aria-label="Закрыть окно"
                    disabled={closeDisabled}
                    onClick={onClose}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                >
                    <span className="text-xl leading-none">×</span>
                </button>
            </div>

        {children}
      </div>
    </div>
    )
}

export default Modal