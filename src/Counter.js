import React from 'react';

/**
 * Counter.js
 *
 * exposes:
 *   init
 *   update
 *   view
 */

// type alias Model = Int
// init : Int -> Model
export function init(count) {
  return count;
}

//type Action = Increment | Decrement
let INCREMENT = 'INCREMENT';
let DECREMENT = 'DECREMENT';

//type alias ActionWrapper =
//  { type : Action
//  , ... }
export function update(actionWrapper, model) {
  switch (actionWrapper.type) {
    case INCREMENT:
      return model + 1;
      break;
    case DECREMENT:
      return model - 1;
      break;
  }
  return model;
}

function onClick(address, action) {
  return function () {
    address.onNext({
      type: action
    });
  }
}

export function view(address, model, renderKey) {
  return (
    <div key={renderKey}>
      <button onClick={onClick(address, DECREMENT)}>-</button>
      <h2>{model}</h2>
      <button onClick={onClick(address, INCREMENT)}>+</button>
    </div>
  );
}
