import React from "react";
import NoteBook from "../../components/NoteBook/NoteBook.jsx";

class NoteBookPage extends React.Component{
    state = {
        title : [],
        sentence : [],
        items : []
    }

    async componentDidMount(){
        try{
            let fetchResponse = await fetch('/api/notebook');
            let items = await fetchResponse.json();
            console.log(items)
            this.setState({
                items : items
            })
        }catch(err){
            console.log("Error:" , err)
        }
    }
    render(){
        return(
            <>
            <NoteBook items = {this.state.items}/>
            </>
        );
    }
}

export default NoteBookPage;