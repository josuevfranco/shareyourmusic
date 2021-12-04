module.exports = function (sequelize, dataTypes) {

    //Alias para trabajar la base de datos
    let alias = "Comment";

    //Datos de las columnas de la tabla
    let cols = {
        Id_Comment: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Text: {
            type: dataTypes.STRING
        }
    }


    let config = {
        tableName: 'Comment',
        timestamps: false
    }

    let Comment = sequelize.define(alias, cols, config)

    Comment.associate = function (models) {
        Comment.belongsTo(models.Comment_Post, {
            as: "Comments",
            foreignKey: "Id_Comment"
        });
    }

    return Comment;
}