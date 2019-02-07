import express from "express";

export function loginRequired(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.user) {
    next()
  } else {
    res.redirect('/auth')
  }
}

export function insertReq(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.locals.req = req;
  next();
}

export function insertToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.locals.csrfToken = req.csrfToken();
  next();
}


