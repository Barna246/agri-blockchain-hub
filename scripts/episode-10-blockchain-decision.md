# Episode 10: Do You Even Need a Blockchain?
Capped under 90 seconds.

**Sourcing correction:** the ledger previously attributed this decision flowchart to the US Department of Homeland Security. That claim could not be verified against any DHS publication. The actual, well-documented, widely-cited source for this type of "do you need a blockchain" decision tree is an academic paper by Karl Wüst and Arthur Gervais of ETH Zurich, which is what nearly every version of this flowchart circulating online (IEEE Spectrum's interactive, the O'Reilly "Foundations of Blockchain" textbook figure, multiple blog write-ups) traces back to. This script and the ledger's risk-category entry have both been corrected to cite it properly.

---

## Full script (~85 sec)

"Before you put anything on a blockchain, ask one question first: is there already someone everyone trusts to just run a normal database? If yes, stop. You don't need this.

Two researchers at ETH Zurich, Karl Wüst and Arthur Gervais, built the actual decision tree most of this industry quietly copies. It comes down to three questions: do multiple parties need to write to the same record without one of them being in charge? Do you need that history to be impossible to secretly alter? And is there truly no trusted party everyone would already agree to use instead? Answer yes to all three, and a blockchain might actually help.

Most agri-blockchain pitches fail this test at question one. If it's one company's sensors feeding one company's database, that's not a multi-party trust problem, that's just a database with extra steps. FARMS, a few episodes back, passes all three: a farmer, an insurer, and a satellite provider don't fully trust each other's numbers.

This isn't an argument against the tech. It's the filter that separates a project like FARMS from a marketing deck. Ask the three questions before you believe the pitch."

## 30-second cut

"Before believing any blockchain pitch, ask three questions from an actual academic decision tree, built at ETH Zurich: do multiple untrusting parties need to write to the same record, do you need that history tamper-proof, and is there truly no trusted third party everyone would already accept instead? Most agri-blockchain pitches fail at question one. FARMS passes all three. That's the difference between a real use case and a marketing deck."

## On-screen text overlays
- 0:00 → "Is there already a trusted party to run a database?"
- 0:12 → "3 questions, from an actual academic decision tree"
- 1:10 → "The filter between a real project and a marketing deck"

## Sources
Karl Wüst and Arthur Gervais, "Do you Need a Blockchain?", IACR Cryptology ePrint Archive, report 2017/375, ETH Zurich: https://eprint.iacr.org/2017/375.pdf
Also presented at IEEE CVCBT 2018 (Crypto Valley Conference on Blockchain Technology).
Secondary explainer, if the primary paper reads too dense: David Gerard's summary and critique, "Do you need a Blockchain? Probably less than Wüst and Gervais think you do": https://davidgerard.co.uk/blockchain/2018/02/10/do-you-need-a-blockchain-probably-less-than-wust-and-gervais-think-you-do/
