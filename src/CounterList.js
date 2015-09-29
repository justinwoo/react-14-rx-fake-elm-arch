import React from 'react';

import * as Counter from './Counter';

/**
 * CounterList.js
 *
 * exposes:
 *   init
 *   update
 *   view
 */

//type alias ID = Int
//type alias CounterUnit = [ ID, Counter.Model ]
//type alias Model =
    //{ counters : List CounterUnit
    //, nextID : ID
    //}
// no freaking real tuples in javascript
//init : Model
export let init = {
  counters: [],
  nextID: 0
};

//type Action
    //= Insert
    //| Remove
    //| Modify ID Counter.Action
let INSERT = 'INSERT';
let REMOVE = 'REMOVE';
let MODIFY = 'MODIFY';

//type alias ActionWrapper =
//  { type : Action
//  , ... }
export function update(actionWrapper, model) {
  switch (actionWrapper.type) {
    case INSERT:
      let newCounter = [model.nextID, Counter.init(0)];
      let newCounters = model.counters.slice()
      newCounters.push(newCounter);
      return Object.assign({}, model, {
        counters: newCounters,
        nextID: model.nextID + 1
      });
      break;
    case REMOVE:
      return Object.assign({}, model, {
        counters: model.counters.slice(0, model.counters.length - 1)
      });
      break;
    case MODIFY:
      let updateCounter = function (counter) {
        let [counterID, counterModel] = counter;
        if (counterID === actionWrapper.id) {
          return [counterID, Counter.update(actionWrapper.counterAction, counterModel)];
        } else {
          return counter;
        }
      };
      return Object.assign({}, model, {
        counters: model.counters.map(updateCounter)
      });
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

/**
 * Got better ideas on how to port this from Elm? Give me a shout!
 *
 *   viewCounter : Signal.Address Action -> (ID, Counter.Model) -> Html
 *   viewCounter address (id, model) =
 *     Counter.view (Signal.forwardTo address (Modify id)) model
 */
function viewCounter(address) {
  return function (counter) {
    let [counterID, counterModel] = counter;
    let forwardAddress = new Rx.Subject();
    forwardAddress.subscribe(function (action) {
      address.onNext({
        type: MODIFY,
        id: counterID,
        counterAction: action
      });
    });
    return Counter.view(forwardAddress, counterModel, counterID);
  };
}

//view : Signal.Address Action -> Model -> Html
export function view(address, model) {
  let counters = model.counters.map(viewCounter(address));
  return (
    <div>
      <button onClick={onClick(address, REMOVE)}>Remove</button>
      <button onClick={onClick(address, INSERT)}>Add</button>
      {counters}
    </div>
  );
}
