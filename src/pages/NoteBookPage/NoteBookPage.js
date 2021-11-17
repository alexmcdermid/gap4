import React from "react";
import NoteBook from "../../components/NoteBook/NoteBook.jsx";

class NoteBookPage extends React.Component{
    state = {
        items : []
    }

    async componentDidMount(){
        try{
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch('/api/notebook',
            {headers: {'Authorization': 'Bearer ' + jwt}});
            let items = await fetchResponse.json();
            console.log(items)
            this.setState({
                items : items
            })
        }catch(err){
            console.log("Error:" , err)
        }
    }
    delete = async(id)=>{
        try{
            let  fetchResponse = await fetch('/api/notebook/delete/'+id,{
                method:'DELETE',
                headers:{"Content-Type":"application/json"}
            })
            let serverResponse = await fetchResponse.json();
            console.log("Success:" , serverResponse);
            this.setState({
                items:serverResponse
            })
        }catch(err){
            console.log("Error:",err)
        }
    }
    render(){
        return(
            <>
            <NoteBook items = {this.state.items}
            delete = {this.delete}/>
            </>
        );
    }
}

export default NoteBookPage;