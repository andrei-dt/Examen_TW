import React from "react";

function MovieItem(props) {
    const { title, category, publication_date } = props

    return (
        <ul>
            <li>Title: {title}</li>
            <li>Category: {category}</li>
            <li>Release date: {publication_date}</li>
        </ul>
    );
}

export default MovieItem;