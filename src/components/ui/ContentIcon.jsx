import {
  Lightbulb,
  Video,
  Palette,
  Mic,
  HeartPulse,
  PartyPopper,
  Building2,
  CalendarDays,
  Target,
} from 'lucide-react'

const ICONS = { Lightbulb, Video, Palette, Mic, HeartPulse, PartyPopper, Building2, CalendarDays, Target }

export default function ContentIcon({ name, className = 'w-5 h-5', strokeWidth = 1.75 }) {
  const Component = ICONS[name] || Target
  return <Component className={className} strokeWidth={strokeWidth} />
}