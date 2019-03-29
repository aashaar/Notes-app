const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) =>
{
    const notes = loadNotes()
    //console.log(notes)

    //const duplicateNotes = notes.filter((note)=> note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    //if(duplicateNotes.length === 0)
    if(!duplicateNote)
    {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added.'))
    }
    else{
        console.log(chalk.bgRed('Note title already exists. Choose new title'))
    }
    
}

const removeNote = (title)=>
{
    const notes = loadNotes()
    //filtering out note to be deleted
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notesToKeep.length === notes.length) // if no note filtered out with given title
    {
        console.log(chalk.bgRed('Note with given title not present.'))
    }
    else
    {
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note with title "'+ title + '" deleted.'))
    }
}

const listNotes = ()=>
{
    console.log(chalk.bgBlue('Listing all notes'))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    });
}


const readNote = (title)=>
{
    const notes = loadNotes()
    const noteFound = notes.find((note)=> note.title === title)
    if(noteFound)
    {
        console.log(chalk.blue(noteFound.title))
        console.log(noteFound.body)
    }
    else
    {
        console.log(chalk.bgRed('Note with given title not present.'))
    }
}


//function to save notes in the file system
const saveNotes = (notes)=>
{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

//function to load notes in the file system
const loadNotes = ()=>
{
    try
    {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    }
    catch(e)
    {
        return []
    }
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}