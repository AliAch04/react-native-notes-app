import { View, FlatList } from "react-native";
import NoteItem from "./NoteItems";

const NoteList = ({notes}) =>{
    return (
        <View>
            <FlatList 
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NoteItem note={item} />}
            />
        </View>
    );
}

export default NoteList ;