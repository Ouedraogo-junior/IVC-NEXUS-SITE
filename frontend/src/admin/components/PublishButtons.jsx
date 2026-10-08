import { Button } from './ui'

/**
 * Boutons d'enregistrement avec publication explicite.
 *  - Brouillon : [Enregistrer le brouillon] [Publier]
 *  - Publié    : [Dépublier] [Mettre à jour]
 * onSave(true|false) enregistre en demandant l'état "publié" ou "non publié".
 */
export default function PublishButtons({ published, scheduled = false, saving, onSave, noun = 'article' }) {
  if (published) {
    return (
      <>
        <Button variant="secondary" disabled={saving} onClick={() => onSave(false)}>
          Dépublier
        </Button>
        <Button disabled={saving} onClick={() => onSave(true)}>
          {saving ? 'Enregistrement…' : 'Mettre à jour'}
        </Button>
      </>
    )
  }

  return (
    <>
      <Button variant="secondary" disabled={saving} onClick={() => onSave(false)}>
        Enregistrer le brouillon
      </Button>
      <Button disabled={saving} onClick={() => onSave(true)}>
        {saving ? 'Enregistrement…' : scheduled ? 'Programmer la publication' : noun === 'réalisation' ? 'Mettre en ligne' : 'Publier'}
      </Button>
    </>
  )
}