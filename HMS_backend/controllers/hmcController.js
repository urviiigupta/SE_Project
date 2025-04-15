import Grant from '../models/Grant.js';

export const allocateGrant = async (req, res) => {
  const { allocations } = req.body; // Example: { hallId1: 50000, hallId2: 60000 }
  try {
    for (let hallId in allocations) {
      const grant = new Grant({ hallId, amount: allocations[hallId] });
      await grant.save();
    }
    res.json({ message: 'Grants successfully allocated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const viewGrants = async (req, res) => {
  try {
    const grants = await Grant.find({});
    res.json(grants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
