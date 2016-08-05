const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'

export default {
  development: {
    domain: "http://localhost:3000"
  },
  staging: {
    domain: "http://www.cjblog.tw:3010"
  },
  production: {
    domain: "http://api.cjblog.tw"
  }
}[env]
