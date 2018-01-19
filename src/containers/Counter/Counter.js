import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actuions';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
  state = {
    counter: 0
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case 'inc':
        this.setState((prevState) => {
          return {counter: prevState.counter + 1}
        });
        break;
      case 'dec':
        this.setState((prevState) => {
          return {counter: prevState.counter - 1}
        });
        break;
      case 'add':
        this.setState((prevState) => {
          return {counter: prevState.counter + value}
        });
        break;
      case 'sub':
        this.setState((prevState) => {
          return {counter: prevState.counter - value}
        });
        break;
    }
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <CounterOutput value={this.props.ctr}/>
        <CounterControl label="Increment" clicked={() => this.props.onIncrementCounter()}/>
        <CounterControl label="Decrement" clicked={() => this.counterChangedHandler('dec')}/>
        <CounterControl label="Add 5" clicked={() => this.counterChangedHandler('add', 5)}/>
        <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler('sub', 5)}/>
        <hr/>
        <button onClick={this.props.onSaveResult}>Store Result</button>
        <ul>
          {this.props.results.map(result => {
            return <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.counter,
    results: state.results
  };
};

const mapDispatchToProps = (dispatch, state) => {
  console.log(state);
  return {
    onIncrementCounter: () => dispatch({type: actionTypes.INC_COUNTER}),
    onSaveResult: () => dispatch({type: actionTypes.STORE_RESULT}),
    onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, id: id})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);