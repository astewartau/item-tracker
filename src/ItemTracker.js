import React, { useState, useEffect } from 'react';
import './ItemTracker.css';

const DEFAULT_ITEMS = [
  { id: 'item1', name: 'Box clam', icon: 'https://hellokittyislandadventure.wiki.gg/images/9/96/Box_Clam.png?3421bb', count: 7 },
  { id: 'item2', name: 'Calming Crystal', icon: 'https://hellokittyislandadventure.wiki.gg/images/0/00/Calming_Crystal.png', count: 7 },
  { id: 'item3', name: 'Coconut', icon: 'https://hellokittyislandadventure.wiki.gg/images/2/2f/Coconut.png?adac49', count: 29 },
  { id: 'item4', name: 'Iron', icon: 'https://hellokittyislandadventure.wiki.gg/images/4/45/Iron.png?add0dd', count: 14 },
  { id: 'item5', name: 'Rubber', icon: 'https://hellokittyislandadventure.wiki.gg/images/8/8e/Rubber.png', count: 7 },
  { id: 'item6', name: 'Starfish', icon: 'https://hellokittyislandadventure.wiki.gg/images/5/52/Starfish.png?e865ce', count: 17 },
  { id: 'item7', name: 'Apple', icon: 'https://hellokittyislandadventure.wiki.gg/images/7/7d/Apple.png?41a49c', count: 7 },
  { id: 'item8', name: 'Cinna Bloom', icon: 'https://hellokittyislandadventure.wiki.gg/images/e/e6/Cinna_Bloom.png?2435fd', count: 7 },
  { id: 'item9', name: 'Coral Milk', icon: 'https://hellokittyislandadventure.wiki.gg/images/d/de/Coral_Milk.png?36b485', count: 12 },
  { id: 'item10', name: 'Magma Bloom', icon: 'https://hellokittyislandadventure.wiki.gg/images/d/d5/Magma_Bloom.png?feb6f7', count: 7 },
  { id: 'item11', name: 'Pineapple', icon: 'https://hellokittyislandadventure.wiki.gg/images/f/fb/Pineapple.png?ad2764', count: 9 },
  { id: 'item12', name: 'Pumpkin', icon: 'https://hellokittyislandadventure.wiki.gg/images/6/64/Pumpkin.png?cc04d3', count: 7 },
  { id: 'item13', name: 'Snowcicle', icon: 'https://hellokittyislandadventure.wiki.gg/images/d/da/Snowcicle.png?f66096', count: 7 },
  { id: 'item14', name: 'Spinip', icon: 'https://hellokittyislandadventure.wiki.gg/images/d/d4/Spinip.png?a44263', count: 12 },
  { id: 'item15', name: 'Cactus Cream', icon: 'https://hellokittyislandadventure.wiki.gg/images/f/f0/Cactus_Cream.png?dd8f56', count: 12 },
  { id: 'item16', name: 'Fizzy Ore', icon: 'https://hellokittyislandadventure.wiki.gg/images/3/3b/Fizzy_Ore.png?404c3e', count: 60 },
  { id: 'item17', name: 'Lotus Blossom', icon: 'https://hellokittyislandadventure.wiki.gg/images/b/bc/Lotus_Blossom.png', count: 14 },
  { id: 'item18', name: 'Seed', icon: 'https://hellokittyislandadventure.wiki.gg/images/2/2b/Seed_Icon.png?4cbb1f', count: 24 },
  { id: 'item19', name: 'Stick', icon: 'https://hellokittyislandadventure.wiki.gg/images/a/aa/Stick.png?e68e82', count: 37 },
  { id: 'item20', name: 'Worm Tail', icon: 'https://hellokittyislandadventure.wiki.gg/images/0/06/Worm_Tail.png', count: 14 },
  { id: 'item21', name: 'Chocolate Coin', icon: 'https://hellokittyislandadventure.wiki.gg/images/b/b8/Chocolate_Coin.png?738212', count: 15 },
  { id: 'item22', name: 'Sakura', icon: 'https://hellokittyislandadventure.wiki.gg/images/f/f4/Sakura.png?1c413f', count: 22 },
  { id: 'item23', name: 'Swampmallow', icon: 'https://hellokittyislandadventure.wiki.gg/images/b/b6/Swampmallow.png?dce919', count: 15 },
  { id: 'item24', name: 'Toasted Almond', icon: 'https://hellokittyislandadventure.wiki.gg/images/d/d3/Toasted_Almond.png?52ae9a', count: 15 },
  { id: 'item25', name: 'Glow Berry', icon: 'https://hellokittyislandadventure.wiki.gg/images/d/dc/Glow_Berry.png', count: 7 },
  { id: 'item26', name: 'Mushroom', icon: 'https://hellokittyislandadventure.wiki.gg/images/8/8c/Mushroom.png?e54ee7', count: 50 },
  { id: 'item27', name: 'Obsidian Shard', icon: 'https://hellokittyislandadventure.wiki.gg/images/f/f1/Obsidian_Shard.png?17c1a2', count: 50 },
  { id: 'item28', name: 'Pollen Puff', icon: 'https://hellokittyislandadventure.wiki.gg/images/3/3c/Pollen_Puff.png?10cc6d', count: 50 },
  { id: 'item29', name: 'Sand Dollar', icon: 'https://hellokittyislandadventure.wiki.gg/images/5/53/Sand_Dollar.png?bc3439', count: 50 },
  { id: 'item30', name: 'Seashell', icon: 'https://hellokittyislandadventure.wiki.gg/images/e/eb/Seashell.png?772184', count: 50 },
  { id: 'item31', name: 'Shiny', icon: 'https://hellokittyislandadventure.wiki.gg/images/1/10/Shiny.png?cde1d5', count: 50 },
];

