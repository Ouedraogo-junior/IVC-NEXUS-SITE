import LegalDocument from '../components/LegalDocument'
import { PRIVACY } from '../data/legalTexts'

export default function PrivacyPolicy() {
  return (
    <LegalDocument
      doc={PRIVACY}
      titleEn="Privacy policy"
      description="Politique de confidentialité du site d’Impact Vision Communication Nexus (IVC NEXUS)."
    />
  )
}