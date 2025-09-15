const handleSuccess = (res, message, statuscode, data = null) => {
  return res.status(statuscode).json({
    message,
    success: true,
    status: statuscode,
    data,
  });
};

const handleError = (res, message, statuscode = 500, data = null, err) => {
  return res.status(statuscode).json({
    message,
    success: false,
    status: statuscode,
    data,
    error: err,
  });
};

export { handleSuccess, handleError };
