export class User {
  _id: string = '';
  userName: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  deleted: boolean = false;
  createdAt: string = '';
  updatedAt: string = '';
  deletedAt?: string;
  deletedBy?: string;

  constructor(properties?: User) {
    if (properties) {
      this._id = properties._id || '';
      this.userName = properties.userName || '';
      this.password = properties.password || '';
      this.firstName = properties.firstName || '';
      this.email = properties.email || '';
      this.deleted = properties.deleted || false;
      this.createdAt = properties.createdAt || new Date().toLocaleDateString();
      this.updatedAt = properties.updatedAt || new Date().toLocaleDateString();
      this.deletedBy = properties.deletedBy || undefined;
    }
  }

}
