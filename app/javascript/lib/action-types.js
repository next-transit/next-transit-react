function actionsObject(action_names) {
  let obj = {};

  action_names.forEach((name) => {
    obj[name] = name.toLowerCase();
  });

  return obj;
}


export default {
  agencies: actionsObject([
    'AGENCIES_REQUESTED',
    'AGENCIES_RECEIVED',
    'AGENCIES_FAILED',
    
    'AGENCY_REQUESTED',
    'AGENCY_RECEIVED',
    'AGENCY_FAILED'
  ]),

  route_types: actionsObject([
    'ROUTE_TYPES_REQUESTED',
    'ROUTE_TYPES_RECEIVED',
    'ROUTE_TYPES_FAILED'
  ]),

  settings: actionsObject([
    'SETTINGS_REQUESTED',
    'SETTINGS_RECEIVED'
  ])
};
