interface SectionBadgeProps {
  number: string
  label: string
  borderClass?: string
}

/**
 * Numbered circle + pill label used to introduce each section.
 */
export function SectionBadge({
  number,
  label,
  borderClass = 'border-gray-200',
}: SectionBadgeProps) {
  return (
    <div className="mb-6 flex items-center gap-3 sm:mb-8">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
        {number}
      </div>
      <span
        className={`rounded-full border ${borderClass} px-3 py-1 text-[12px] font-medium sm:px-4 sm:py-1.5 sm:text-[13px]`}
      >
        {label}
      </span>
    </div>
  )
}
