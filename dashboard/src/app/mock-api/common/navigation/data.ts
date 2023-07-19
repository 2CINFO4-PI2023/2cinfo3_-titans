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
        title: 'Events',
        type : 'basic',
        icon : 'heroicons_outline:calendar',
        link : '/events'
    },
    {
        id   : 'types',
        title: 'EventTypes',
        type : 'basic',
        icon : 'heroicons_outline:calendar',
        link : '/types'
    },
    {
        id   : 'stock',
        title: 'Stock',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-list',
        link : '/stock'
    },
    {
        id   : 'reclamation',
        title: 'Réclamation',
        type : 'basic',
        icon : 'heroicons_outline:mail',
        link : '/reclamation/2c82225f-2a6c-45d3-b18a-1132712a4234'
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
    },
    {   
        id   : 'chat',
        title: 'Chat',
        type : 'basic',
        icon : 'heroicons_outline:chat-alt',
        link : '/chat'
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
