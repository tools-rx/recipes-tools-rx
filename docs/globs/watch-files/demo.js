
import path from 'path'
import {Observable} from 'rxjs'
import {watchRx} from 'watch-rx'

let fromPath = path.join(__dirname, 'files')

watchRx('**/*', { cwd: fromPath })
  .takeUntil(Observable.timer(3000))
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
