const handlerError = (err) => {
      const errs = {}
      Object.values(err.errors).forEach((data) => {
            // console.log(data.properties);
            errs[data.properties.path] = data.properties.message
            })
            //  console.log(err.errors);
            return errs
           
      }
      module.exports = {handlerError}