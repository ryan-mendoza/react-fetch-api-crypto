import React, { Component } from 'react';

class Coin extends Component {
  state = {
    isLoading: false,
    id: [],
    error: null,
  };

  fetchCoins() {
    fetch('api.coincap.io/v2/assets')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          id: data,
          isLoading: false,
        })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchCoins();
  }

  render() {
    const { isLoading, id, error } = this.state;
    return (
      <div>
        <h1>Lets check the Crypto prices today</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          id.map((crypto) => {
            const { id, symbol, priceUsd } = crypto;
            return (
              <div key={id}>
                <p>Symbol: {symbol}</p>
                <p>Price: {priceUsd}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default Coin;
