import mongoose from 'mongoose'
import app from './app'
import config from './config'
// const port = 3000

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string)
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}
main()
