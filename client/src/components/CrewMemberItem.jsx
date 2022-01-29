import React from "react";

function CrewMemberItem(props) {
    const { name, role, movieId } = props

    return (
        <ul>
            <li>Name: {name}</li>
            <li>Role: {role}</li>
            <li>Movie id: {movieId}</li>
        </ul>
    );
}

export default CrewMemberItem;