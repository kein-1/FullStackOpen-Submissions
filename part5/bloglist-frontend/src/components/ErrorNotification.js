const ErrorNotification = (props) => {

  const { errorMessage } = props  
  return <h3 className="text-red-500">{errorMessage}</h3>
    
}

export default ErrorNotification