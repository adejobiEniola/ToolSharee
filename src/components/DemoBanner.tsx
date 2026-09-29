import { useStore } from '../app/StoreProvider'

export default function DemoBanner() {
  const { resetDemo } = useStore()

  return (
    <div
      className="border-b border-amber-200 bg-amber-100/90 text-amber-900 backdrop-blur"
      role="status"
    >
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2">
        <span className="text-[13px] font-bold">
          Demo preview — sample data, no real accounts or emails. Resets on
          refresh.
        </span>
        {resetDemo && (
          <button
            type="button"
            onClick={resetDemo}
            className="btn btn-xs bg-[#16224a] text-white border-none ml-auto active:scale-[0.97]"
          >
            Reset demo
          </button>
        )}
      </div>
    </div>
  )
}
