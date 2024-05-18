import InitializeTestDb from "../utils/database";
import schedule from "node-schedule";
import RepairService from "../../services/Commands/RepairService";
import FishService from "../../services/Commands/FishService";

beforeEach(async () => {
  await InitializeTestDb();
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
      "John B1 unhooks the latches of their toolbox and gets to work."
    );

    expect(response.ephemeral).toBeFalsy();
  });

  it("Message for wanting to repair when repairing", async () => {
    await RepairService.start(1, player);

    const response = await RepairService.start(1, player);

    expect(response.content).toEqual(
      "You are already tinkering with the engine!"
    );

    expect(response.ephemeral).toBeTruthy();
  });

  it("Trying to do another activity while repairing", async () => {
    await RepairService.start(1, player);

    const response = await FishService.start(1, player);

    expect(response.content).toEqual(
      "You will have to put away your tools if you want to do something else..."
    );
  });
});
