export const DATA = [
    { name: 'Berry', type: 'Fruits'},
    { name: 'Apple', type: 'Fruits'}
]

const addKeys = (val, key) => 
  ({key, ...val, amount:'5', unit:'lb', checked: false})

export default DATA.map(addKeys)