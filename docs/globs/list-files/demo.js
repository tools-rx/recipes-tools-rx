
import path from 'path'
import {globRx} from 'glob-rx'

let fromPath = path.join(__dirname, 'files')

globRx('**/*', { cwd: fromPath })
  .subscribe({
    next (file) {
      console.log('Found file:', file.fullname)
    },
    error (err) {
      console.error('Error:', err)
    },
    complete () {
      console.log('End of file list.')
    }
  })
