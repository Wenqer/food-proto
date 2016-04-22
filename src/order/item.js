import React from 'react'

// const buttonStyles = {
//   border: '1px solid #eee',
//   borderRadius: 3,
//   backgroundColor: '#FFFFFF',
//   cursor: 'pointer',
//   fontSize: 15,
//   padding: '3px 10px',
// }

const orderStyles = {
  display: 'flex',
  margin: '5px 0',
  lineHeight: '30px',
}
// & > *
// width 100%

const infoStyles = {
  flex: 'auto',
  margin: '0 5px',
  width: '100%',
}
  // .title
  //   text-transform capitalize
  // .price
  //   float right

const removeStyles = {
  flex: '1',
  width: '100%',
  transitionDuration: '0.3s',
  textAlign: 'center',
  backgroundColor: 'red',
  color: 'red',
  cursor: 'pointer',
}
  // &:active
  // &:hover
  //   color white
  //   flex 1 30px

const commentStyles = {
  flex: '1 0px',
  transitionDuration: '0.3s',
  backgroundColor: 'cyan',
  width: '200px',
  padding: '0 10px',
  overflow: 'hidden',
}

const commentFieldStyles = {
  opacity: '0',
  border: 'none',
  display: 'inline-block',
}
// &:hover
//   flex 1 300px
//   .comment-field
//     opacity 1
//


const Item = ({ title, price }) => (
  <li className="order" style={orderStyles}>
    <div className="comment" style={commentStyles}>
      <input type="text" className="comment-field" style={commentFieldStyles} />
    </div>
    <div className="order-info" style={infoStyles}>
      <span className="title">{title}</span>
      <span className="price" style={{ float: 'right' }}>{price}</span>
    </div>
    <div className="remove" style={removeStyles}>x</div>
  </li>
)

Item.propTypes = {
  title: React.PropTypes.string,
  price: React.PropTypes.number,
}

export default Item
