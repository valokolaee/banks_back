import { Model } from 'sequelize';

export default class RolePermission extends Model {
  public id!: number;
  public roleId!: number;
  public permissionId!: number;
  public createdAt!: Date;

  public static initModel(sequelize: any): typeof RolePermission {
    return RolePermission.init(
      {
        id: {
          type: 'INT',
          autoIncrement: true,
          primaryKey: true,
        },
        roleId: {
          type: 'INT',
          allowNull: false,
          field: 'role_id',
        },
        permissionId: {
          type: 'INT',
          allowNull: false,
          field: 'permission_id',
        },
        createdAt: {
          type: 'DATETIME',
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          field: 'created_at',
        },
      },
      {
        sequelize,
        modelName: 'RolePermission',
        tableName: 'role_permissions',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['role_id', 'permission_id'],
            name: 'unique_role_permission',
          },
        ],
      }
    );
  }

  public static associate(models: any) {
    RolePermission.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
    });

    RolePermission.belongsTo(models.Permission, {
      foreignKey: 'permissionId',
      as: 'permission',
    });
  }
}