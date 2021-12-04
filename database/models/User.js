module.exports = function (sequelize, dataTypes) {

    //Alias para trabajar la base de datos
    let alias = "User";

    //Datos de las columnas de la tabla
    let cols = {
        Id_User: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: dataTypes.STRING
        },
        Surnames: {
            type : dataTypes.STRING
        },
        SRC_Image: {
            type : dataTypes.STRING
        },
        Email: {
            type: dataTypes.STRING
        },
        Born_Date: {
            type: dataTypes.DATE
        },
        Username: {
            type: dataTypes.STRING
        },
        Password: {
            type: dataTypes.STRING
        },
        Gender: {
            type: dataTypes.STRING
        }
    }


    let config = {
        tableName: 'User',
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config)

    User.associate = function (models) {
        User.belongsTo(models.Post, {
            as: "Posts",
            foreignKey: "Id_User"
        });
    }

    return User;
}