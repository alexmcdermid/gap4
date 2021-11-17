import React from "react";
import NoteBookEdit from "../../components/NoteBookEdit/NoteBookEdit";

class NoteBookEditPage extends React.Component{
    state = {
        title:'',
        sentence:''
    }
    async componentDidMount(){
            let fetchResponse = await fetch('/api/notebook/'+this.props.match.params.id);
            let serverResponse = await fetchResponse.json();
            this.setState({
                title :serverResponse.title,
                sentence:serverResponse.sentence
            })
    }

    onEditChange = (event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    editWriting=async()=>{
        try{
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch('/api/notebook/update/'+this.props.match.params.id,{
                method:"POST",
                headers:{"Content-Type": 'application/json','Authorization': 'Bearer ' + jwt},
                body:JSON.stringify({
                    title:this.state.title,
                    sentence:this.state.sentence
                })
            })
            let serverResponse = await fetchResponse.json()
            console.log("Success:" , serverResponse)
            this.setState({
                title:serverResponse.title, 
                 sentence:serverResponse.sentence
            })
        }catch(err){
            console.log("Error:" , err)
        }

    }
      render(){
        return(
            <>
            <NoteBookEdit title = {this.state.title}
            sentence = {this.state.sentence}
            onEditChange = {this.onEditChange}
            editWriting = {this.editWriting}/>
            </>
        );
    }
}

export default NoteBookEditPage;