import LegalDocument from '../components/LegalDocument'
import { NOTICE } from '../data/legalTexts'

export default function LegalNotice() {
  return (
    <LegalDocument
      doc={NOTICE}
      titleEn="Legal notice"
      description="Mentions légales du site d’Impact Vision Communication Nexus (IVC NEXUS)."
    />
  )
}