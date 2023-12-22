const Notification = ({ notification, addedBlog }) => {
  if (notification === 'success') {
    return <div className='successNotify'>
        Succesfully added a blog! {addedBlog.title}
    </div>
  }

  else if (notification === 'error') {
    return <div className='errorNotify'>
        Wrong username or password
    </div>
  }

  else if (notification === 'deletedBlog') {
    return <div className="successNotify">
        Deleted blog {addedBlog}
    </div>
  }
}

export default Notification