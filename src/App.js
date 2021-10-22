import React, { Component } from 'react';

class Nav extends Component {
  state = {
    list:[]
  }
  componentDidMount(){
    fetch('list.json')
    .then(function(result){ 
      return result.json(); // Convert Json Text to Javascript object
    })
    .then(function(json) {
      console.log(json);
      this.setState({ list:json });
    }.bind(this));
  }
  render() {
    var listTag = [];
    for(var i=0; i<this.state.list.length; i++){
      var li = this.state.list[i];
      listTag.push(
        <li key={li.id}>
          <a href={li.id} data-id={li.id} onClick={function(e){
            e.preventDefault();
            this.props.onClick(e.target.dataset.id);
          }.bind(this )}>
            {li.title}
          </a>
        </li>
      );
    }
    return(
      <nav>
        {listTag}
      </nav>
    );
  }
}

class Article extends Component{
  state ={

  }
  render(){
    return(
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    )
  }
}
class App extends Component {
  state = {
    article:{title:'Welcome', desc:'Hello React & Ajax'}
  }
  render() {
     return(
      <div className="App">
        <h1>WEB</h1>
        <Nav onClick={function(id){
          console.log(id);
        }.bind(this)}></Nav>
        <Article title={this.state.article.title} desc={this.state.article.desc}></Article>
      </div>
    );
  }
}

export default App;
