// Website lead numbers: WEBL0001, WEBL0002, ... (one shared counter in the "counters" collection)
const mongoose = require('mongoose');

const Counter = mongoose.models.Counter || mongoose.model('Counter', new mongoose.Schema(
  { _id: String, seq: { type: Number, default: 0 } },
  { collection: 'counters', versionKey: false }
));

const PREFIX = 'WEBL';
const formatLeadId = (n) => `${PREFIX}${String(n).padStart(4, '0')}`;

// Atomic, so two leads at the same moment never get the same number
const nextLeadId = async () => {
  const c = await Counter.findOneAndUpdate({ _id: 'lead' }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: 'after' });
  return formatLeadId(c.seq);
};

// Gives a number to old leads saved before Lead IDs existed (oldest first)
const assignMissingLeadIds = async (Lead) => {
  const leads = await Lead.find({ leadId: null }).sort({ date: 1 }).select('_id').lean();
  for (const l of leads) {
    await Lead.updateOne({ _id: l._id, leadId: null }, { leadId: await nextLeadId() });
  }
  return leads.length;
};

module.exports = { nextLeadId, assignMissingLeadIds };
