const Notification = ({message}) => {
    const styling = {
        border: 'solid red',
        padding: '5px',
    }
    if (message === '') return null
    return (
    <div style={styling}>{message}</div>
    )
}

export default Notification