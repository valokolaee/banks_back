import User from './user.model';
import Role from './role.model';
import Permission from './permission.model';
import RolePermission from './role-permission.model';
import UserSession from './user-session.model';
import Content from './content.model';
import Chat from './chat.model';

/**
 * Initializes all models with the provided Sequelize instance.
 * Sets up associations between models based on their defined `associate` method.
 */
const initModels = (sequelize: any) => {
  const models = {
    User: User.initModel(sequelize),
    Role: Role.initModel(sequelize),
    Permission: Permission.initModel(sequelize),
    RolePermission: RolePermission.initModel(sequelize),
    UserSession: UserSession.initModel(sequelize),
    Chat: Chat.initModel(sequelize),
    Content: Content.initModel(sequelize),
  };

  // Setup associations
  Object.values(models).forEach((model: any) => {
    if (model.associate) {
      model.associate(models);
    }
  });

  return models;
};

export default initModels;