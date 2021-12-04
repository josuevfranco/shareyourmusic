module.exports = function (sequelize, dataTypes) {

    //Alias para trabajar la base de datos
    let alias = "Comment_Post";

    //Datos de las columnas de la tabla
    let cols = {
        Id_Post: {
            type: dataTypes.INTEGER
        },
        Id_Comment: {
            type: dataTypes.INTEGER,
            primaryKey: true
        }
    }


    let config = {
        tableName: 'Comment_Post',
        timestamps: false
    }

    let Comment_Post = sequelize.define(alias, cols, config)

    Comment_Post.associate = function (models) {
        Comment_Post.hasMany(models.Comment, {
            as: "Comments",
            foreignKey: "Id_Comment"
        });
        Comment_Post.hasMany(models.Post, {
            as: "Posts",
            foreignKey: "Id_Post"
        })
    }


    return Comment_Post;
}