import { Model } from 'sequelize';

export default class Content extends Model {
  public id!: number;
  public contentText!: string;
  public chatId!: number;
  public userRoll!: string;
  public contentId!: number;
  public index!: number;
  public desc!: string;
  public createdAt!: Date;

  public readonly chat?: any;
  public readonly parentContent?: any;
  public readonly childContents?: any[];

  public static initModel(sequelize: any): typeof Content {
    return Content.init(
      {
        id: {
          type: 'INT',
          autoIncrement: true,
          primaryKey: true,
        },
        contentText: {
          type: 'TEXT',
          allowNull: false,
          field: 'contentText',
        },
        chatId: {
          type: 'INT',
          allowNull: false,
          field: 'chatId',
        },
        userRoll: {
          type: 'TEXT',
          allowNull: false,
          field: 'userRoll',
        },
        contentId: {
          type: 'INT',
          allowNull: true,
          field: 'contentId',
        },
        index: {
          type: 'INT',
          allowNull: true,
          defaultValue:0

        },
        desc: {
          type: 'TEXT',
          allowNull: true,
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
        modelName: 'Content',
        tableName: 'content',
        timestamps: false,
      }
    );
  }

  public static associate(models: any) {
    Content.belongsTo(models.Chat, {
      foreignKey: 'chatId',
      as: 'chat',
    });

    // Self-referential relationship for content hierarchy
    Content.belongsTo(models.Content, {
      foreignKey: 'contentId',
      as: 'parentContent',
    });

    Content.hasMany(models.Content, {
      foreignKey: 'contentId',
      as: 'childContents',
    });
  }
}