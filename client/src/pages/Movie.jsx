import React from "react";

class Movie extends React.Component {
    constructor() {
        super();
        console.log("Movie")
    }

    render() {
        return (
            <div>
                <h1>This is the movie</h1>
                <ul>

                </ul>

                <hr />

                <h1>Update movie</h1>
                <form action="">
                    
                    <button>Submit</button>
                </form>

                <hr />

                <h1>Add crew member</h1>
                <form action="">

                    <button>Submit</button>
                </form>

                <hr />

                <h1>Delete movie</h1>
                <button>Delete</button>

            </div>
        );
    }
}

export default Movie;