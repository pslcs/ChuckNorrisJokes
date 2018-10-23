import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class MainPage extends React.Component{
    render(){
        return (<div className="mainPage">
            <OneWordQuery />
            <Categories />
            <GetRandom />
        </div>)
    }
}

class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state={
            kategorijos: [],
            kategorija: "",
            juokelis: ""
       }
    }
    getCategories = async() => {
        const apiCategoriesCall = await fetch('https://api.chucknorris.io/jokes/categories')
        const categories = await apiCategoriesCall.json();
        let kategorijosHTML = [];
        for (let i=0; i<categories.length; i++){
            kategorijosHTML.push(<option value={categories[i]}>{categories[i]}</option>)
        }
        this.setState({kategorijos: kategorijosHTML})
    }
    getCategoryJokes = async() => {
        const apiCategoryJokesCall = await fetch(`https://api.chucknorris.io/jokes/random?category=${this.state.kategorija}`)
        const categoryJoke = await apiCategoryJokesCall.json();
        this.setState({juokelis: categoryJoke.value})
    }
    render(){
        if(this.state.kategorijos.length < 2){this.getCategories()}
        return (
            <div className="results">
                <select type="select" id="selection" >
                {this.state.kategorijos}
                </select>
                <button type="button" onClick={()=>{
                    var e = document.getElementById("selection");
                    this.setState({kategorija: e.options[e.selectedIndex].value})
                    this.getCategoryJokes();
                }}>Check</button>
                <p>{this.state.juokelis}</p>
            </div>
        )
    }
}
class GetRandom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            juokelis: ""
        }
    }
    gautiRandomJuokeli = async() => {
        const apiRandomCall = await fetch('https://api.chucknorris.io/jokes/random');
        const randomJoke = await apiRandomCall.json();
        this.setState({juokelis: randomJoke.value})
    }
    render() {
        return (
            <div className="getRandom">
                <button type="button" onClick={() => this.gautiRandomJuokeli()}>Random</button>
                <p>{this.state.juokelis}</p>
            </div>
        )
    }
}

class OneWordQuery extends React.Component{
    constructor(props){
        super(props);
        this.state={
            zodis: '',
            juokeliai: []
        };
    }

    gautiJuokeliai = async() => {
        const apiCall = await fetch(`https://api.chucknorris.io/jokes/search?query=${this.state.zodis}`)
        const joke = await apiCall.json()
        let jokes = [];
        for (let i = 0; i < joke.result.length; i++){
            jokes.push(<p>{joke.result[i].value}</p>)
            
        }
        this.setState({juokeliai: jokes})
    }

    keiciuState(event){
        this.setState({zodis: event.target.value})
        console.log(this.state.zodis)
    }

    render(){
        return (
            <div className="chuckNorris">
            <img src="http://www.reactiongifs.com/r/2013/06/deal.gif"></img>
                <div className="title">
                    Please enter a keyword
                </div>
                <div className="inputs">
                    <input type="text" value={this.state.zodis} placeholder="E.g: Ocean" name="joke" onChange={ event => this.keiciuState(event)}/>
                    <button type="button" onClick={()=>this.gautiJuokeliai()}>Search</button>
                </div>
                <div>{this.state.juokeliai}</div>
            </div>
        )
    }
}

ReactDOM.render(<MainPage />, document.getElementById('root'));
