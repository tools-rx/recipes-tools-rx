
import path from 'path'
import fs from 'fs'
import {Observable} from 'rxjs'
import {watchRx} from 'watch-rx'

const writeFileRx = Observable.bindNodeCallback(fs.writeFile)
const renameRx = Observable.bindNodeCallback(fs.rename)
const unlinkRx = Observable.bindNodeCallback(fs.unlink)

const fromPath = path.join(__dirname, 'files')

// Watch for file changes
watchRx('**/*', { cwd: fromPath })
  .takeUntil(Observable.timer(3000))
  .subscribe({
    next (file) {
      console.log(`File[${file.event}] : ${file.name}`)
    },
    error (err) {
      console.error('Error:', err)
    },
    complete () {
      console.log('End of file list.')
    }
  })

// Then make some changes to the files
Observable
  .timer(1000)
  .concat(writeFileRx(path.join(fromPath, 'a', 'two.txt'), 'updated'))
  .concat(unlinkRx(path.join(fromPath, 'b', 'three.txt')))
  .concat(renameRx(path.join(fromPath, 'c', 'five.txt'), path.join(fromPath, 'c', 'five-renamed.txt')))
  .concat(writeFileRx(path.join(fromPath, 'c', 'six.txt'), 'new file'))
  .catch((err) => console.error(err))
  .subscribe()
