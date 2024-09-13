const express = require('express');
const bookingModel = require('../model/booking');
const roomModel = require('../model/room');
const router = express.Router();

router.post('/bookrooms', async (req, res) => {
    const { room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays } = req.body;

    try {
        const newbooking = new bookingModel({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: moment(fromdate).format('DD-MM-YYYY'),
            todate: moment(todate).format('DD-MM-YYYY'),
            totalamount,
            totaldays,
            transactionid: '1234'
        })

        const booking = await newbooking.save()
        const roomtemp = await roomModel.findOne({ _id: room._id })
        roomtemp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate).format('DD-MM-YYYY'),
            todate: moment(todate).format('DD-MM-YYYY'),
            userid: userid,
            status: booking.status
        });
        await roomtemp.save();
        res.send('Room Booked Successfully')
    } catch (error) {
        return res.status(500).json({ error })
    }

})

module.exports = router;