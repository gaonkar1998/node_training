module.exports = (sequelize, DataTypes) => {
    // schema for the user table....separate schema for each table
    const User = sequelize.define(
        'User', {
        id: {
            type: DataTypes.NUMBER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: false,
            field: 'name'
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: false,
            field: 'email'
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
            primaryKey: false,
            field: 'password'
        },
        role: {
            type: DataTypes.STRING(200),
            allowNull: false,
            primaryKey: false,
            field: 'role'
        },
    }, {
        timestamps: false,
        tableName: 'users'
    }
    );
    return User;
} 