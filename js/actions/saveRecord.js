export const saveSelectedFlavor = flavor => ({
  type: 'SAVE_SELECTED_FLAVOR',
  flavor
});

export const saveSelectedAccessories = accessories => ({
  type: 'SAVE_SELECTED_ACCESSORIES',
  accessories
});

export const saveShareUrl = url => ({
  type: 'SAVE_SHARE_URL',
  url
});