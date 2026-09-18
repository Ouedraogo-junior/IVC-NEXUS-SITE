import {
  Target,
  Zap,
  Lightbulb,
  Handshake,
  CheckCircle2,
  Link2,
  Video,
  Smartphone,
  Palette,
  Printer,
  BarChart3,
  Building2,
  Landmark,
  Globe2,
  User,
  GraduationCap,
  HeartPulse,
  Users,
  Laptop,
  Camera,
  MapPin,
  Phone,
  Mail,
  PartyPopper,
  HelpCircle,
  Download,
  FileText,
  Presentation,
  ClipboardList,
  BookOpen,
} from 'lucide-react'

// Un seul endroit à mettre à jour pour ajouter une icône : on référence son
// nom en chaîne de caractères dans les données (i18n/*.json, data/*.js),
// jamais le composant directement — ça reste sérialisable en JSON.
const icons = {
  Target,
  Zap,
  Lightbulb,
  Handshake,
  CheckCircle2,
  Link2,
  Video,
  Smartphone,
  Palette,
  Printer,
  BarChart3,
  Building2,
  Landmark,
  Globe2,
  User,
  GraduationCap,
  HeartPulse,
  Users,
  Laptop,
  Camera,
  MapPin,
  Phone,
  Mail,
  PartyPopper,
  HelpCircle,
  Download,
  FileText,
  Presentation,
  ClipboardList,
  BookOpen,
}

/**
 * <Icon name="Target" className="w-6 h-6" />
 * Rend un cercle neutre si le nom n'est pas reconnu, plutôt que de planter.
 */
export default function Icon({ name, className = 'w-6 h-6', strokeWidth = 2 }) {
  const LucideIcon = icons[name]
  if (!LucideIcon) return <span className={className} />
  return <LucideIcon className={className} strokeWidth={strokeWidth} />
}