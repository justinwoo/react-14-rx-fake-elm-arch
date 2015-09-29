import Rx from 'rx';

/**
 * type alias Config model action =
 *   { model : model
 *   , view : Signal.Address action -> model -> Html
 *   , update : action -> model -> model
 *   }
 */

/**
 * start : Config model action -> Signal Html
 */
export default function start(config) {
  let address = new Rx.Subject();

  let actions = Rx.Observable.just(config.model).merge(address);

  let model = actions.scan(function (model, action) {
    return config.update(action, model);
  });

  return model.map(function (model) {
    return config.view(address, model);
  });
}
