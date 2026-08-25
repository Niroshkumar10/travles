import { ROUTES } from '@/constants/routes'

export const MAIN_NAV = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Destinations', to: ROUTES.destinations },
  { label: 'Packages', to: ROUTES.packages },
  { label: 'Experiences', to: ROUTES.experiences },
  { label: 'Travel Guide', to: ROUTES.travelGuide },
  { label: 'My Trips', to: ROUTES.myTrips },
  { label: 'Support', to: ROUTES.support },
]

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', to: ROUTES.about },
    { label: 'Contact', to: ROUTES.contact },
    { label: 'FAQ', to: ROUTES.faq },
  ],
  explore: [
    { label: 'Destinations', to: ROUTES.destinations },
    { label: 'Packages', to: ROUTES.packages },
    { label: 'Experiences', to: ROUTES.experiences },
    { label: 'Travel Guide', to: ROUTES.travelGuide },
  ],
  account: [
    { label: 'My Trips', to: ROUTES.myTrips },
    { label: 'Favorites', to: ROUTES.favorites },
    { label: 'Support', to: ROUTES.support },
  ],
}
