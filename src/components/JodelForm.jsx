const JodelForm = ({formSubmission, formValue, formHandler}) => {
  return (
    <form className = "jodel-form" onSubmit={formSubmission}>
      <label htmlFor="content"> Message </label>
      <textarea className = "u-full-width" type="text" placeholder="Jodel away!" id = "content" name = "content" value = {formValue} onChange = {formHandler}></textarea>
      <button className = "button-primary" id = "primary-button" type="submit"> Send your jodel!</button>
    </form>
  )
}

export default JodelForm