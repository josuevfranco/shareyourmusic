module.exports = function (sequelize, dataTypes) {

    //Alias para trabajar la base de datos
    let alias = "Post";

    //Datos de las columnas de la tabla
    let cols = {

        Date: {
            type: dataTypes.DATE
        },
        Id_Post: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Text: {
            type: dataTypes.STRING
        },
        Location: {
            type: dataTypes.STRING
        },
        Id_Category: {
            type: dataTypes.INTEGER
        },
        LIKES: {
            type: dataTypes.INTEGER
        },
        Username: {
            type: dataTypes.STRING
        },
        id_User: {
            type: dataTypes.INTEGER
        }
    }


    let config = {
        tableName: 'Post',
        timestamps: false
    }

    let Post = sequelize.define(alias, cols, config)

    Post.associate = function (models) {
        Post.belongsTo(models.Comment_Post, {
            as: "Posts",
            foreignKey: "Id_Post",
            timestamps: false
        });
        Post.belongsTo(models.User, {
            as: 'Users',
            foreignKey: "id_User",
            timestamps: false
        });
        Post.belongsTo(models.Category, {
            as: 'Categories',
            foreignKey: "Id_Category",
            timestamps: false
        });
    }

    return Post;
}