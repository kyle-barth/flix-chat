const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ChatKit = require('@pusher/chatkit-server');

const app = express();

const chatKit = new ChatKit.default({
    instanceLocator: 'v1:us1:4f6486d4-e89d-400c-b3cc-2c3b3ba0e8b5',
    key: '4b8ea66a-a3bc-4f3c-82ff-93521bd586a4:0SE0bpI/69XRNnn2BdpKMFr68msUCAS/JaDAYSJzmPk='
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/users', (req, res) => {
    const { username } = req.body

    chatKit.createUser({
        id: username,
        name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
        if (error.error === 'services/chatkit/user_already_exists') {
            res.sendStatus(200)
        } else {
            res.status(error.status).json(error)
        }
    });
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Running on port ${PORT}`);
    }
})
