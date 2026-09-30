import { homeSlides } from '../data/heroSlides'

export default function HeroBackgroundSlideshow({ slides = homeSlides }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="hero-slide absolute inset-0"
          style={{
            background: slide.image
              ? `url(${slide.image}) center / cover no-repeat`
              : `linear-gradient(${slide.angle || 135}deg, ${slide.gradient[0]}, ${slide.gradient[1]})`,
            animationDelay: `${-i * 6}s`,
          }}
        />
      ))}
    </div>
  )
}