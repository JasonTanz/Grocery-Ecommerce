import { admin } from 'src/models/admin';
export const adminsProvider = [
  {
    provide: 'ADMIN_REPOSITORY',
    useValue: admin,
  },
];