const STORAGE_KEY = 'helloKittyIslandItems';
const RESET_KEY = 'helloKittyIslandLastReset';

const getTodayString = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const getCurrentTime = () => new Date();

const shouldReset = () => {
  const now = getCurrentTime();
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
  const [sortOption, setSortOption] = useState('default');

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

  const handleInputChange = (id, value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      const updated = items.map(item =>
        item.id === id ? { ...item, count: numericValue } : item
      );
      setItems(updated);
    }
  };

  const handleResetItem = (id) => {
    const defaultItem = DEFAULT_ITEMS.find(item => item.id === id);
    if (defaultItem) {
      const updated = items.map(item =>
        item.id === id ? { ...item, count: defaultItem.count } : item
      );
      setItems(updated);
    }
  };

  const handleResetAll = () => {
    setItems(DEFAULT_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
    localStorage.setItem(RESET_KEY, getTodayString());
  };

  const sortItems = (items) => {
    let sorted = [...items];
    switch (sortOption) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'count-asc':
        sorted.sort((a, b) => a.count - b.count);
        break;
      case 'count-desc':
        sorted.sort((a, b) => b.count - a.count);
        break;
      default:
        break;
    }
    return sorted;
  };

  const handleSort = () => {
    const sorted = sortItems(items);
    setItems(sorted);
  };

  return (
    <div className="tracker-container">
      <div className="sort-options">
        <label htmlFor="sort-select">Sort items: </label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="count-asc">Count (Low to High)</option>
          <option value="count-desc">Count (High to Low)</option>
        </select>
        <button className="sort-button" onClick={handleSort}>Sort</button>
      </div>
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
            <input
              type="number"
              className="item-input"
              value={item.count}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            />
            <button className="item-button" onClick={() => handleUpdate(item.id, 1)}>+</button>
            <button className="reset-item-button" onClick={() => handleResetItem(item.id)}>
              Reset
            </button>
          </div>
        </div>
      ))}
      <div className="reset-container">
        <button className="reset-button" onClick={handleResetAll}>Reset All</button>
      </div>
    </div>
  );
};

export default ItemTracker;
