const router = require("express").Router();
const Listing = require("../models/Listing");
const { body, validationResult } = require("express-validator");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
router.post(
  "/",
  body("location", "Location is required").not().isEmpty(),
  body("date", "Date is required").not().isEmpty().isDate(),
  body("sport", "Sport is required").not().isEmpty(),
  body("slotsLeft", "Amount of people needed is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { location, date, sport, slotsLeft, remarks } = req.body;
      let listing = new Listing({
        user: req.user.id,
        amountOfPeopleNeeded: slotsLeft,
        remarks,
        dateOfMeet: date,
        location,
        sport: sport,
        peopleJoined: [req.user.id],
      });
      await listing.save();
      return res.json(listing);
    } catch (error) {
      return res.status(400).json({ errors: { msg: "Server Error" } });
    }
  }
);

router.post("/search", async (req, res) => {
  try {
    const query = req.body.query.trim();
    const type = req.body.type.trim();
    let filtered;
    if (type === "sport") {
      // filtered = await Listing.find({
      //   sport: { $regex: query, $options: "i" },
      // });
      filtered = await Listing.find({
        sport: { $regex: ".*" + query + ".*", $options: "i" },
        // sport: { $regex: query, $options: "i" },
      });
    } else if (type === "both") {
      filtered = await Listing.find({
        $or: [
          { sport: query, $options: "i" },
          { location: { $regex: ".*" + query + ".*", $options: "i" } },
        ],
      });
    } else if (type === "location") {
      filtered = await Listing.find({
        location: { $regex: ".*" + query + ".*", $options: "i" },
      });
    }

    // console.log(filtered);

    await sleep(500);
    return res.json(filtered);
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Server Error at like 45" } });
  }
});

router.get("/", async (req, res) => {
  try {
    let listings = await Listing.find();
    await sleep(500);
    return res.json(listings);
  } catch (error) {
    res.status(400).json({ errors: { msg: "Server Error in line 41" } });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("user")
      .populate("peopleJoined");
    if (!listing)
      return res.status(400).json({ errors: [{ msg: "Listing not found" }] });
    return res.json(listing);
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(400).json([{ errors: ["Invalid listing ID"] }]);
    else console.log(error);
    return res
      .status(400)
      .json({ errors: [{ msg: "Server Error in line 59" }] });
  }
});

router.get("/join/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing)
      return res.status(400).json({ errors: [{ msg: "Listing not found" }] });
    let newPeople = listing.peopleJoined;
    newPeople = newPeople.filter(
      (person) => person._id.toString() !== req.user._id.toString()
    );
    if (newPeople.length === listing.peopleJoined.length) {
      newPeople.push(req.user._id);
      listing.peopleJoined = newPeople;
      await listing.save();
      return res.send("add");
    } else {
      listing.peopleJoined = newPeople;
      await listing.save();
      return res.send("remove");
    }
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(400).json([{ errors: ["Invalid listing ID"] }]);
    return res
      .status(400)
      .json({ errors: [{ msg: "Server Error in line 68" }] });
  }
});

module.exports = router;
