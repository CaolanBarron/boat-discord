import InitializeTestDb from "../utils/database";
import schedule from "node-schedule";
import RepairService from "../../services/Commands/RepairService";
import FishService from "../../services/Commands/FishService";

beforeEach(() => {
  InitializeTestDb();
});

afterEach(async () => {
  await schedule.gracefulShutdown();
});

const player = {
  id: 1,
  name: "John B1",
};

describe("Repair Start Activity", () => {
  it("Starts correctly", async () => {
    const response = await RepairService.start(1, player);

    expect(response.content).toEqual(
      "John unhooks the latches of their toolbox and gets to work."
    );

    expect(response.ephemeral).toBeFalsy();
  });

  it("Message for wanting to repair when repairing", async () => {
    await RepairService.start(1, player);

    const response = await RepairService.start(1, player);

    expect(response.content).toEqual("You are already repairing!");

    expect(response.ephemeral).toBeTruthy();
  });

  it("Trying to do another activity while repairing", async () => {
    await RepairService.start(1, player);

    const response = FishService.start(1, player);

    expect(response.content).toEqual(
      "You are currently elbow deep in a particularly volatile engine at the moment..."
    );
  });
});
