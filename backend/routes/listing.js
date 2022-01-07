const router = require("express").Router();
const Listing = require("../models/Listing");
const { body, validationResult } = require("express-validator");
const FAUX_WAIT = 500;
const auth = require("../middleware/auth");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
router.post(
  "/",
  auth,
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
      filtered = await Listing.find({
        sport: { $regex: ".*" + query + ".*", $options: "i" },
      });
    } else if (type === "both") {
      filtered = await Listing.find({
        $or: [
          {
            sport: { $regex: ".*" + query + ".*", $options: "i" },
            $options: "i",
          },
          { location: { $regex: ".*" + query + ".*", $options: "i" } },
        ],
      });
    } else if (type === "location") {
      filtered = await Listing.find({
        location: { $regex: ".*" + query + ".*", $options: "i" },
      });
    }

    await sleep(Math.random() * FAUX_WAIT);
    return res.json(filtered);
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Server Error at like 45" } });
  }
});

router.post("/chat/:id", auth, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.send("ok");
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing)
      return res.status(400).json({ errors: [{ msg: "No listing found" }] });
    let newListingChat = listing.chat;
    newListingChat.push({ user: req.user.id, message: message });
    listing.chat = newListingChat;
    await listing.save();
    return res.json({ user: req.user, message: message });
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(400).json([{ errors: ["Invalid listing ID"] }]);
    else console.log(error);
    return res
      .status(400)
      .json({ errors: [{ msg: "Server Error in line 59" }] });
  }
});

router.get("/", async (req, res) => {
  try {
    let listings = await Listing.find();
    await sleep(Math.random() * FAUX_WAIT);
    return res.json(listings);
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Server Error in line 41" } });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("user")
      .populate("peopleJoined")
      .populate("chat.user");
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

router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing)
      return res.status(400).json({ errors: [{ msg: "Listing not found" }] });
    await listing.remove();
    return res.send("removed");
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(400).json([{ errors: ["Invalid listing ID"] }]);
    console.log(error);
    return res
      .status(400)
      .json({ errors: [{ msg: "Server Error in line 136" }] });
  }
});

router.get("/join/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing)
      return res.status(400).json({ errors: [{ msg: "Listing not found" }] });
    let newPeople = listing.peopleJoined;
    newPeople = newPeople.filter(
      (person) => person._id.toString() !== req.user.id.toString()
    );
    if (newPeople.length === listing.peopleJoined.length) {
      if (listing.peopleJoined.length - 1 === listing.amountOfPeopleNeeded) {
        return res.status(400).json({ errors: [{ msg: "No slots left!" }] });
      }
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
    console.log(error);
    return res
      .status(400)
      .json({ errors: [{ msg: "Server Error in line 68" }] });
  }
});

module.exports = router;
