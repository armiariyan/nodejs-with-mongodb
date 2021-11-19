import Status from "../models/Status";

export const seeder = async (req, res, next) => {
    Status.find().deleteMany().then(async () => {
        await Status.create({
            _id: 1,
            Label: "not started"
        }, {
            _id: 2,
            Label: "working"
        }, {
            _id: 3,
            Label: "waiting for review"
        }, {
            _id: 4,
            Label: "completed"
        })

        console.log(`Created Status Successfully`);
        next()
    })
}