export const saveFlavor = flavor => ({
  type: 'SAVE_FLAVOR',
  flavor
});

export const saveRecord = record => ({
  type: 'SAVE_RECORD',
  record
});

export const saveAccessories = accessories => ({
  type: 'SAVE_ACCESSORIES',
  accessories
});

export const coffeeBuilderQueueData = data => ({
  type: 'COFFEE_BUILDER_QUEUE_DATA',
  data
});

export const removeLastSecondData = () => ({
  type: 'COFFEE_BUILDER_DATA_REMOVE_LAST_SECOND'
});

export const coffeeBuilderModeChange = mode => ({
  type: 'COFFEE_BUILDER_MODE_CHANGE',
  mode
});

export const saveTimer = seconds => ({
  type: 'SAVE_TIMER',
  seconds
});

export const removeRecord = recordIndex => ({
  type: 'REMOVE_RECORD',
  recordIndex
});
