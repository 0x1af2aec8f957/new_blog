const axios = require('axios')

exports.fetchTHistory = () => axios.get(
  'http://history.muffinlabs.com/date').
  then(response => response.data)
