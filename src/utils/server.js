import axios from 'axios'
import { APIV2 } from './config'

module.exports = axios.create({
  baseURL: `${APIV2}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
