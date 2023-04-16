export const resHandler = (err, doc, res, errMessage) => {
  err
    ? (() => {
        console.log(errMessage + err);
        res.send(errMessage);
      })()
    : (() => {
        res.send(doc);
      })();
};
