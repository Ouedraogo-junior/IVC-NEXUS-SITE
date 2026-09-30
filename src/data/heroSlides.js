// Un jeu de "slides" par page, pour que chaque bandeau ait sa propre
// identité visuelle même sans photos réelles (dégradés de la palette,
// angle et combinaison de couleurs différents par page).
//
// Quand de vraies photos seront disponibles, remplacer les entrées
// { gradient: [...], angle } par { image: '/hero/xxx.jpg' }  un jeu à la
// fois, page par page, sans toucher au composant lui-même.
//
// Chaque jeu doit garder exactement 4 entrées (le minutage de l'animation
// dans index.css est calé sur 4 slides).

export const homeSlides = [
  { image: '/hero/photo1.jpeg' },
  { image: '/hero/photo2.PNG' },
  { image: '/hero/photo3.jpeg' },
  { gradient: ['#1D3557', '#152844'], angle: 135 },
]

export const aboutSlides = [
  { image: '/hero/photo1.jpeg' },
  { image: '/hero/photo2.PNG' },
  { image: '/hero/photo3.jpeg' },
  { gradient: ['#2a4a73', '#1D3557'], angle: 110 },
]

export const servicesSlides = [
  { image: '/hero/photo1.jpeg' },
  { image: '/hero/photo2.PNG' },
  { image: '/hero/photo3.jpeg' },
  { gradient: ['#1D3557', '#0D1F33'], angle: 160 },
]

export const portfolioSlides = [
  { image: '/hero/photo1.jpeg' },
  { image: '/hero/photo2.PNG' },
  { image: '/hero/photo3.jpeg' },
  { gradient: ['#0D1F33', '#2a4a73'], angle: 120 },
]

export const contactSlides = [
  { image: '/hero/photo1.jpeg' },
  { image: '/hero/photo2.PNG' },
  { image: '/hero/photo3.jpeg' },
  { gradient: ['#2a4a73', '#1D3557'], angle: 200 },
]

export const blogSlides = [
  { image: '/hero/photo1.jpeg' },
  { image: '/hero/photo2.PNG' },
  { image: '/hero/photo3.jpeg' },
  { gradient: ['#0D1F33', '#1D3557'], angle: 145 },
]