import { Component } from 'react';
import HomeComp from '../components/Home/Home';

class HomePage extends Component {

  
    render() {
        return(
            <>
            <HomeComp props={this.props}/>
            </>
        );
    }
}

export default HomePage;