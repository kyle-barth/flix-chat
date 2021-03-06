const express = require('express');
const router = express.Router();
const ChatKit = require('@pusher/chatkit-server');

const chatKit = new ChatKit.default({ 
    instanceLocator: 'v1:us1:4f6486d4-e89d-400c-b3cc-2c3b3ba0e8b5',
    key: '4b8ea66a-a3bc-4f3c-82ff-93521bd586a4:0SE0bpI/69XRNnn2BdpKMFr68msUCAS/JaDAYSJzmPk=',
});

router.post('/users', (req, res) => {
    const { username } = req.body;

    chatKit.createUser({
        id: username,
        name: username,
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
        if (error.error === 'services/chatkit/user_already_exists') {
            res.sendStatus(200);
        } else {
            res.status(error.status).json(error);
        }
    });
});

router.post('/authenticate', (req, res) => {
    const authData = chatKit.authenticate({ userId: req.query.user_id });
    res.status(authData.status).send(authData.body);
});

module.exports = router;