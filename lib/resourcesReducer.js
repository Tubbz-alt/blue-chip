"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = resourcesReducer;

var _immer = require("immer");

var _immer2 = _interopRequireDefault(_immer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {};

function resourcesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var resourceType = action.resourceType;

  return (0, _immer2.default)(state, function (draft) {
    switch (action.type) {
      case "ADD_OR_REPLACE_RESOURCE_BY_ID":
        var newState = _extends({}, state);
        var type = action.type,
            spec = action.spec,
            id = action.id,
            attributes = action.attributes,
            links = action.links,
            relationships = action.relationships;


        _initializeResource(newState, resourceType);

        newState[resourceType][id] = {
          type: resourceType,
          id: id,
          attributes: attributes,
          links: links,
          relationships: relationships
        };

        return newState;
      case "MERGE_RESOURCES":
        var resourcesById = action.resourcesById;

        if (!state[resourceType]) {
          draft[resourceType] = {};
        }

        Object.entries(resourcesById).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              id = _ref2[0],
              resource = _ref2[1];

          return draft[resourceType][id] = resource;
        });
    }
  });
}

var _initializeResource = function _initializeResource(newState, resourceType) {
  if (resourceType in newState) return;
  newState[resourceType] = {};
};