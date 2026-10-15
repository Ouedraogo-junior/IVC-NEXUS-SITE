/**
 * Informations juridiques de l'éditeur (fournies par le client).
 * Tout ce qui vaut TODO est encore à obtenir : il apparaît surligné en jaune sur la page
 * jusqu'à ce qu'on le remplace. Avant la mise en ligne : grep -rn "À compléter" src
 */
export const TODO = '[À compléter]'

export const LEGAL = {
  name: 'Impact Vision Communication Nexus',
  acronym: 'IVC NEXUS',
  form: 'Société à responsabilité limitée (SARL)',
  formShort: 'SARL',
  capital: '1 000 000 FCFA (un million de francs CFA)',
  address: 'Rue 30.59, Silmissin, Ouagadougou, Burkina Faso',
  rccm: 'BF-OUA-01-2025-B13-05487',
  ifu: '00266314B',
  phones: '+226 70 94 98 32 / +226 54 10 20 15',
  manager: 'Monsieur KALIPE KODJO EMILE',

  // Hébergeur du site (à copier depuis les mentions légales officielles de l'hébergeur)
  host: {
    name: 'LWS (Ligne Web Services), société à responsabilité limitée, RCS Paris B 851 993 683',
    address: '10 rue Penthièvre, 75008 Paris, France',
    contact: '+33 1 77 62 30 03 (du lundi au vendredi, de 9 h à 19 h, heure de Paris)',
    website: 'https://www.lws.fr',
    country: 'France',
    },

  mailProvider: 'LWS (Ligne Web Services)', // prestataire de messagerie
  requestHandler: 'Le service commercial d’IVC NEXUS', // personne ou service qui reçoit et traite les messages
  retention: TODO, // durée de conservation des messages sans suite contractuelle
  cookies: 'laravel-session (session technique, environ 2 heures) et XSRF-TOKEN (protection des formulaires contre les envois frauduleux, environ 2 heures), tous deux nécessaires au fonctionnement et à la sécurité du site. Les services tiers intégrés à la page Contact (Google Maps et Cal.com) peuvent déposer leurs propres cookies, sous leur responsabilité', // liste exacte des cookies déposés (vérifier dans le navigateur, onglet Application > Cookies)
  cilReference: TODO, // référence de la formalité accomplie auprès de la CIL, si applicable
  authorizations: TODO, // autorisations ou agréments éventuels
  lastUpdate: '15 octobre 2026', // date de dernière mise à jour des deux textes
}