import React from 'react'
import Item from './item'

document.body.style.margin = 0
const ordersMock = [
  {
    // title: 'Жареная курица в панировке Торикацу',
    title: 'Жареная курица в япoнской панировке Торикацу',
    price: 87,
  },
  {
    title: 'Лимонад классический с мятой',
    price: 20.02,
  },
  {
    title: 'Каліфорнія зі свіжим лососем в ікрі',
    price: 69,
  },
  {
    title: 'Жареная курица в панировке Торикацу',
    // title: 'Жареная курица в япoнской панировке Торикацу',
    price: 87,
  },
  {
    title: 'Лимонад классический с мятой',
    price: 20.02,
  },
  {
    title: 'Каліфорнія зі свіжим лососем в ікрі',
    price: 69,
  },
]

const containerStyles = {
  listStyle: 'none',
  // margin: '10px',
  margin: 0,
  padding: 0,
  display: 'block',
  fontSize: '90%',
  // width: '400px',
  width: '100vw',
}

class Order extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      orders: ordersMock,
    }

    this.remove = this.remove.bind(this)
  }

  remove(pos) {
    this.setState({
      orders: this.state.orders.filter((o, i) => i !== pos),
    })
  }

  render() {
    return (
      <ul style={containerStyles}>
        {this.state.orders.map((data, pos) => <Item {...data} remove={this.remove} pos={pos} />)}
      </ul>
    )
  }
}

// Order.propTypes = {
//   children: React.PropTypes.string.isRequired,
//   onClick: React.PropTypes.func,
//   style: React.PropTypes.object,
// }

export default Order
