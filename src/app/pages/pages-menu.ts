import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-e-commerce',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Categories',
    icon: 'fa fa-bookmark',
    children: [
      {
        title: 'Add New',
        link: '/pages/categories/add',
      },
      {
        title: 'View All',
        link: '/pages/categories/list',
      },
    ]
  },
  {
    title: 'Users',
    icon: 'fa fa-user',
    children: [
      {
        title: 'Add New',
        link: '/pages/users/add',
      },
      {
        title: 'View All',
        link: '/pages/users/list',
      },
      {
        title: 'Admin List',
        link: '/pages/users/listadmin',
      },
    ]
  },
  {
    title: 'Providers',
    icon: 'fa fa-briefcase',
    children: [
      {
        title: 'Add New',
        link: '/pages/providers/add',
      },
      {
        title: 'View All',
        link: '/pages/providers/list',
      },
    ]
  },
  {
    title: 'Reviews',
    icon: 'fa fa fa-comments',
    children: [
      {
        title: 'View All',
        link: '/pages/reviews/list',
      },
    ]
  },
  {
    title: 'Appointments',
    icon: 'fa fa-hourglass-end',
    children: [
      {
        title: 'View All',
        link: '/pages/appointments/list',
      },
    ]
  },
  {
    title: 'Plans',
    icon: 'fa fa-dollar-sign',
    children: [
      {
        title: 'View All',
        link: '/pages/plans/list',
      },
    ]
  },
  {
    title: 'Settings',
    icon: 'fa fa-cog',
    children: [
      {
        title: 'Update',
        link: '/pages/settings/update',
      },
      {
        title: 'Country',
        link: '/pages/settings/country',
      },
    ]
  },
  {
    title: 'Support',
    icon: 'fa fa-life-ring',
    children: [
      {
        title: 'View All',
        link: '/pages/support/list',
      },
    ]
  },
];
