const SERVER = 'http://localhost'
const PORT = '8080'
const API_URL = {
  getTree: '/getTree',
  getConfig: '/getConfig'
}

export default {
  url (name) {
    return SERVER + ':' + PORT + API_URL[name]
  }
}
