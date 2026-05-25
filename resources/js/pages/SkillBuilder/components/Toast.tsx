interface ToastProps {
  show: boolean
}

export default function Toast({ show }: ToastProps) {
  if (!show) {
return null
}

  return (
    <div className="fixed bottom-6 left-1/2 z-[60] bg-navy text-white text-sm font-black px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 toast-show">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFE234" strokeWidth="2.5" strokeLinecap="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Registration submitted successfully!
    </div>
  )
}
