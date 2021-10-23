import React, { Component } from 'react';

class Nav extends Component {
  render() {
    var listTag = [];
    for(var i=0; i<this.props.list.length; i++){
      var li = this.props.list[i];
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

class NowLoading extends Component{
  render(){
    return <div>Now Loading...</div>
  }
}
class App extends Component {
  state = {
    article:{
      item:{title:'Welcome', desc:'Hello, React & Ajax'},
      isLoading:false
    },
    list:{
      items:[],
      isLoading:false
    }
  }
  componentDidMount(){
    fetch('list.json')
    .then(function(result){
      return result.json();
    })
    .then(function(json){
      console.log(json);
      this.setState({list:json});
    }.bind(this))
  }
  render() {
     return(
      <div className="App">
        <h1>WEB</h1>
        <Nav list={this.state.list} onClick={function(id){
          fetch(id+'.json')
          .then(function(result){
            return result.json();
          })
          .then(function(json){
            this.setState({
              article:{
                title:json.title,
                desc:json.desc
              }
            })
          }.bind(this));
        }.bind(this)}></Nav>
        <Article title={this.state.article.item.title} desc={this.state.article.item.desc}></Article>
      </div>
    );
  }
}

export default App;
