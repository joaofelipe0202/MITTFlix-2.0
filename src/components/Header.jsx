import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <Link to="/">
        <img
          src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
          alt="netflix-font"
          border="0"
        />
      </Link>
      <div id="navigation" className="navigation">
        <nav>
          <ul>
            <li>
              <Link to="/mylist">My List</Link>
            </li>
          </ul>
        </nav>
      </div>
      <form id="search" className="search">
        <input
          type="search"
          placeholder="Search for a title..."
          onChange={props.searchAMovie}
        />
        <div className="searchResults">
        {props.results === 100
        ? '' 
        : `Found ${props.results} movies with the query ${props.value}`}
        </div>
      </form>
    </header>
  );
}

export default Header;