const express = require('express');
const app = express();
const {conn, User, Sale, Product} = require('./db');

app.use(express.urlencoded({extended: false}))

app.use('/assets', express.static('assests'));

app.use((req, res, next)=>{
    if (req.query.method){
        req.method = req.query.method
    }
    next();
});

app.delete('/sales/:id', async(req, res, next)=>{
    try{
        const sale = await Sale.findByPk(req.params.id);
    } catch(error){
        next(error);
    }
});

app.get('/', async(req, res, next)=>{
    try{
    const sales = await Sale.findAll({
        include:[Product, User]
    });
    res.send(`
    <html>
    <head>
    <title>The Acme Store</title>
    <link rel='stylesheet' href='/assets/styles.css' />
    </head>
    <body>
    <h1>The Acme Store</h1>
      <main>
      <ul>
      ${sales.map(sale=>{
          return `<li>
          ${sale.user.name} bought ${sale.quantity} ${sale.product.name}
          on ${new Date(sale.createdAt.toLocaleString())}
          </li>`
          
          
      })}
      
      
      
      </ul>
      
      
      </main>
    
    </body>
    
    </html>
    
    `);
    } catch(err){
        next(err)
    }
    
    
})

const start = async()=>{
    try{
        await conn.sync({force: true});
        const [ moe, lucy, larry, ethyl, foo, bar, bazz, quq] = await Promise.all([
            User.create({name: 'moe'}),
            User.create({name: 'lucy'}),
            User.create({name: 'larry'}),
            User.create({name: 'ethyl'}),
            Product.create({name: 'foo'}),
            Product.create({name: 'bar'}),
            Product.create({name: 'bazz'}),
            Product.create({name: 'quq'})
            ]);
            
        await Promise.all([
            Sale.create({productId: foo.id, userId: moe.id}),
            Sale.create({productId: foo.id, userId: moe.id, quantity: 7}),
            Sale.create({productId: bar.id, userId: lucy.id, quantity: 7}),
            Sale.create({productId: bazz.id, userId: lucy.id})
        
            
            
            ])
            
        const port = process.env.PORT 
    } catch(err){
        console.log(err);
    }
    
};

start();