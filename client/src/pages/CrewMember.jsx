import React from "react";

class CrewMember extends React.Component {
    constructor() {
        super();
        console.log("CrewMember")
    }

    render() {
        return (
            <div>
                <h1>This crew member:</h1>
                <ul>

                </ul>

                <hr />

                <hr />

                <h1>Upate crew member</h1>
                <form action="">

                    <button>Submit</button>
                </form>

                <h1>Movies with this crew member</h1> 
                <input type="number" />
                <ul>

                </ul>

                <hr />

                <h1>Delete crew member</h1>
                <button>Delete</button>

            </div>
        );
    }
}

export default CrewMember;