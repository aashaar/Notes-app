const chalk = require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')

// Create add command:
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:
    {
        title:
        {
            describe: 'Note title',
            demandOption : true,
            type: 'string' 
        },
        body:
        {
            describe: 'Body of the note',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
        //console.log('Title: '+ argv.title)
        //console.log('Body: ' +argv.body)
    }
})

// Create remove command:
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe: 'Title of note to be removed',
            demandOption : true,
            type: 'string'
        }
    },
    handler(argv)
    {
        notes.removeNote(argv.title)
    }
})

// Create list command:
yargs.command({
    command: 'list',
    describe: 'Lists all the notes',
    handler()
    {
        notes.listNotes()
    }
})

// Create read command:
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
        title:
        {
            describe: 'Title of note to be read',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv)
    {
        //console.log('Reading a note')
        notes.readNote(argv.title)

    }
})

yargs.parse()
//console.log(yargs.argv)
