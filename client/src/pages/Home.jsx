import React from "react";
import MovieItem from '../components/MovieItem';
import CrewMemberItem from '../components/CrewMemberItem';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            crewMembers: [],
            title: "",
            category: '',
            publication_date: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/movies')
            .then(response => response.json())
            .then(data => {
                this.setState(prevState => {
                    return { movies: [...prevState.movies, ...data] }
                })
            })
            .catch(err => console.log(err))

        fetch('http://localhost:8080/api/crew_members')
            .then(response => response.json())
            .then(data => {
                this.setState(prevState => {
                    return { crewMembers: [...prevState.crewMembers, ...data] }
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1>Movies</h1>

                <h2>These are the movies currently inside the database</h2>
                {this.state.movies.map((movie, index) => {
                    return <MovieItem
                        key={index}
                        title={movie.title}
                        category={movie.category}
                        publication_date={movie.publication_date}
                    />
                })}

                <hr />

                <h2>Create a movie</h2>


                <input type="text" name="title" id="" onChange={(e) => { this.setState({ title: e.target.value }) }} />
                <input type="text" name="category" id="" onChange={(e) => { this.setState({ category: e.target.value }) }} />
                <input type="text" name="publication_date" id="" onChange={(e) => { this.setState({ date: e.target.value }) }} />
                <button onClick={() => {
                    fetch('http://localhost:8000/api/movies', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: this.state.title,
                            category: this.state.category,
                            publication_date: this.state.publication_date
                        })
                    }).then(res => res.json())
                        .then(data => console.log(data))
                        .catch(err => console.log(err))
                }} >Submit</button>

                <hr />

                <h2>Create a movie with crew members</h2>

                <h3>Movie details</h3>
                <form action="">

                </form>

                <h3>Crew members details</h3>
                <form action="">

                </form>

                <button>Add crew member</button>

                <button>Submit</button>


                <hr />

                <h1>Crew Members</h1>

                <h2>These are the crew members currently inside the database</h2>
                {this.state.crewMembers.map((crewMember, index) => {
                    return <CrewMemberItem
                        name={crewMember.name}
                        role={crewMember.role}
                        movieId={crewMember.movieId}
                    />
                })}

            </div>
        );
    }
}

export default Home;