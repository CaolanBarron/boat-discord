import ActivityService from "../../services/ActivityService";
import FishService from "../../services/Commands/FishService";
import RepairService from "../../services/Commands/RepairService";
import schedule from "node-schedule";
import InitializeTestDb from "../utils/database";

beforeEach(async () => {
  await InitializeTestDb();
});

afterEach(async () => {
  await schedule.gracefulShutdown();
});

const player1 = {
  id: 1,
  name: "John B1",
};
const player2 = {
  id: 3,
  name: "Tim B1",
};

describe("Check occupied function", () => {
  it("Should return when Fish activity is occupied", async () => {
    await FishService.start(1, player2);

    const response = await ActivityService.checkOccupied("FISH", 1);
    expect(response).toEqual(
      "You look for the fishing rod but... Tim B1 is already fishing."
    );
  });

  it("Should return when Repair activity is occupied", async () => {
    await RepairService.start(1, player2);

    const response = await ActivityService.checkOccupied("REPAIR", 1);
    expect(response).toEqual(
      "You look around for the toolbox but... Tim B1 is working on the boat already."
    );
  });
});
