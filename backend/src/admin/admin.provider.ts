import { admin } from 'src/models/admin';
import { ADMIN_REPOSITORY } from 'src/constants';
export const adminsProvider = [
  {
    provide: ADMIN_REPOSITORY,
    useValue: admin,
  },
];
