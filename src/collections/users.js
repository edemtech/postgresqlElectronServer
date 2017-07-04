import bookshelf from '../bookshelf';
import User from '../models/user';

export default bookshelf.Collection.extend({
  model: User
});
