{

    // create notification
    let createNoty = function (type, msg) {
        new Noty({
            theme:'bootstrap-v4',
            type,
            text: msg,
            timeout: 1000,
            
        }).show();

    }
    // submit form data with ajax
    let createPost = function () {
        let newPostForm = $("#new-post-form");
        newPostForm.submit((e) => {
            e.preventDefault();

            // console.log(newPostForm.serialize());
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: (data) => {
                    let newPost = newDomPost(data.data.post);
                    createNoty('success','Post Published');
                    $('#posts-list-container').prepend(newPost);
                    // allPosts();
                    deletePost($(' .delete-post-button', newPost));
                }, error: (error) => {
                    createNoty('error', 'Error Post Publishing');
                    console.log(error.responseText);
                }
            })
        })
    }

  

    // create a post in dom
    let newDomPost = function (post) {
        // console.log("posts",post)
        return $(`<li id="post-${post._id}">
                    <div id="post">
                        <h3>
                            content: ${post.content}
                        </h3>
                        <h5>created by: ${post.user.name}</h5>
                    </div>

                    <div class="post-comments">
                        <form action="/comments/create" method="POST">
                            <input type="text" name="comment"
                                placeholder="Type comments here..." />
                            <input type="hidden" name="post" value="${post._id}" />
                            <input type="submit" value="Post Comment" />
                        </form>
                    

                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                              
                            </ul>
                        </div>
                    </div>
                   
                    <button class="buttns">
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete
                            Post</a>
                    </button>

                </li>`)
    }

    

    let deletePost = function (delLink) {
        // console.log(delLink)

        $(delLink).click(function (e) {
            e.preventDefault();
            // console.log("del",$(delLink).prop('href'));
            $.ajax({
                type: 'get',
                url: $(delLink).prop('href'),
                success: (data) => {
                    // console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                    createNoty('success', 'Post Removed!');
                }, error: (error) => {
                    createNoty('error', 'Error Deleting post');
                    console.log(error.responseText);
                }
            })
        })
    }

    // allPosts();
    createPost();
    let del = document.querySelectorAll('.delete-post-button');
    // console.log(del)
    del.forEach(btn => {
        deletePost(btn);
    })
}