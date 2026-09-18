/**
 * Soumet un <form> à Netlify Forms sans recharger la page.
 * Le nom du formulaire (`formName`) doit correspondre exactement à celui
 * déclaré dans le formulaire fantôme de index.html (voir ce fichier).
 *
 * Utilisation :
 *   const handleSubmit = async (e) => {
 *     e.preventDefault()
 *     await submitNetlifyForm('contact', e.target)
 *     setSent(true)
 *   }
 */
export async function submitNetlifyForm(formName, formElement) {
  const formData = new FormData(formElement)
  formData.append('form-name', formName)

  return fetch('/', {
    method: 'POST',
    body: formData,
  })
}
