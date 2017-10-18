import _ from 'lodash'

export default function apiReducer(state={}, action) {
  var operator = action.operator || "=";
  if (action.payload && action.group && action.name) {
    state[action.group] = state[action.group] || {};
    
    if (operator == "=") {
      state[action.group][action.name] = action.payload;
    } else if (operator == "-" && Array.isArray(action.payload)) {
      var orig = state[action.group][action.name] || [];
      var toRemove = action.payload.map(i => i._id);
      state[action.group][action.name] = orig.filter(i => toRemove.indexOf(i._id) < 0);
    } else if (operator == "+" && Array.isArray(action.payload)) {
      var orig = state[action.group][action.name] || [];
      state[action.group][action.name] = orig.concat(action.payload);
    }
  }
  return _.cloneDeep(state);
}
