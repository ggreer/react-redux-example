/* global React: false, ReactDOM: false, Redux: false, ReactRedux: false */

function reducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return 0;
    default:
      return state;
  }
}

const store = Redux.createStore(reducer, 0);

class Example_ extends React.Component {
  // componentWillMount () {
  //   this.setState({
  //     blah: "thing",
  //   });
  // }
  // componentWillReceiveProps (nextProps) {
  //   if (!_.equals(this.props, nextProps)) {
  //   }
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }
  // componentDidUpdate (prevProps, prevState) {
  // }
  // componentWillUnmount () {
  // }
  render () {
    // this.props.title = 'blah';
    console.log(this.props);
    const title = this.props.title;
    return <div>
      <h1 className="example-class">Class component: {title}</h1>
      <button onClick={() => store.dispatch({type: 'INCREMENT'})}>+</button>
      <button onClick={() => store.dispatch({type: 'DECREMENT'})}>-</button>
      value: {this.props.value}
    </div>;
  }
}

const stateToProps = (state) => ({value: state});
const Example = ReactRedux.connect(stateToProps)(Example_);

// example component that is just a js function
function FuncComponent (props) {
  return <h1>func component! {props.title}</h1>;
}

const AnonComponent = props => <h1>anon component! {props.title}</h1>;

ReactDOM.render(<ReactRedux.Provider store={store}>
  <Example title="blah" />
</ReactRedux.Provider>, document.getElementById("root"));
// ReactDOM.render(<FuncComponent title="blah" />, document.getElementById("root"));
// ReactDOM.render(<AnonComponent title="blah" />, document.getElementById("root"));
