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
const base = 4
const basis = 100 / base
const blockSize = basis - 2
const removeSize = blockSize / 5

const orderStyles = {
  display: 'flex',
  flexWrap: 'nowrap',
  // margin: '1px 0',
  margin: 0,
  // lineHeight: '40px',
  fontSize: `${base}vw`,
  transform: `translateX(-${blockSize - 1}em)`,
  transitionDuration: '0.3s',
  lineHeight: '3em',
  width: '300%',
  boxSizing: 'border-box',
}

const block = {
  boxSizing: 'border-box',
  width: `${blockSize}em`,
  padding: '0 .5em',
}

// & > *
// width 100%

const infoStyles = {
  ...block,
  // flex: 'auto',
  transitionDuration: '0.3s',
  border: '.2em solid',
  borderColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'space-between',
  display: 'flex',
}

const titleStyles = {
  lineHeight: '1em',
  // display: 'inline-block',
}

const removingOrderStyles = {
  transform: `translateX(-${blockSize + removeSize - 2}em)`,
}

const commentingOrderStyles = {
  transform: 'translateX(0em)',
}

const removingInfoStyles = {
  borderColor: red600,
}

const commentingInfoStyles = {
  // borderColor: cyan600,
  color: 'rgba(0,0,0,0)',
  // fontSize: '0.5em',
  // alignItems: 'flex-start',
  // '-webkit-filter': 'blur(2px)',
}
  // .title
  //   text-transform capitalize
  // .price
  //   float right

const removeStyles = {
  // flex: '1 1 10rem',
  width: `${removeSize}em`,
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
  ...block,
  padding: '.5em 1em',
  transitionDuration: '0.3s',
  backgroundColor: cyan600,
  // overflow: 'hidden',
}

const commentLabelStyles = {
  // backgroundColor: cyan600T,
  // backgroundColor: 'transparent',
  // opacity: '0',
  color: 'rgba(255,255,255,0.6)',
  lineHeight: '1.1em',
  // border: 'none',
  paddingBottom: '.5em',
  fontSize: '.8em',
  width: '100%',
  // display: 'inline-block',
}

const commentFieldStyles = {
  // backgroundColor: cyan600T,
  backgroundColor: 'transparent',
  // opacity: '0',
  color: 'white',
  border: 'none',
  boxSizing: 'border-box',
  lineHeight: '1.1em',
  fontSize: 'inherit',
  width: '100%',
  overflow: 'hidden',
  maxHeight: '1em',
  wordBreak: 'break-all',
  textAlign: 'justify',
  transitionDuration: '.3s',
  transitionDelay: '.1s',
  // display: 'inline-block',
}

const commentFieldActiveStyles = {
  maxHeight: '10em',
}

const commentBlockStyles = {
  // position: 'absolute',
  // width: '80vw',
  height: '100%',
  backgroundColor: cyan600T,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  // left: '-100vw',
  transitionDuration: '0.3s',
}

// const commentBlockActiveStyles = {
//   left: '0vw',
// }
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
      wasActive: false,
    }

    this.swipingLeft = this.swipingLeft.bind(this)
    this.swipingRight = this.swipingRight.bind(this)
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this)
  }

  calcP(delta, max) {
    const p = ACTION_DELTA - Math.max(0, ACTION_DELTA - delta)
    return Math.round(p / ACTION_DELTA * max)
  }

  swipingLeft(e, rightPan) {
    const max = 15
    const percent = this.calcP(rightPan, max)

    // console.log('swiping', p, this.state.rightPan, rightPan, percent)
    if (this.state.rightPan === percent) return

    if (this.state.commenting) {
      this.refs.comment.blur()
    }

    this.setState({
      leftPan: 0,
      rightPan: percent,
      removing: percent === max,
      commenting: false,
      wasActive: this.state.commenting || this.state.wasActive,
    })
    // this.setState({ rightPan: Math.min(150, this.state.rightPan + rightPan) })
  }

  swipingRight(e, leftPan) {
    if (this.state.commenting) return

    const max = 15
    const percent = this.calcP(leftPan, max)
    // console.log('swiping', e, leftPan)
    // this.setState({ rightPan: Math.max(20, this.state.rightPan - leftPan) })
    if (this.state.leftPan === percent) return

    this.setState({
      leftPan: percent,
      rightPan: 0,
      removing: false,
      commenting: percent === max,
    })
  }

  handleSwipeEnd() {
    if (this.state.removing && !this.state.wasActive) {
      this.props.remove(this.props.pos)
    }

    if (this.state.commenting) {
      this.refs.comment.focus()
    }

    this.setState({
      rightPan: 0,
      // leftPan: this.state.commenting ? this.state.leftPan : 0,
      leftPan: 0,
      // commenting: false,
      removing: false,
      wasActive: false,
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

    // const commentItemStyles = {
    //   ...commentBlockStyles,
    //   ...(this.state.commenting ? commentBlockActiveStyles : {}),
    // }

    const commentFieldStylesR = {
      ...commentFieldStyles,
      ...(this.state.commenting ? commentFieldActiveStyles : {}),
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
        className="order" style={orderStylesR}
      >
        <div
          className="comment"
          style={commentStyles}
        >
          <div className="comment-block" style={commentBlockStyles}>
            <small style={commentLabelStyles}>comment</small>
            <div
              ref="comment"
              contentEditable
              className="comment-field"
              style={commentFieldStylesR}
            >
            {`${title} ${title} ${title}`}
            </div>
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
