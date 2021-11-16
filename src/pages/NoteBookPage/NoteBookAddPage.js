import React from "react";
import NoteBookAdd from "../../components/NoteBookAdd/NoteBookAdd";

class NoteBookAddPage extends React.Component{
    state = {
        title:"",
        sentence:""
    }
    handleChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    addWriting=async()=>{
        try{
            let fetchResponse = await fetch('/api/notebook/add',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    title:this.state.title,
                    sentence:this.state.sentence
                })          
            })
            let serverResponse = await fetchResponse.json();
            console.log("Success:" , serverResponse);
            this.setState({
                title:"",
                sentence:""
            })
            this.props.history.push('/notebook')
        }catch(err){
            console.log('Error:',err)
        }
    }
      render(){
        return(
            <>
            <NoteBookAdd title = {this.state.title}
            sentence = {this.state.sentence}
            handleChange = {this.handleChange}
            addWriting = {this.addWriting}/>
            </>
        );
    }
}

export default NoteBookAddPage;