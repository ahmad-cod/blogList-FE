import React from 'react'

const BlogForm = ({
     title,
     author,
     url,
     handleSubmit,
     handleTitleChange, 
     handleAuthorChange,
     handleUrlChange
     }) => {
    <div>
        <h3>Create a new Blog List</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input
                type="text"
                name="title"
                value={title}
                onChange={ handleTitleChange }
            />
            <label htmlFor="author">Author </label>
            <input
                type="text"
                name="author"
                value={author}
                onChange={ handleAuthorChange }
            />
            <label htmlFor="url">Url </label>
            <input
                type="url"
                name="url"
                value={url}
                onChange={ handleUrlChange }
            />
            <button type="submit">Create</button>
        </form>
    </div>
}

export default BlogForm