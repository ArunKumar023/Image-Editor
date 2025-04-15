import React, { useState } from 'react';
import './SearchPage.css';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState({});
  const accessKey = 'TRFtSUkm5uLL3aaS7X8gDH3uTXX6vM1IR7Dv_giKvE8';
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert('Please enter a search term.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&client_id=${accessKey}`
      );
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setImages(data.results || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('Error fetching images. Please try again.');
    }
  };

  const handleAddCaption = (image) => {
    navigate('/edit', { state: { image } });
  };

  return (
    <div className="search-page">
      <h1 className="page-title">Search Page</h1>
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Your Name" />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Your Email" />
        </div>
      </div>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Enter your search term..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">🔍</button>
      </form>
      <div className="results-container">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="image-result">
              <img
                src={image.urls.small}
                alt={image.alt_description || 'Image'}
                onClick={() => handleAddCaption(image)}
                style={{ cursor: 'pointer' }}
              />
              <button
                className="caption-button"
                onClick={() => handleAddCaption(image)}
              >
                Add Caption
              </button>
              {caption[image.id] && (
                <p className="caption-text">{caption[image.id]}</p>
              )}
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;