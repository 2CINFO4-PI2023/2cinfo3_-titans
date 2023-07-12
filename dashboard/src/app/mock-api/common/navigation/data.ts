/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'Dashboard',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/home'
    },
    {
        id   : 'users',
        title: 'Utilisateurs',
        type : 'basic',
        icon : 'heroicons_outline:user',
        link : '/utilisateurs'
    },
    {
        id   : 'commandes',
        title: 'Commandes',
        type : 'basic',
        icon : 'heroicons_outline:shopping-bag',
        link : '/commandes'
    },
    {
        id   : 'events',
        title: 'Événements',
        type : 'basic',
        icon : 'heroicons_outline:calendar',
        link : '/events'
    },
    {
        id   : 'reclamation',
        title: 'Réclamation',
        type : 'basic',
        icon : 'heroicons_outline:mail',
        link : '/reclamation'
    },
    {
        id   : 'plat',
        title: 'Plat',
        type : 'basic',
        icon : 'heroicons_outline:table',
        link : '/plat'
    },
    {
        id   : 'ingredient',
        title: 'Ingredient',
        type : 'basic',
        icon : 'heroicons-outline:clipboard-list',
        link : '/ingredient'
    }   
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
