import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity,} from "react-native";
import NoteList from "@/components/NoteList";
import AddNoteModal from "@/components/AddNoteModal";
import noteService from '@/services/noteService'

const NoteScreen = () =>{
    const [notes, setNotes] = useState([]);

    const [modalVisible, setModalVisible] = useState(false)
    const [newNote, setNewNote] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        fetchNote();
    }, [])

    const fetchNote = async () =>{
        setLoading(true);
        const response = await noteService.getNotes();

        if(response.error){
            setError(response.error);
            Alert.alert('Error', response.error)

        }else{
            setNotes(response.data);
            setError(null);
        }

        setLoading(false)
    }

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