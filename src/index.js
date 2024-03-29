const shell = require('shelljs')
const {app} = require('./main')
const {log_instruction} = require('./helpers/instructions')



const main = () => {
  const standard_input = process.stdin
  standard_input.setEncoding('utf-8')
  
  log_instruction()

  standard_input.on('data', entries => {
    
    switch(entries){
      case 'exit\n':
        console.log('Hope you had a nice time, Program is Existing 👋 👋')
        process.exit()
        break
      case 'clr\n':
        shell.exec('clear')
        log_instruction()
        break
      case 'rs\n':
        console.log('Restarting Service ✋ 👊')
        return main()
      default:
        console.log('Processing Your Request  ✋ ✋ ✋ \n \n');
        let cleaned_entries = entries.replace(/[^a-zA-Z0-9,. ]/g, '').replace(/\n$/, '').split(',')
        return cleaned_entries.length <= 0 ? main() : 
          cleaned_entries.length === 1 && cleaned_entries[0].length <= 0 ? log_instruction() :
            app(cleaned_entries)
    }
  })

}

main()
