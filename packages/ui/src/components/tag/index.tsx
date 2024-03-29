export default function Tag({ title }: { title: string }) {
  return (
    <div className=" dark:bg-emerald-400 bg-emerald-700 text-gray-800 text-xs w-fit px-2.5 py-1.5 rounded-full capitalize">
      {title}
    </div>
  )
}
