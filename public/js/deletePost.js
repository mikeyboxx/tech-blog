const deleteHandler = async (postId, event) => {
  event.stopPropagation();

    try{
      let response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        response = await response.json();
        alert(`Failed to delete. ${response.message}`);
      }
    }
    catch (err){
      console.log(err);
    }
};


const deleteBtns = document.querySelectorAll('.delete-link'); //adds event listener to submit button of all post modals. Bind method
deleteBtns.forEach(function(el, idx) {
    el.addEventListener('click', deleteHandler.bind(this, $(`.delete${idx}`).attr('post-id'))); 
});


