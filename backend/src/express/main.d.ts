// types/express/index.d.ts
import { User } from '../../src/types/User';
import { Contract } from '../../src/types/Contract';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      contract?: Contract;
    }
  }
}
