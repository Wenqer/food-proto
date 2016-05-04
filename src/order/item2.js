import React from 'react'
import Swipeable from 'react-swipeable'

// const buttonStyles = {
//   border: '1px solid #eee',
//   borderRadius: 3,
//   backgroundColor: '#FFFFFF',
//   cursor: 'pointer',
//   fontSize: 15,
//   padding: '3px 10px',
// }

const cyan600 = '#00acc1'
const cyan600T = 'rgba(0, 172, 193, 0.9)'
const red600 = '#e53935'

const orderStyles = {
  display: 'flex',
  flexWrap: 'nowrap',
  // margin: '1px 0',
  margin: 0,
  // lineHeight: '40px',
  fontSize: '5vw',
  transform: 'translateX(-17em)',
  transitionDuration: '0.3s',
  lineHeight: '4em',
  width: '300%',
  boxSizing: 'border-box',
}

// & > *
// width 100%

const infoStyles = {
  // flex: 'auto',
  padding: '0 .5em',
  transitionDuration: '0.3s',
  border: '2px solid',
  borderColor: 'transparent',
  width: '17em',
  alignItems: 'center',
  justifyContent: 'space-between',
  display: 'flex',
}

const titleStyles = {
  lineHeight: '1em',
  // display: 'inline-block',
}

const removingOrderStyles = {
  transform: 'translateX(-22em)',
}

const commentingOrderStyles = {
  transform: 'translateX(0em)',
}

const removingInfoStyles = {
  borderColor: red600,
}

const commentingInfoStyles = {
  borderColor: cyan600,
  color: 'rgba(0,0,0,0.3)',
  fontSize: '0.5em',
  // alignItems: 'flex-start',
  // '-webkit-filter': 'blur(2px)',
}
  // .title
  //   text-transform capitalize
  // .price
  //   float right

const removeStyles = {
  // flex: '1 1 10rem',
  width: '6em',
  transitionDuration: '0.3s',
  textAlign: 'center',
  backgroundColor: red600,
  color: red600,
  cursor: 'pointer',
}
  // &:active
  // &:hover
  //   color white
  //   flex 1 30px

const commentStyles = {
  // flex: '1',
  transitionDuration: '0.3s',
  backgroundColor: cyan600,
  width: '17em',
  position: 'relative',
  padding: '0 .5em',
  // padding: '0 0 0 10px',
  // overflow: 'hidden',
}

const commentFieldStyles = {
  // backgroundColor: cyan600T,
  backgroundColor: 'transparent',
  // opacity: '0',
  color: 'white',
  border: 'none',
  // display: 'inline-block',
}

const commentBlockStyles = {
  // position: 'absolute',
  // width: '80vw',
  height: '100%',
  backgroundColor: cyan600T,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // left: '-100vw',
  transitionDuration: '0.3s',
}

const commentBlockActiveStyles = {
  left: '0vw',
}
// &:hover
//   flex 1 300px
//   .comment-field
//     opacity 1
//

const ACTION_DELTA = 100


class Item extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      rightPan: 0,
      leftPan: 0,
      removing: false,
      commenting: false,
    }

    this.swipingLeft = this.swipingLeft.bind(this)
    this.swipingRight = this.swipingRight.bind(this)
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this)
  }

  calcP(delta) {
    return ACTION_DELTA - Math.max(0, ACTION_DELTA - delta)
  }

  swipingLeft(e, rightPan) {
    const p = this.calcP(rightPan)
    const percent = Math.round(p / ACTION_DELTA * 15)
    // console.log('swiping', p, rightPan, percent)
    if (this.state.rightPan === percent) return

    this.setState({
      leftPan: 0,
      rightPan: percent,
      removing: ACTION_DELTA === p,
      commenting: false,
    })
    // this.setState({ rightPan: Math.min(150, this.state.rightPan + rightPan) })
  }

  swipingRight(e, leftPan) {
    if (this.state.commenting) return

    const p = this.calcP(leftPan)
    const percent = Math.round(p / ACTION_DELTA * 15)
    // console.log('swiping', e, leftPan)
    // this.setState({ rightPan: Math.max(20, this.state.rightPan - leftPan) })
    if (this.state.leftPan === percent) return

    this.setState({
      leftPan: percent,
      rightPan: 0,
      removing: false,
      commenting: ACTION_DELTA === p,
    })
  }

  handleSwipeEnd() {
    // if (this.state.removing) {
    //   this.props.remove(this.props.pos)
    // }

    this.setState({
      rightPan: 0,
      // leftPan: this.state.commenting ? this.state.leftPan : 0,
      leftPan: 0,
      // commenting: false,
      removing: false,
    })
  }

  render() {
    const { price, title } = this.props
    const orderStylesR = {
      ...orderStyles,
      ...(this.state.removing ? removingOrderStyles : {}),
      ...(this.state.commenting ? commentingOrderStyles : {}),
    }

    const itemStyles = {
      ...infoStyles,
      ...(this.state.removing ? removingInfoStyles : {}),
      ...(this.state.commenting ? commentingInfoStyles : {}),
    }

    const commentItemStyles = {
      ...commentBlockStyles,
      ...(this.state.commenting ? commentBlockActiveStyles : {}),
    }
// style={{ ...commentStyles, flexBasis: `${this.state.leftPan}%` }}
// style={{ ...commentStyles, flexBasis: `${'0'}%` }}
// style={{ ...removeStyles, flexBasis: `${this.state.rightPan}%` }}
    return (
      <Swipeable
        onSwipingLeft={this.swipingLeft}
        onSwipingRight={this.swipingRight}
        /* onSwipingUp={this.swipingUp}
        onSwipingDown={this.swipingDown}
        onSwipingLeft={this.swipingLeft}
        onSwipedUp={this.swipedUp}
        onSwipedRight={this.swipedRight}
        onSwipedDown={this.swipedDown}
        onSwipedLeft={this.swipedLeft}*/
        onSwiped={this.handleSwipeEnd}
        preventDefaultTouchmoveEvent
      >
        <li className="order" style={orderStylesR}>
          <div
            className="comment"
            style={commentStyles}
          >
            <div className="comment-block" style={commentItemStyles}>
              <input
                type="text"
                className="comment-field"
                style={commentFieldStyles}
                value={ `comment for ${title}` }
              />
            </div>
          </div>
          <div className="order-info" style={itemStyles}>
            <span className="title" style={titleStyles}>{title}</span>
            <span className="price">{price}</span>
          </div>
          <div
            className="remove"
            style={removeStyles}
          >x</div>
        </li>
      </Swipeable>
    )
  }
}

Item.propTypes = {
  title: React.PropTypes.string,
  price: React.PropTypes.number,
  pos: React.PropTypes.number,
  remove: React.PropTypes.function,
}

export default Item
