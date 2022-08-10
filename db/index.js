const Sequelize = require("sequelize");
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/the_acme_store_db');

const User = conn.define('user', {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
    
});

const Product = conn.define('product', {
        name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    unique: true
    
});


const Sale = conn.define('sale', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    
});

Sale.belongsTo(User);
Sale.belongsTo(Product);

module.exports({conn, User, Sale, Product});