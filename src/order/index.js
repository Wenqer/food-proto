import React from 'react'
import Item from './item'


const ordersMock = [
  {
    title: 'food1',
    price: 10.01,
  },
  {
    title: 'food2',
    price: 20.02,
  },
  {
    title: 'food3',
    price: 30.03,
  },
]

const containerStyles = {
  listStyle: 'none',
  margin: '10px',
  padding: '0',
  display: 'block',
  width: '300px',
}

const Order = () => (
  <ul style={containerStyles}>
    {ordersMock.map(data => <Item {...data} />)}
  </ul>
)

// Order.propTypes = {
//   children: React.PropTypes.string.isRequired,
//   onClick: React.PropTypes.func,
//   style: React.PropTypes.object,
// }

export default Order
