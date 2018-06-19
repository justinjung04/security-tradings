export default {
  app: {
    isLoaded: false,
    activeModal: ''
  },
  user: {
    id: '',
    name: '',
    action: {
      type: '',
      security: {}
    }
  },
  security: {
    list: []
  },
  transaction: {
    list: []
  },
  currency: {
    list: [],
    active: 'CAD',
    rates: {}
  }
}