require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note['content'])
//   })
//   mongoose.connection.close()
// })

const saveNotes = async () => {
  await Note.insertMany([
    { content: 'MongoDB is fun', important: true },
    { content: 'CSS is Hard', important: true },
  ])

  console.log('notes saved')
  mongoose.connection.close()
}

saveNotes()