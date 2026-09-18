import logoUrl from '../../assets/logo.svg'

/**
 * Le logo officiel est en bleu marine / noir, donc peu lisible sur les
 * fonds sombres (header transparent sur le hero, footer bleu nuit).
 * On le pose sur une petite plaque blanche pour qu'il reste net partout,
 * sans jamais modifier ses couleurs d'origine.
 */
export default function LogoChip({ height = 'h-7' }) {
  return (
    <span className="inline-flex items-center bg-white rounded-[10px] px-3.5 py-2 shadow-sm">
      <img src={logoUrl} alt="IVC Nexus" className={`${height} w-auto`} />
    </span>
  )
}
