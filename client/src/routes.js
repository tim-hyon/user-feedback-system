export default [
  {
    name: 'login',
    path: '/login',
  },
  {
    name: 'profile',
    path: '/profile',
  },
  {
    name: 'posts',
    path: '/posts',
    children: [
      { name: 'edit', path: '/:id/edit' },
    ],
  },
];
