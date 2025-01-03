import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Db } from '../db/db.mjs';
import { BaseModel, ModelError, ValidationError } from './base.mjs';
import { encryptedPasswordSchema, userSchema } from './schemas/user.mjs';

const JWT_SECRET = 'i4&C8q*bcJzj6F&KLYqBa0ek49OuK5';
const SALT_ROUNDS = 10;

export class User extends BaseModel {
  constructor (data = null) {
    super('users', 'User', userSchema);

    if (data !== null && typeof data === 'object') {
      const { value, error } = this._mySchema
        .tailor('create')
        .validate(data, { abortEarly: false });
      if (error) throw new ValidationError('User data is invalid', error);

      this._myData = { ...this._myData, ...value };

      if ('password' in value) {
        const { value: password, error: err } = encryptedPasswordSchema.validate(value.password);
        if (err) {
          this.password = password;
        }
      }
    }
  }

  get name () {
    return this._myData?.name;
  }

  set name (newName) {
    const { value, error } = userSchema.name.validate(newName);
    if (error) throw new ValidationError('Invalid name', error);
    this._myData.name = value;
  }

  get email () {
    return this._myData?.email;
  }

  set email (newEmail) {
    const { value, error } = userSchema.email.validate(newEmail);
    if (error) throw new ValidationError('Invalid email', error);
    this._myData.email = value;
  }

  get password () {
    return this._myData?.password;
  }

  set password (newPassword) {
    const { value, error } = userSchema.password.validate(newPassword);
    if (error) throw new ValidationError('Invalid password', error);

    this._myData.password = bcrypt.hashSync(value, SALT_ROUNDS);
  }

  get role () {
    return this._myData.role ?? 'customer';
  }

  set role (newRole) {
    const { value, error } = userSchema.role.validate(newRole);
    if (error) throw new ValidationError('Invalid role', error);
    this._myData.role = value;
  }

  isAdmin () {
    return this.role === 'admin';
  }

  async checkPassword (password) {
    return await bcrypt.compare(password, this.password);
  }

  toJSON () {
    const data = { ...this._myData };
    delete data.password;
    return data;
  }

  setData (data) {
    super.setData(data);

    if ('password' in data) {
      const { value: password, error } = encryptedPasswordSchema.validate(data.password);
      if (error) {
        this.password = password;
      }
    }
  }

  getToken () {
    const { email, role } = this.toJSON();
    if (!email || !role) throw new ModelError('Missing email or role');
    return jwt.sign({ email, role }, JWT_SECRET);
  }

  static findById (id) {
    const data = Db.findById('users', id);
    return data ? new User(data) : null;
  }


  static findOne (criteria) {
    const data = Db.findOne('users', criteria);
    return data ? new User(data) : null;
  }

  static findAll (criteria = null) {
    const items = Db.findAll('users', criteria);
    return items.map(item => new User(item));
  }

  static findByEmail (email) {
    return this.findOne({ email });
  }

  static async deleteMany (criteria = null) {
    return await Db.deleteMany('users', criteria);
  }

  static async create (data) {
    return await Promise.all(
      data.map(d => {
        const user = new User(d);
        return user.save();
      })
    );
  }

  static verifyToken (token) {
    return jwt.verify(token, JWT_SECRET);
  }
}
