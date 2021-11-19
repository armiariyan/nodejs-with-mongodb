import Status from '../models/Status';

export const createStatus = async (req, res) => {
    try {
        const status = new Status(req.body);
        status.save(err => {
            if (err) {
                res.send(err)
            } else {
                res.status(201).json({
                    info: "Status created successfully",
                    data: status
                })
            }
        });
    } catch (err) {
        res.send({
            message: "Something went wrong on status!",
            error: err
        })
    }
}