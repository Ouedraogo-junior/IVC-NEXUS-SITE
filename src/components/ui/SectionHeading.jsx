export default function SectionHeading({ title, subtitle, align = 'center', className = '' }) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <div className={`flex flex-col ${alignment} mb-10 max-w-2xl ${className}`}>
      <span className="inline-block w-[50px] h-1 rounded-full bg-impact mb-4" />
      <h2 className="text-4xl lg:text-5xl font-black text-nexus mb-4 leading-tight">{title}</h2>
      {subtitle && <p className="text-lg text-slateText">{subtitle}</p>}
    </div>
  )
}
