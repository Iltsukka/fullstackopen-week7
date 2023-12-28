import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const [notification2, dispatch] = useContext(NotificationContext)
  console.log(notification2)
  if (notification2===null) return
  console.log(notification2)
  switch (notification2.type) {
    case 'failedLogin':
      return <div className="errorNotify">Wrong username or password</div>
    case 'success':
      return (
        <div className="successNotify">
          Succesfully added a blog! {notification2.message}
        </div>)
    case 'DISABLE':
        return
    case 'DELETE':
        return <div className="successNotify">Deleted blog {notification2.message}</div>
  }
}
/*   if (notification === "success") {
    return (
      <div className="successNotify">
        Succesfully added a blog! {addedBlog.title}
      </div>
    );
  } else if (notification === "error") {
    return <div className="errorNotify">Wrong username or password</div>;
  } else if (notification === "deletedBlog") {
    return <div className="successNotify">Deleted blog {addedBlog}</div>;
  }
}; */

export default Notification;
