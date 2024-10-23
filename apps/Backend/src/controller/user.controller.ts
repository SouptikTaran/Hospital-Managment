import { RequestHandler } from "../types/types";


export const demo: RequestHandler = (req, res) => {
    res.send("Hello world");
};
