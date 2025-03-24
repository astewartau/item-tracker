import React, { useState, useEffect } from 'react';
import './ItemTracker.css';

const DEFAULT_ITEMS = [
  { 
    id: 'item1', 
    name: 'Sand dollar', 
    icon: 'https://hellokittyislandadventure.wiki.gg/images/5/53/Sand_Dollar.png?bc3439', 
    count: 50
  },
  { 
    id: 'item2', 
    name: 'Banana', 
    icon: 'https://via.placeholder.com/40?text=Banana', 
    count: 10 
  },
  { 
    id: 'item3', 
    name: 'Cherry', 
    icon: 'https://via.placeholder.com/40?text=Cherry', 
    count: 8 
  },
];

const STORAGE_KEY = 'helloKittyIslandItems';
const RESET_KEY = 'helloKittyIslandLastReset';

// Helper to get today's date string in YYYY-MM-DD format
const getTodayString = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const getCurrentTime = () => new Date();

const shouldReset = () => {
  const now = getCurrentTime();
  // Check if current time is 4pm or later and if we haven't reset today
  return now.getHours() >= 16 && localStorage.getItem(RESET_KEY) !== getTodayString();
};

const loadItems = () => {
  if (shouldReset()) {
    localStorage.setItem(RESET_KEY, getTodayString());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
    return DEFAULT_ITEMS;
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing saved items', e);
    }
  }
  return DEFAULT_ITEMS;
};

const saveItems = (items) => {
  if (!shouldReset()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};

const ItemTracker = () => {
  const [items, setItems] = useState(loadItems());

  useEffect(() => {
    saveItems(items);
  }, [items]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (shouldReset()) {
        setItems(DEFAULT_ITEMS);
        localStorage.setItem(RESET_KEY, getTodayString());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleUpdate = (id, delta) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, count: item.count + delta } : item
    );
    setItems(updated);
  };

  return (
    <div className="tracker-container">
      {items.map(item => (
        <div key={item.id} className="item-card">
          <div className="item-info">
            <div className="icon-container">
              <img src={item.icon} alt={item.name} className="item-icon" />
            </div>
            <span className="item-name">{item.name}</span>
          </div>
          <div className="controls">
            <button className="item-button" onClick={() => handleUpdate(item.id, -1)}>-</button>
            <span className="item-count">{item.count}</span>
            <button className="item-button" onClick={() => handleUpdate(item.id, 1)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemTracker;
