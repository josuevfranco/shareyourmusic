module.exports = function (sequelize, dataTypes) {

    //Alias para trabajar la base de datos
    let alias = "Category";

    //Datos de las columnas de la tabla
    let cols = {
        Id_Category: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: dataTypes.STRING
        }
    }


    let config = {
        tableName: 'Category',
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config)

    Category.associate = function (models) {
        Category.hasMany(models.Post, {
            as: "Posts",
            foreignKey: "ID_Category"
        });
    }

    return Category;
}