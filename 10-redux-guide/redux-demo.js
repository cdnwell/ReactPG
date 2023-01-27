const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  // 디폴트와 같은 초기화 액션이 디스패치 된다면 변하지 않는 상태 리턴
  return state;
};

const store = redux.createStore(counterReducer);

//console.log(store.getState());  // 초기 상태가 필요하다면

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: "increment" }); // 액션을 전송하는 메소드
// 값이 2가 된다. 초기화 이후에 1이되고 새로운 액션을 발송해서 2가 됨

store.dispatch({ type: "decrement" });
