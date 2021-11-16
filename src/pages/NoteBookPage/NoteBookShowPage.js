import React from "react";
import NoteBookShow from "../../components/NoteBookShow/NoteBookShow";

class NoteBookShowPage extends React.Component{
    state = {
        title:'',
        sentence:''
    }

    async componentDidMount(){
        let fetchResponse = await fetch('/api/notebook/'+this.props.match.params.id);
        let serverResponse = await fetchResponse.json();
        this.setState({
            title:serverResponse.title,
            sentence:serverResponse.sentence
        })
    }
      render(){
        return(
            <>
            <NoteBookShow title = {this.state.title}
            sentence = {this.state.sentence}
            />
            </>
        );
    }
}

export default NoteBookShowPage;