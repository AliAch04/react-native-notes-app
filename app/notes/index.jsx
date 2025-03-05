import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,} from "react-native";
import NoteList from "@/components/NoteList";
import AddNoteModal from "@/components/AddNoteModal";

const NoteScreen = () =>{
    const [notes, setNotes] = useState([
        {id : 1, text: 'Test Note One'},
        {id : 2, text: 'Test Note Two'},
        {id : 3, text: 'Test Note three'},
    ]);

    const [modalVisible, setModalVisible] = useState(false)
    const [newNote, setNewNote] = useState('')

    const addNote = () => {
        if(newNote.trim() === "") return;

        setNotes((prevNotes) => [
            ...prevNotes, 
            {id : Date.now.toString(), text: newNote}
        ])

        setNewNote('');
        setModalVisible(false);
    }

    return (
        <View style = {styles.container}>
            
            <NoteList notes={notes} />

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ Add Note</Text>
            </TouchableOpacity>

            <AddNoteModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                newNote={newNote}
                setNewNote={setNewNote}
                addNote={addNote}
            />

        </View>
    );
};


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    noteItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    noteText:{
        fontSize: 18
    },
    addButton:{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'

    },
    addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        
    },
    

})

export default NoteScreen;