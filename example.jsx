/* global React: false, ReactDOM: false, Redux: false, ReactRedux: false */

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {
        value: state.value + 1,
      });
    case 'DECREMENT':
      return Object.assign({}, state, {
        value: state.value - 1,
      });
    case 'SET':
      return Object.assign({}, state, {
        value: action.value,
      });
    case 'RESET':
      return Object.assign({}, state, {
        value: 0,
      });
    default:
      return state;
  }
}

const store = Redux.createStore(reducer, {
  value: 0,
});

class Example_ extends React.Component {
  constructor (props) {
    super(props);
    this.input = null;
  }
  componentWillMount () {
    console.log('componentWillMount');
  }
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }
  componentDidUpdate (prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, this.props, prevState, this.state);
  }
  componentWillUnmount () {
    console.log('unmounting. bye!');
  }
  render () {
    const title = this.props.title;
    return <div>
      <h1 className="example-class">{title}</h1>
      <h2>Value: {this.props.value}</h2>
      <button onClick={() => store.dispatch({type: 'INCREMENT'})}>+</button>
      <button onClick={() => store.dispatch({type: 'DECREMENT'})}>-</button>
      &nbsp;
      <input type="number" default={this.props.value} id="value" ref={elem => this.input = elem} />
      <button onClick={() => store.dispatch({type: 'SET', value: this.input.value })}>set</button>
      &nbsp;
      <button onClick={() => store.dispatch({type: 'RESET'})}>reset</button>
    </div>;
  }
}
Example_.propTypes = {
  value: ({value}) => {
    if (value && Number.isNaN(parseFloat(value, 10))) {
      return new Error(`Value must be a number!, but is ${value}`);
    }
    return null;
  },
  title: ({title}) => {
    if (title && title[0] !== title[0].toUpperCase()) {
      return new Error('Title must start with uppercase!');
    }
    return null;
  },
};


const stateToProps = (state) => ({value: state.value});
const Example = ReactRedux.connect(stateToProps)(Example_);

// example component that is just a js function
// function FuncComponent (props) {
//   return <h1>func component! {props.title}</h1>;
// }

// const AnonComponent = props => <h1>anon component! {props.title}</h1>;

ReactDOM.render(<ReactRedux.Provider store={store}>
  <Example title="Test title" />
</ReactRedux.Provider>, document.getElementById("root"));
// ReactDOM.render(<FuncComponent title="blah" />, document.getElementById("root"));
// ReactDOM.render(<AnonComponent title="blah" />, document.getElementById("root"));
