import { useState } from 'react';
import './App.css';

function App() {
  const iProducts = [
    { id: 101, name: 'Macbook', category: 'Computing', price: 22000, quantity: 2 },
    { id: 203, name: 'Iphone 16', category: 'Phones', price: 32000, quantity: 4 },
    { id: 51, name: 'Galaxy Watch', category: 'Wearables', price: 5000, quantity: 5 },
    { id: 63, name: 'Galaxy Ring', category: 'Wearables', price: 1200, quantity: 8 },
    { id: 44, name: 'Odyssey Monitor', category: 'Displays', price: 12000, quantity: 3 },
    { id: 24, name: 'Samsung Galaxy', category: 'Phones', price: 40000, quantity: 4 },
    { id: 72, name: 'AirPods Pro', category: 'Audio', price: 4999, quantity: 7 },
    { id: 83, name: 'Sony WH-1000XM5', category: 'Audio', price: 7499, quantity: 1 },
    { id: 95, name: 'PlayStation 5', category: 'Gaming', price: 10999, quantity: 6 },
    { id: 112, name: 'Xbox Controller', category: 'Gaming', price: 1299, quantity: 10 },
    { id: 126, name: 'Magic Keyboard', category: 'Accessories', price: 3499, quantity: 0 },
    { id: 138, name: 'Portable SSD', category: 'Accessories', price: 2499, quantity: 9 },
  ];

  const [prod, setProducts] = useState(iProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const totalQuantity = prod.reduce((acc, product) => acc + product.quantity, 0);
  const totalPrice = prod.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );
  const lowStockCount = prod.filter((product) => product.quantity <= 2).length;

  const categories = ['All', ...Array.from(new Set(prod.map((product) => product.category)))];
  const visibleProducts = prod.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      product.category.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  function sell(id: number) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product,
      ),
    );
  }

  function restock(id: number) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product,
      ),
    );
  }

  function level(quantity: number): string {
    if (quantity === 0) return 'Out of stock';
    if (quantity <= 2) return 'Low stock';
    if (quantity >= 6) return 'In good stock';
    return 'Healthy stock';
  }

  const formatRand = (value: number) =>
    new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <main className="inventory">
      <header className="inventory__header">
        <div>
          <p className="inventory__eyebrow">Welcome back</p>
          <h1>Here is today’s inventory</h1>
        </div>
        <p className="inventory__date">Stockroom · Today</p>
      </header>

      <section className="summary" aria-label="Inventory summary">
        <article className="summary-card">
          <p>Products</p>
          <strong>{prod.length}</strong>
        </article>
        <article className="summary-card">
          <p>Total units</p>
          <strong>{totalQuantity}</strong>
        </article>
        <article className="summary-card">
          <p>Inventory value</p>
          <strong>{formatRand(totalPrice)}</strong>
        </article>
        <article className="summary-card summary-card--warning">
          <p>Low stock</p>
          <strong>{lowStockCount}</strong>
        </article>
      </section>

      <section className="toolbar" aria-label="Inventory controls">
        <label className="search">
          <span className="search__icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search inventory"
          />
        </label>
        <div className="filters" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'filter filter--active' : 'filter'}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="product-grid" aria-live="polite">
        {visibleProducts.map((product) => {
          const stockLevel = level(product.quantity);
          const stockClass =
            product.quantity === 0
              ? 'out'
              : product.quantity <= 2
                ? 'low'
                : product.quantity >= 6
                  ? 'great'
                  : 'healthy';

          return (
            <article key={product.id} className="product-card">
              <div className="product-card__top">
                <span className="product-card__category">{product.category}</span>
                <span className={`stock-badge stock-badge--${stockClass}`}>
                  {stockLevel}
                </span>
              </div>

              <h2>{product.name}</h2>
              <p className="product-card__price">{formatRand(product.price)}</p>

              <dl className="product-card__details">
                <div>
                  <dt>In stock</dt>
                  <dd>{product.quantity}</dd>
                </div>
                <div>
                  <dt>Stock value</dt>
                  <dd>{formatRand(product.price * product.quantity)}</dd>
                </div>
              </dl>

              <div className="product-card__actions">
                <button
                  type="button"
                  className="button button--secondary"
                  onClick={() => sell(product.id)}
                  disabled={product.quantity === 0}
                >
                  Sell one
                </button>
                <button
                  type="button"
                  className="button button--primary"
                  onClick={() => restock(product.id)}
                >
                  Restock
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {visibleProducts.length === 0 && (
        <section className="empty-state">
          <h2>No products found</h2>
          <p>Try a different search or category.</p>
        </section>
      )}
    </main>
  );
}

export default App;
        
        