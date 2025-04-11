import React, { useState, useEffect } from 'react';
import './ItemTracker.css';
import DEFAULT_ITEMS from './defaultItems';
import { system } from '@chakra-ui/react/preset';

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

const getDefaultItems = () => {
  return DEFAULT_ITEMS.map(item => ({ ...item, assigned: false }));
};

const loadItems = () => {
  if (shouldReset()) {
    localStorage.setItem(RESET_KEY, getTodayString());
    const defaults = getDefaultItems();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing saved items', e);
    }
  }
  return getDefaultItems();
};

const saveItems = (items) => {
  if (!shouldReset()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};

const ItemTracker = () => {
  const [items, setItems] = useState(loadItems());
  const [sortOption, setSortOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    saveItems(items);
  }, [items]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (shouldReset()) {
        const defaults = getDefaultItems();
        setItems(defaults);
        localStorage.setItem(RESET_KEY, getTodayString());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClear = (id) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, count: 0 } : item
    );
    setItems(updated);
  }

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
    const defaultItem = getDefaultItems().find(item => item.id === id);
    if (defaultItem) {
      const updated = items.map(item =>
        item.id === id ? { ...item, count: defaultItem.count } : item
      );
      setItems(updated);
    }
  };

  const handleResetAll = () => {
    const defaults = getDefaultItems();
    setItems(defaults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    localStorage.setItem(RESET_KEY, getTodayString());
  };

  const handleAssign = (id) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, assigned: !item.assigned } : item
    );
    setItems(updated);
  };

  const sortItems = (items) => {
    console.log(sortOption);
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
      case 'default':
        // sort by 'id' which is a string like 'item01', 'item02', etc.
        sorted.sort((a, b) => {
          const numA = parseInt(a.id.replace('item', ''), 10);
          const numB = parseInt(b.id.replace('item', ''), 10);
          return numA - numB;
        });
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

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tracker-container">
      <div className="item-count">
        {filteredItems.filter(item => item.count > 0 && !item.assigned).length} item types still on the island.
      </div>
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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', fontSize: '16px', width: '90%' }}
        />
      </div>
      {filteredItems.map(item => (
        <div key={item.id} className="item-card">
          <div className="item-info">
            <div className="icon-container">
              <img src={item.icon} alt={item.name} className="item-icon" />
            </div>
            <span className="item-name">{item.name}</span>
          </div>
          <div className="controls">
            <button
              className="item-clear-button"
              onClick={() => handleClear(item.id)}
              disabled={item.assigned}
            > 
              0
            </button>
            <button
              className="item-button"
              onClick={() => handleUpdate(item.id, -1)}
              disabled={item.assigned}
            >
              -
            </button>
            <input
              type="number"
              className="item-input"
              value={item.count}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
              disabled={item.assigned}
            />
            <button
              className="item-button"
              onClick={() => handleUpdate(item.id, 1)}
              disabled={item.assigned}
            >
              +
            </button>
            <button className="reset-item-button" onClick={() => handleResetItem(item.id)}>
              Reset
            </button>
            <label style={{ marginLeft: '10px', fontSize: '14px' }}>
              <input
                type="checkbox"
                checked={item.assigned || false}
                onChange={() => handleAssign(item.id)}
              />
            </label>
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
