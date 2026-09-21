export const CATEGORIES = [
  { id: 'all', name: 'All beds' },
  { id: 'spring', name: 'Spring beds' },
  { id: 'foam', name: 'Compressed foam beds' },
  { id: 'pillowtop', name: 'Pillowtop beds' },
]

export const products = [
  { id: 'double-spring-standard', name: 'Double spring standard bed', size: 'Double', construction: 'Spring', finish: 'Standard', price: 160, img: '/images/double-spring-standard.jpg' },
  { id: 'double-spring-pillowtop', name: 'Double spring pillowtop bed', size: 'Double', construction: 'Spring', finish: 'Pillowtop', price: 190, img: '/images/double-spring-pillowtop.jpg' },
  { id: 'queen-compressed-foam', name: 'Queen compressed foam bed', size: 'Queen', construction: 'Compressed foam', finish: 'Standard', price: 160, img: '/images/queen-compressed-foam.jpg' },
  { id: 'queen-spring-standard', name: 'Queen spring standard bed', size: 'Queen', construction: 'Spring', finish: 'Standard', price: 180, img: '/images/queen-spring-standard.jpg' },
  { id: 'queen-compressed-pillowtop', name: 'Queen compressed foam pillowtop bed', size: 'Queen', construction: 'Compressed foam', finish: 'Pillowtop', price: 210, img: '/images/queen-compressed-pillowtop.jpg' },
  { id: 'queen-spring-pillowtop', name: 'Queen spring pillowtop bed', size: 'Queen', construction: 'Spring', finish: 'Pillowtop', price: 220, img: '/images/queen-spring-pillowtop.jpg' },
  { id: 'double-compressed-standard', name: 'Double compressed foam standard bed', size: 'Double', construction: 'Compressed foam', finish: 'Standard', price: 140, img: '/images/double-compressed-standard.jpg' },
  { id: 'double-compressed-pillowtop', name: 'Double compressed foam pillowtop bed', size: 'Double', construction: 'Compressed foam', finish: 'Pillowtop', price: 180, img: '/images/double-compressed-pillowtop.jpg' },
]

export const product = (id) => products.find((item) => item.id === id)
export const money = (amount) => `$${amount}`
