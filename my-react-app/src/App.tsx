import { useState } from 'react';
import './App.css';




function App() {
  
  const iProducts = [
    {'id': 101, 'name': 'Macbook','category': 'Laptop','price': 22000,'quantity': 2},
    {'id': 203,'name': 'Iphone 16','category': 'Phone','price': 32000,'quantity': 4},
    {'id': 51,'name': 'Apple watch','category': 'Watch','price': 5000,'quantity': 5},
    {'id': 63,'name': 'Galaxy ring','category': 'Accessory','price': 1200,'quantity': 8},
    {'id': 44,'name': 'Odyssey','category': 'Accessory','price': 12000,'quantity': 3},
    {'id': 24,'name': 'Samsung galaxy','category': 'Phone','price': 40000,'quantity': 4},



    ]
  

    
  
    const [prod, setProducts] = useState(iProducts);
    const totalQuantity = prod.reduce(
  (acc, product) => acc + (product.quantity || 0),
  0
);
    const totalPrice = prod.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    function Sell(id: number){
      setProducts(
        prod.map((product) => {
          if(product.id === id && product.quantity > 0){
            return {
              ...product,
              quantity: product.quantity - 1
};
        }
        else{

          return product;
        }
    
})
      )

    }

    function Restock(id: number){
      setProducts(
        prod.map((product) => {
          if(product.id === id){
            return {
              ...product,
              quantity: product.quantity + 1
};
        }
        else{

          return product;
        }
    
}))
        

  }

  function Level(quantity: number): string{
      if(quantity === 0){
        return 'Out of stock';
      }

      if(quantity <= 2){
        return 'Low stock';
      }

      if(quantity >= 6){
        return 'Great stock'
      }
        
      return 'Good stock';
      

    }

  return(
    <div className="user-container">
      {prod.map((Product) => (
        <div key={Product.id} className="user-card">
          <h3>Name: {Product.name} <br />
          Category: {Product.category} <br />
          Price: R{Product.price} <br />
          Quantity: {Product.quantity} <br />
          Level: {Level(Product.quantity)} <br />
          Total price: R{Product.price * Product.quantity} <br />
          <button onClick={() => Sell(Product.id)}>Sell</button>
          <button onClick={() => Restock(Product.id)}>Restock</button>

          </h3>
        </div>
        
        )
       
      )
    }
    <h3>Total quantity: {totalQuantity} | Total price: ${totalPrice}</h3>

    </div>
        );
        
  }
  
  export default App;
          
          

          
          
          
        
        