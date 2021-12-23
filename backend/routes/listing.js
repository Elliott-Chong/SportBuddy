const router = require("express").Router();
const Listing = require("../models/Listing");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("location", "Location is required").not().isEmpty(),
  body("date", "Date is required").not().isEmpty().isDate(),
  body("sport", "Sport is required").not().isEmpty(),
  body("slotsLeft", "Amount of people needed is required").not().isEmpty(),
  body("remarks", "Remarks is required").not().isEmpty(),
  async (req, res) => {
    console.log("im creating post in backend now");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("herer?");
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log("or here?");
      const { location, date, sport, slotsLeft, remarks } = req.body;
      let listing = new Listing({
        user: req.user.id,
        amountOfPeopleNeeded: slotsLeft,
        remarks,
        dateOfMeet: date,
        location,
        sport,
        peopleJoined: [req.user.id],
      });
      await listing.save();
      return res.json(listing);
    } catch (error) {
      res.status(400).json({ errors: { msg: "Server Error" } });
    }
  }
);

module.exports = router;
