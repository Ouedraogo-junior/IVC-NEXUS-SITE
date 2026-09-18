export default function PageHeader({ title, subtitle }) {
  return (
    <section className="pt-36 pb-16 lg:pt-44 lg:pb-20 bg-nexus-dark relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(29,53,87,1) 0%, rgba(13,31,51,1) 100%)' }}
      />
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FF6B00 0%, transparent 70%)' }} />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 text-center">
        <span className="inline-block w-[50px] h-1 rounded-full bg-impact mb-4 animate-fade-up opacity-0" />
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 animate-fade-up delay-100 opacity-0">{title}</h1>
        {subtitle && (
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-up delay-200 opacity-0">{subtitle}</p>
        )}
      </div>
    </section>
  )
}