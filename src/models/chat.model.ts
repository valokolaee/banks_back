import { Model } from 'sequelize';

export default class Chat extends Model {
  public id!: number;
  public userId!: number;
  public name!: string;
  public desc!: string;
  public createdAt!: Date;

  public readonly user?: any;
  public readonly contents?: any[];

  public static initModel(sequelize: any): typeof Chat {
    return Chat.init(
      {
        id: {
          type: 'INT',
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: 'INT',
          allowNull: false,
          field: 'userId',
        },
        name: {
          type: 'TEXT',
          allowNull: false,
        },
        desc: {
          type: 'TEXT',
          allowNull: true,
          defaultValue:'',
        },
        createdAt: {
          type: 'DATETIME',
          allowNull: true,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          field: 'created_at',
        },
      },
      {
        sequelize,
        modelName: 'Chat',
        tableName: 'chat',
        timestamps: false,
      }
    );
  }

  public static associate(models: any) {
    Chat.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    Chat.hasMany(models.Content, {
      foreignKey: 'chatId',
      as: 'contents',
    });
  }
}