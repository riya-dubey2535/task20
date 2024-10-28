import { useState } from 'react';

function App() {
  const [totalPrice, setTotalPrice] = useState(0.00);
  const [itemList, setItemList] = useState([]);

  // List of items with prices
  const items = [
    { id: 1, name: 'ASIAN Thar-13 Sneaker', price: 40, imgSrc: '/src/Shoe1.jpeg' },
    { id: 2, name: 'ASIAN Thar-14 Sneaker', price: 60, imgSrc: '/src/Shoe2.jpeg' },
    { id: 3, name: 'ASIAN Thar-15 Sneaker', price: 100, imgSrc: '/src/Shoe3.jpeg' },
    { id: 4, name: 'ASIAN Thar-16 Sneaker', price: 70, imgSrc: '/src/Shoe4.jpeg' },
    { id: 5, name: 'ASIAN Thar-17 Sneaker', price: 80, imgSrc: '/src/Shoe5.jpeg' },
    { id: 6, name: 'ASIAN Thar-18 Sneaker', price: 90, imgSrc: '/src/Shoe6.jpg' },
    { id: 7, name: 'ASIAN Thar-19 Sneaker', price: 60, imgSrc: '/src/Shoe7.jpeg' },
    { id: 8, name: 'ASIAN Thar-20 Sneaker', price: 50, imgSrc: '/src/Shoe8.jpg' },
    { id: 9, name: 'ASIAN Thar-21 Sneaker', price: 65, imgSrc: '/src/Shoe9.jpeg' },
    { id: 10, name: 'ASIAN Thar-22 Sneaker', price: 90, imgSrc: '/src/Shoe10.jpeg' }
  ];

  // Function to add items to the cart
  const AddItems = (item) => {
    const existingItem = itemList.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // If item already in the cart, increase its quantity
      setItemList(itemList.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      // If item is not in the cart, add it with quantity 1
      setItemList([...itemList, { ...item, quantity: 1 }]);
    }

    // Update total price
    setTotalPrice(totalPrice + item.price);
  };

  // Function to increase quantity
  const increaseQuantity = (itemId) => {
    const updatedList = itemList.map(item => {
      if (item.id === itemId) {
        setTotalPrice(totalPrice + item.price);
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItemList(updatedList);
  };
  
  const decreaseQuantity = (itemId) => {
    const updatedList = itemList.map(item => {
      if (item.id === itemId) {
          setTotalPrice(totalPrice - item.price);
          return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter((item)=>{
      if(item.quantity < 1){
        setTotalPrice(totalPrice - item.price);
        return false;
      }
      return true;
    });
    setItemList(updatedList);
  };

  return (
    <>
      <div className='navbar'>
        <img src="/src/chiku_18_prev_ui.png" alt=" can't load" />
        <div className='navbar1'>
          <h1>Home</h1>
          <h1>Categories</h1>
          <h1>About Us</h1>
        </div>
      </div>

      <div className='hero'>
        <div className='leftHero'>
          {items.map((item, index) => (
            <div className='item' key={index}>
              <img src={item.imgSrc} alt="Can't Load" />
              <div className='itemName'>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <button onClick={() => AddItems(item)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        <div className='rightHero'>
          <h3>Cart</h3>
          {itemList.length === 0 ? (
            <div></div>
          ) : (
            <div className="itemList">
              {itemList.map((item, index) => (
                <div className='index' key={index}>
                  <div className='name'>
                    <img src={item.imgSrc} alt="" />
                    <div>
                      <h5>{item.name}</h5>
                      <p>${item.price}</p>
                    </div>
                  </div>
                  <div className='Quantity'>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <span> {item.quantity} </span>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <h2 className='Total'>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
      </div>
    </>
  );
}
export default App;