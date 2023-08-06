import { TicketSvg } from '../assets/Icons/TicketIcon';
import { ROUTES_PATHS } from './RoutesPaths';

export const sideMenuItems = [
  {
    id: 1,
    title: 'movies',
    icon: TicketSvg(),
    slug: ROUTES_PATHS.movies,
    activekeys: ['movies'],
  },
];
