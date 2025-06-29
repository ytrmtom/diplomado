import { Model } from 'sequelize';

interface UserAttributes {
    id: number;
    username: string;
    password: string;
    // Add other attributes as needed
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export default UserInstance;
